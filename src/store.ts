import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./features/products/productsSlice.ts";
import cartReducer from "./features/cart/cartSlice.ts";
import purchaseHistoryReducer from "./features/purchaseHistory/purchaseHistorySlice.ts";
import authReducer from "./features/auth/authSlice.ts"; 


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);  


const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: persistedCartReducer,
    purchaseHistory: purchaseHistoryReducer,
    auth: persistedAuthReducer,
    
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store, persistor };
