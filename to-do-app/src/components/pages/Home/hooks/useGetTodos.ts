import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../api/axiosinstance";
import useStore from "../../../../state/store";

async function getTodos() {
  const data = axiosInstance.get("todos/");
  return data;
}

const useGetTodos = () => {
  const { isLoading, isError, data, error } = useQuery(["todos"], getTodos);

  return { isLoading, isError, data, error };
};

export default useGetTodos;
