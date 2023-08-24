import React from "react";

function PurchaseHistoryItem({ purchase }) {
    const formatDate = (dateString)  => {
        const options:any = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString("en-US", options);
      }
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">User: {purchase.user.username}</h5>
        <p className="card-text">Purchase Date: {formatDate(purchase.purchaseDate)}</p>
        <h6 className="card-subtitle mb-2 text-muted">Products Purchased:</h6>
        <ul className="list-group">
          {purchase.products.map((product) => (
            <li key={product._id} className="list-group-item">
              <p className="mb-0">Name: {product.name}</p>
              <p className="mb-0">Price: ${product.price}</p>
              {/* Add any other product-related information you want to display */}
            </li>
          ))}
        </ul>
        <p className="card-text mt-3">Total Amount: ${purchase.totalAmount}</p>
      </div>
    </div>
  );
}

export default PurchaseHistoryItem;
