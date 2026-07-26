import React from "react";

function Brokerage() {
  return (
    <div classNmae="container mt-5">
      <div className="text-center mb-4">
        <h3>Equity</h3>
      </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th></th>
              <th>Equity delivery</th>
              <th>Equity intraday</th>
              <th>F&O-Futures</th>
              <th>F&O-Options</th>
            </tr>
          </thead>

          <tbody style={{ fontSize: "14px" }}>
            <tr>
              <td className="p-4">Brokerage</td>
              <td className="p-4">Zero Brokerage</td>
              <td className="p-4">
                0.03% or Rs. 20/executed order whichever is lower
              </td>
              <td className="p-4">
                0.03% or Rs. 20/executed order whichever is lower
              </td>
              <td className="p-4">Flat Rs. 20 per executed order</td>
            </tr>

            <tr>
              <td className="p-4">STT/CTT</td>
              <td className="p-4">0.1% on buy & sell</td>
              <td className="p-4">0.025% on the sell side</td>
              <td className="p-4">0.05% on the sell side</td>
              <td className="p-4">
                <ul>
                  <li>
                    0.15% of the intrinsic value on options that are bought and
                    exercised
                  </li>
                  <li>0.15% on sell side (on premium)</li>
                </ul>
              </td>
            </tr>

            <tr>
              <td className="p-4">Transaction charges</td>
              <td className="p-4">
                NSE: 0.00307% <br></br>
                BSE: 0.00375%
              </td>
              <td className="p-4">
                NSE: 0.00307% <br></br> BSE: 0.00375%
              </td>
              <td className="p-4">
                NSE: 0.00183% <br></br> BSE: 0
              </td>
              <td className="p-4">
                NSE: 0.03553% (on premium) <br></br> BSE: 0.0325% (on premium)
              </td>
            </tr>

            <tr>
              <td className="p-4">GST</td>
              <td className="p-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </td>
              <td className="p-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </td>
              <td className="p-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </td>
              <td className="p-4">
                18% on (brokerage + SEBI charges + transaction charges)
              </td>
            </tr>

            <tr>
              <td className="p-4">SEBI charges</td>
              <td className="p-4">₹10 / crore</td>
              <td className="p-4">₹10 / crore</td>
              <td className="p-4">₹10 / crore</td>
              <td className="p-4">₹10 / crore</td>
            </tr>

            <tr>
              <td className="p-4">Stamp charges</td>
              <td className="p-4">0.015% or ₹1500 / crore on buy side</td>
              <td className="p-4">0.003% or ₹300 / crore on buy side</td>
              <td className="p-4">0.002% or ₹200 / crore on buy side</td>
              <td className="p-4">0.003% or ₹300 / crore on buy side</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Brokerage;
