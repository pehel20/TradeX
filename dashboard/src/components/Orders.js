import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/allOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err.response?.data);
        setAllOrders([]);
      });
  }, []);

  return (
    <div className="orders" style={{ width: "100%", padding: "20px" }}>
      {allOrders.length > 0 ? (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order, index) => {
                  const modeClass = order.mode === "BUY" ? "profit" : "loss";
                  return (
                    <tr key={index}>
                      <td>{order.name}</td>
                      <td>{order.qty}</td>
                      <td>{parseFloat(order.price).toFixed(2)}</td>
                      <td className={modeClass}>{order.mode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="no-orders text-center">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;