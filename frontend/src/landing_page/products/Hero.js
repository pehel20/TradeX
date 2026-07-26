import React from "react";

function Hero() {
  return (
    <>
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5 p-5 ">
        <h3>TradeX Products</h3>
        <h5 className="text-muted mt-3">
          Sleek,modern, and intuitive trading platforms
        </h5>
        <p className="mt-3 mb-5">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none" }}>
            investment offerings <i class="fas fa-arrow-right"></i>
          </a>
        </p>
      </div>
      </div>
    </>
  );
}

export default Hero;
