import React, { useState, useEffect } from "react";
import { VerticalGraph } from "./VerticalGraph";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Holdings = () => {

  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
  axios.get(`${API_URL}/allHoldings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      console.log("DATA:", res.data);
      setAllHoldings(res.data);
    })
    .catch((err) => {
      console.log("ERROR:", err.response?.data);

      setAllHoldings([]);
    });
}, []);

  useEffect(() => {
    // If the URL has #holdings-chart, delay slightly so data fetches, then scroll down
    if (window.location.hash === "#holdings-chart") {
      setTimeout(() => {
        const el = document.getElementById("holdings-chart");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [allHoldings]);

const labels=allHoldings.map((subarray)=>subarray["name"]);

const data={
  labels,
  datasets:[{
    label:"Stock Name",
    data:allHoldings.map((stock)=>stock.price),
    backgroundColor:"rgba(255,99,132,0.5)",
  },],
};

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <div id="holdings-chart">
        <VerticalGraph data={data}/>
      </div>
    </>
  );
};

export default Holdings;