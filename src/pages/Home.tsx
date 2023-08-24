import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/api.ts";
import { selectCartItems } from "../features/cart/cartSlice.ts";
import ProductCard from "../components/product/ProductCard.tsx";
import { fakeProducts } from "../fakeData.ts";
import { Product } from "../features/products/types.ts";
import Button from "../components/common/Button.tsx";
import AddProductModal from "../components/product/addProductModal.tsx";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productsSlice.ts";
import { useQuery } from "react-query";
import { fetchProducts } from "../features/products/productsSlice.ts";
import useFetchProducts from "../services/fetchProduct.ts";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function ProductList() {
  const location = useLocation();
  const { updated } = location.state || {};

  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const navigate = useNavigate(); 

  const [cartTotal, setCartTotal] = useState(0); 
  useEffect(() => {
    if (updated) {
      setCartTotal(0);
    }
  }, [updated]);
  const {
    data: productList,
    isLoading,
    isError,
  } = useFetchProducts(categoryFilter, minPriceFilter, maxPriceFilter);
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  useEffect(() => {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartTotal(totalQuantity);
  }, [cartItems]);
  console.log("productList::", productList);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCountOfCart = (total) => {
    setCartTotal(total);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Products</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button className="btn btn-primary" onClick={openModal}>
            Add Product
          </button>
        </div>
        <div className="filter-container d-flex justify-content-between align-items-center mb-3">
          <select
            className="form-select me-2"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="category 1">Category 1</option>
            <option value="category 2">Category 2</option>
            {/* Add more categories as needed */}
          </select>
          <input
            className="form-control me-2"
            type="number"
            placeholder="Min Price"
            value={minPriceFilter}
            onChange={(e) => setMinPriceFilter(e.target.value)}
          />
          <input
            className="form-control me-2"
            type="number"
            placeholder="Max Price"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
          />
        </div>

        <div className="cart-data">
          <span className="cart-logo" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="fs-4 ms-3 cart-logo" color="#0d6efd" />
          </span>
          <span className="ms-1 cart-number">{cartTotal}</span>
          <span onClick={() => navigate("/purchase-history")}>
            <FaUser className="fs-4 ms-3 cart-logo" color="#0d6efd" />
          </span>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-4">
        {productList.map((product) => (
          <div key={product.id} className="col mb-4">
            <ProductCard
              product={product}
              handleCountOfCart={handleCountOfCart}
            />
          </div>
        ))}
      </div>
      <AddProductModal show={isModalOpen} onHide={closeModal} />
    </div>
  );
}

export default ProductList;
