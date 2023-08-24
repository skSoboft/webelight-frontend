import { useQuery } from "react-query";
import api from "./api.ts";
import Product from "../features/products/types.ts";

type PaginateFetch = (
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => Promise<Product[]>;

const fetchProducts: PaginateFetch = async (category, minPrice, maxPrice) => {
  console.log("Category::", typeof minPrice, maxPrice);
  const queryParams = new URLSearchParams();
  if (category) {
    queryParams.append("category", category);
  }
  if (minPrice && minPrice !== undefined && minPrice !== null) {
    queryParams.append("minPrice", minPrice.toString());
  }
  if (maxPrice && maxPrice !== undefined && minPrice !== null) {
    queryParams.append("maxPrice", maxPrice.toString());
  }

  const { data } = await api.get(
    `${process.env.REACT_APP_API_URL}/products?${queryParams.toString()}`
  );
  console.log("data::", data);
  return data;
};

const useFetchProducts = (
  category?: string,
  minPrice?: number,
  maxPrice?: number
) =>
  useQuery(
    ["products", category, minPrice, maxPrice],
    () => fetchProducts(category, minPrice, maxPrice),
    {
      keepPreviousData: true,
    }
  );

export default useFetchProducts;
