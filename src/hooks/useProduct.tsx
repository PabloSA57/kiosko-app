import { api } from "@utils/axios";
import useSWRImmutable from "swr/immutable";

const fetcher = async (url: string) => {
  const res = await api.get(url);

  return res.data;
};

const useProduct = () => {
  const { data, error, isLoading } = useSWRImmutable(
    "product-store/allproductstore/",
    fetcher
  );

  return { data, error, isLoading };
};

export default useProduct;
