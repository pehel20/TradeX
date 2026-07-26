import React from "react";

function AccountCharges() {
  return (
    <div className="container mt-5">

      <h3 className="mb-5">Charges for account opening</h3>

      <div className="px-4">

        <table className="table table-bordered align-middle">

          <thead className="table-light">
            <tr>
              <th className="p-4 text-start">Type of account</th>
              <th className="p-4 text-end">Charges</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="p-4">Online account</td>
              <td className="p-4 text-end">
                <span className="badge bg-success">FREE</span>
              </td>
            </tr>

            <tr>
              <td className="p-4">Offline account</td>
              <td className="p-4 text-end">
                <span className="badge bg-success">FREE</span>
              </td>
            </tr>

            <tr>
              <td className="p-4">NRI account (offline only)</td>
              <td className="p-4 text-end">₹ 500</td>
            </tr>

            <tr>
              <td className="p-4">
                Partnership, LLP, HUF, or Corporate accounts (offline only)
              </td>
              <td className="p-4 text-end">₹ 500</td>
            </tr>
          </tbody>
        </table>
          </div>
          <div className="mt-5">
        <p className="fs-5">Disclaimer</p>
        <p className="text-muted" style={{fontSize:"13px"}}>For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
    </div>
    </div>
  );
}

export default AccountCharges;