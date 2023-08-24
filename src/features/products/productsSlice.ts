import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../store.ts"; // Adjust the path as needed
import axios from "axios";
import { Product } from "./types"; 

interface ProductsState {
  items: Product[];
  
}

const initialState: ProductsState = {
  items: [],
  
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProductSuccess: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProductStatusSuccess: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      console.log("Upsakldf::", updatedProduct);
      
      const productToUpdate = state.items.find(
        (product) => product.id === updatedProduct.id
      );

      
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.product.id !== updatedProduct.id
      );
      state.items = [];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    },
  },
});

export const { setProducts, addProductSuccess, updateProductStatusSuccess } =
  productsSlice.actions;

export const addProduct =
  (product: Product): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        product
      );
      dispatch(addProductSuccess(response.data));
    } catch (error) {
      
      console.error("Error adding product:", error);
    }
  };


export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products`
    ); 
    dispatch(setProducts(response.data));
  } catch (error) {
    
    console.error("Error fetching products:", error);
  }
};

export const updateProductStatus =
  (productId): AppThunk =>
  async (dispatch) => {
    try {
        console.log('ProductId::', productId);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${productId.productId}/status`
      ); 
      dispatch(updateProductStatusSuccess(response.data));
    } catch (error) {
    
      console.error("Error updating product status:", error);
    }
  };


export const selectProducts = (state: RootState) => state.products.items;

export default productsSlice.reducer;
