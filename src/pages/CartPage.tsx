import React from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/cart/CartItem.tsx";
import Button from "../components/common/Button.tsx";
import { clearCart } from "../features/cart/cartSlice.ts";
import { CartItem as CartItemTypes } from "../features/cart/types.ts";
import { updateProductStatus } from "../features/products/productsSlice.ts";
import useFetchCart from "../services/fetchCart.ts";
import { RootState, persistor } from "../store.ts";
import jwtDecode from "jwt-decode";
import { addPurchaseHistoryList } from "../features/purchaseHistory/purchaseHistorySlice.ts";

function CartPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data: cartItems, isLoading, isError } = useFetchCart();
  console.log("cartItems::", cartItems);

  const calculateTotal = (cartItems: CartItemTypes[]) => {
    return cartItems.reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token);

    console.log("cartItem::", cartItems);
    const productIdsToUpdate = cartItems.map((cartItem) => cartItem.id);
    console.log("Product Ids to Update", productIdsToUpdate);
    // const purchaseHistoryList = cartItems.map((cartItem) => {
    //   return {
    //     user: decodedToken.userId,
    //     products: cartItem.product.id,
    //     purchaseDate: new Date().toISOString(),
    //     totalAmount: calculateTotal(cartItems)
    //   };
    // });
    const purchaseHistoryList = {
      user: decodedToken.userId,
      products: productIdsToUpdate,
      totalAmount: calculateTotal(cartItems),
    };
    await dispatch(addPurchaseHistoryList(purchaseHistoryList));

    productIdsToUpdate.forEach((productId) => {
      dispatch(updateProductStatus({ productId }));
    });
    dispatch(clearCart());

    queryClient.refetchQueries("carts");

    navigate("/");
  };

  return (
    <div className="container my-5">
      <h2>Cart</h2>
      {cartItems === undefined || cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">Total: ${calculateTotal(cartItems)}</p>
          <div className="d-flex justify-content-between align-items-center">
            <Button label="Continue Shopping" className="btn btn-secondary" />
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
