import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store.ts";
import { Product } from "../products/types.ts";
import {} from "react-query";
interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log("State::", action.payload);
      const { id, product, quantity, image } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      } else if (quantity > 0) {
        state.items.push({ id, product, quantity, image });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      console.log("action.payload::", current(state));

      const { id, quantity } = action.payload;
      if (quantity <= 0) return; // Ensure quantity is positive

      const itemIndex = state.items.findIndex((item) => item.id === id);
      console.log("Item Index:", quantity);

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;

        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
        state.items = [];
        localStorage.removeItem("cartItems");
      },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
