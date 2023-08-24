import { useQuery } from "react-query";
import api from "./api.ts";

const fetchPurchaseHistory = async (timeFrame) => {
  const { data } = await api.get(
    `${process.env.REACT_APP_API_URL}/purchase-history`,
    {
      params: { timeFrame },
    }
  );
  console.log("Data::", data);
  return data;
};

const useFetchPurchaseHistory = (selectedTimeFrame) =>
  useQuery(
    ["purchaseHistory", selectedTimeFrame],
    () => fetchPurchaseHistory(selectedTimeFrame),
    {
      keepPreviousData: true,
    }
  );

export default useFetchPurchaseHistory;
