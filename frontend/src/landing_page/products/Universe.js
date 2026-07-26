import React from "react";

function Universe() {
  return (
    <div className="container mt-5 p-5">
      <div className="row text-center">
        <h2>The TradeX Universe</h2>
        <p className="p-2">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-5">
          <img src="/media/smallcaseLogo.png"/>
          <p className="text-small text-muted p-3">Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
        </div>
        <div className="col-4 p-5">
          <img src="/media/streakLogo.png" className="img-fluid" style={{ maxWidth: "44%" }}/>
          <p className="text-small text-muted p-3">Systematic trading platform that allows you to create and backtest strategies without coding.</p>
        </div>
        <div className="col-4 p-5">
          <img src="/media/sensibullLogo.svg" className="img-fluid" style={{ height: "36px" }}/>
          <p className="text-small text-muted p-3">Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.</p>
        </div>
        <div className="col-4 p-5">
          <img src="/media/zerodhaFundhouse.png" style={{ maxWidth: "54%" }}/>
          <p className="text-small text-muted p-3">Our asset management venture that is creating simple and transparent index funds to help you save for your goals.</p>
        </div>
        <div className="col-4 p-5">
          <img src="/media/goldenpiLogo.png" className="img-fluid" style={{ height: "55px" }}/>
          <p className="text-small text-muted p-2">Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.</p>
        </div>
         <div className="col-4 p-5">
          <img src="/media/dittoLogo.png" className="img-fluid" style={{ height: "45px" }}/>
          <p className="text-small text-muted p-3">Personalized advice on life and health insurance. No spam and no mis-selling.</p>
        </div>
        <button className='p-2 btn btn-primary fs-5 mb-5 mt-3'style={{width:"20%",margin:"0 auto"}}>Sign up for free</button>
      </div>
    </div>
  );
}

export default Universe;
