import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../features/cart/cartSlice.ts";
import { CartItem as CartItemType } from "../../features/cart/types.ts";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useQueryClient } from "react-query";

interface CartItemProps {
  cartItem: CartItemType;
}

function CartItem({ cartItem }: CartItemProps) {
  const queryClient = useQueryClient(); // Get the query client instance
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem.id));
    queryClient.invalidateQueries("carts");
  };

  const handleIncrement = () => {
    dispatch(
      updateCartItemQuantity({
        id: cartItem.id,
        quantity: cartItem.quantity + 1,
      })
    );
    queryClient.invalidateQueries("carts");
  };

  const handleDecrement = () => {
    if (cartItem.quantity > 1) {
      dispatch(
        updateCartItemQuantity({
          id: cartItem.id,
          quantity: cartItem.quantity - 1,
        })
      );
      queryClient.invalidateQueries("carts"); 
    }
  };

  return (
    //  <div className="card mb-2">
    //    <div className="card-body">

    <tr>
      <td className="align-middle">{cartItem.product.name}</td>
      <td className="align-middle">
        Quantity: {cartItem.quantity} &times; ${cartItem.product.price} {"   "}
        <AiOutlineMinusCircle
          className="me-2 cursor-pointer"
          onClick={handleDecrement}
        />
        <AiOutlinePlusCircle
          className="ms-2 cursor-pointer"
          onClick={handleIncrement}
        />
      </td>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <span className="font-weight-bold">{cartItem.quantity}</span>
        </div>
      </td>
      <td className="align-middle">
        ${cartItem.quantity * cartItem.product.price}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemoveFromCart}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
