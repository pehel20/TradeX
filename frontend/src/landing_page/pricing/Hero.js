import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row text-center mt-5 p-5" style={{ marginBottom: "-80px" }}>
        <h2>Charges</h2>
        <h4 className="text-muted mb-5">List of all charges and taxes</h4>
        <div className="col-4 p-5">
          <img src="/media/pricingEquity.svg" style={{ maxWidth: "90%" }} />
          <h3>Free equity delivery</h3>
          <p className="text-muted mt-3">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col-4 p-5">
          <img src="/media/other-trades.svg" style={{ maxWidth: "90%" }} />
          <h3>Intraday and F&O trades</h3>
          <p className="text-muted mt-3">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col-4 p-5">
          <img src="/media/pricingEquity.svg" style={{ maxWidth: "90%" }} />
          <h3>Free direct MF</h3>
          <p className="text-muted mt-3">
            All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
