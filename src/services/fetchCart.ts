import { useQuery } from "react-query";

import api from "./api.ts";

import Cart from "../features/cart/types.ts";

type PaginateFetch = () => Promise<Cart[]>;

const fetchCarts: PaginateFetch = async (page = 1) => {
  const cartItemsJSON = localStorage.getItem("cartItems");
  const cartItems: Cart[] = cartItemsJSON ? JSON.parse(cartItemsJSON) : [];

  return cartItems;
};

const useFetchCart = () =>
  useQuery(["carts"], () => fetchCarts(), {
    keepPreviousData: true,
  });

export default useFetchCart;
