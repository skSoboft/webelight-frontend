import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { store, persistor } from "./store.ts";
import ProductList from "./pages/Home.tsx";
import Cart from "./pages/CartPage.tsx";
import PurchaseHistory from "./pages/PurchaseHistory.tsx";
import { PersistGate } from "redux-persist/integration/react";
import LoginForm from "./pages/Login.tsx";
import RegistrationForm from "./pages/Registeration.tsx";
import ProtectedRoute from "./ProtectedRoute.ts"; 

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div>
              <h1>E-Commerce App</h1>
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isSignedIn={true}>
                      <ProductList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute isSignedIn={true}>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/purchase-history"
                  element={
                    <ProtectedRoute isSignedIn={true}>
                      <PurchaseHistory />
                    </ProtectedRoute>
                  }
                />
                {/* <ProtectedRoute path="/" element={<ProductList />} />
                <ProtectedRoute path="/cart" element={<Cart />} /> */}
                {/* <ProtectedRoute
                  path="/purchase-history"
                  element={<PurchaseHistory />}
                /> */}
              </Routes>
            </div>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
