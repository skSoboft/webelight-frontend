

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk, RootState } from "../../store";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  
}

interface PurchasedItem {
  id: string;
  product: Product;
  quantity: number;
  image: string;
  purchaseDate: string; 
}

interface PurchaseHistoryState {
  items: PurchasedItem[];
}

const initialState: PurchaseHistoryState = {
  items: [],
};

const purchaseHistorySlice = createSlice({
  name: "purchaseHistory",
  initialState,
  reducers: {
    addPurchaseHistory: (state, action: PayloadAction<PurchasedItem>) => {
      state.items.push(action.payload);
    },
    
  },
});

export const { addPurchaseHistory } = purchaseHistorySlice.actions;
export const addPurchaseHistoryList =
  (product): AppThunk =>
  async (dispatch) => {
    try {
      console.log("Product::", product);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/history/purchase`,
        product
      ); 
      console.log("Response::", response);
      dispatch(addPurchaseHistory(response.data));
    } catch (error) {
      
      console.error("Error adding product:", error);
    }
  };

  

export default purchaseHistorySlice.reducer;
