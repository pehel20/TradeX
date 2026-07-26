import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi! I'm TradeBot 🤖 your trading assistant. Ask me anything about stocks, the platform, or investing!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatResponse = (text) => {

    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    const lines = formatted.split("\n");
    let result = [];
    let inList = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) {
          result.push("<ul>");
          inList = true;
        }
        result.push(`<li>${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        if (trimmed) {
          result.push(`<p>${trimmed}</p>`);
        }
      }
    });

    if (inList) result.push("</ul>");

    return result.join("");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages
        .filter((_, i) => i > 0)
        .map((msg) => ({
          role: msg.role === "bot" ? "model" : "user",
          content: msg.content,
        }));

      const res = await axios.post(`${API_URL}/chat`, {
        message: userMessage,
        history,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: res.data.reply },
      ]);
    } catch (err) {
      const errorReply = err.response?.data?.reply || "Sorry, I'm having trouble connecting. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: errorReply,
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with TradeBot"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-header-avatar">🤖</div>
              <div>
                <h4>TradeBot</h4>
                <p>Your trading assistant</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                {msg.role === "bot" ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatResponse(msg.content),
                    }}
                  />
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              className="chatbot-input"
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
