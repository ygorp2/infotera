import { api } from "@/utilsapi";

export default function useGetSuggestions({
  searchTerm,
}: {
  searchTerm: string;
}) {
  return api.server.getSuggestions.useQuery(
    {
      searchTerm,
    },
    {
      staleTime: Infinity,
    },
  );
}
