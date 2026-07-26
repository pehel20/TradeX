import React from "react";

const appsData = [
  {
    title: "Analytics",
    desc: "View profit/loss charts and insights.",
  },
  {
    title: "Orders",
    desc: "Track and manage your orders history.",
  },
  {
    title: "Quick Trade",
    desc: "Buy/Sell stocks instantly.",
  },
  {
    title: "Portfolio",
    desc: "View your portfolio performance.",
  },
  {
    title: "Watchlist",
    desc: "Track your favorite stocks.",
  },
  {
    title: "Reports",
    desc: "Download trading reports.",
  },
];

const Apps = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h2 className="title">Apps</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
          marginTop: "20px",
        }}
      >
        {appsData.map((app, index) => (
          <div
            key={index}
            className="table"
            style={{
              padding: "20px",
              height: "160px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                background: "#eaeaea",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            ></div>

            <h3 style={{ margin: 0 }}>{app.title}</h3>

            <p style={{ marginTop: "6px", color: "#777", fontSize: "14px" }}>
              {app.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;