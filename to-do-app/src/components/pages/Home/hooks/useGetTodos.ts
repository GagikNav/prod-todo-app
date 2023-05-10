import axios from "axios";
import baseURL from "../../../../api/url";
import { useQuery } from "@tanstack/react-query";

async function getTodos() {
  const data = await axios({
    method: "get",
    url: baseURL + "/todos/",
  });
  return data;
}

const useGetTodos = () => {
  const { isLoading, isError, data, error } = useQuery(["todos"], getTodos);

  return { isLoading, isError, data, error };
};

export default useGetTodos;
