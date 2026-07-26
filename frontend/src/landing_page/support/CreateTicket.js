import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>
        <div className="col-4 p-5 mt-5 ">
          <h5>
            <i class="fas fa-plus-circle"></i> Account Opening
          </h5>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Resident Individual</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Minor</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Non Resident Indian (NRI)</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Company,Partnership,HUF and LLP</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Glossary</a>
        </div>
        <div className="col-4 p-5 mt-5">
          <h5>
           <i class="fas fa-user-circle"></i> Your TradeX Account
          </h5>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Your Profile</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Account modification</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Client Master Report (CMR) and Depository Participant (DP)</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Nomination</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Transfer and conversion of securities</a>
        </div>

        <div className="col-4 p-5 mt-5">
          <h5>
          <i class="far fa-chart-bar"></i> Kite
          </h5>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>IPO</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Trading FAQs</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Margin Trading Facility (MTF) and Margins</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Charts and orders</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Alerts and Nudges</a>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>General</a>
        </div>
      </div>

      <div className="row p-5" style={{marginTop:"-60px"}}>
        <div className="col-4 p-5 mb-5">
          <h5>
          <i class="fas fa-money-check-alt"></i> Funds
          </h5>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Add money</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Withdraw money</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Add bank accounts</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>eMandates</a><br></br>
        </div>
        <div className="col-4 p-5 mb-5">
          <h5>
           <i class="fas fa-circle-notch"></i> Console
          </h5>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Portfolio</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Corporate actions</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Funds statement</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Reports</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Profile</a>
           <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Segments</a>
        </div>

        <div className="col-4 p-5 mb-5">
          <h5>
          <i class="fas fa-coins"></i> Coin
          </h5>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Mutual Funds</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>National Pension Scheme (NPS)</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Fixed Deposit (FD)</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Features on Coin</a><br></br>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>Payments and Orders</a>
          <a href="" style={{textDecoration:"none",lineHeight:"2.5"}}>General</a>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
