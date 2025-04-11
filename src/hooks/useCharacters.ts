import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../api/rickAndMortyApi";
import { CHARACTER_LINK, CHARACTERS_LINK } from "constants/rickAndMortyApi";

export const useCharacters = (search: string) => {
  return useInfiniteQuery({
    queryKey: [`${CHARACTERS_LINK}`, search],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/${CHARACTER_LINK}`, {
        params: { page: pageParam, name: search },
      });
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.info.next?.split("page=")[1] || undefined;
    },
  });
};
