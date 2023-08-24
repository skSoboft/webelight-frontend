import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice.ts";
import { Product } from "../../features/products/types.ts";
import { useQueryClient } from "react-query";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  handleCountOfCart: any;
}

function ProductCard({
  product,
  isInCart,
  handleCountOfCart,
}: ProductCardProps) {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  const handleAddToCart = () => {
    dispatch(
      addToCart({ id: product._id, product, quantity: 1, image: "image" })
    );
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    console.log("total quantity:: " + totalQuantity);

    handleCountOfCart(totalQuantity + 1);
  };

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button
          className={`btn btn-${isInCart ? "secondary" : "primary"}`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
