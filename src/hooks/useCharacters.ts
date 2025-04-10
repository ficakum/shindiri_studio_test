import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../api/rickAndMortyApi";

export const useCharacters = (search: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", search], // Query key
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get("/character", {
        params: { page: pageParam, name: search },
      });
      return res.data; // Return the result
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // Get next page param
      return lastPage.info.next?.split("page=")[1] || undefined;
    },
  });
};
