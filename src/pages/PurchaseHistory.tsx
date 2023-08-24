import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchPurchaseHistory from "../services/fetchPurchaseHistory.ts";
import PurchaseHistoryItem from "../components/purchaseHistory/PurchaseHistoryItem.tsx";

function PurchaseHistory() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("all");

  const handleTimeFrameChange = (event) => {
    console.log("Event::", event.target.value);
    setSelectedTimeFrame(event.target.value);
  };

  
  const {
    data: purchaseHistoryList,
    isLoading,
    isError,
  } = useFetchPurchaseHistory(selectedTimeFrame);

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Purchase History</h2>
      <div className="mb-3">
        <label htmlFor="timeFrame" className="form-label">
          Select Time Frame:
        </label>
        <select
          id="timeFrame"
          className="form-select"
          value={selectedTimeFrame}
          onChange={handleTimeFrameChange}
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>
      <div className="row">
        <div className="col">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading purchase history.</p>
          ) : purchaseHistoryList?.length === 0 ? (
            <p>No purchase history available.</p>
          ) : (
            <div>
              {purchaseHistoryList?.map((purchase) => (
                <PurchaseHistoryItem key={purchase._id} purchase={purchase} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">
          Back to Product List
        </Link>
      </div>
    </div>
  );
}

export default PurchaseHistory;
