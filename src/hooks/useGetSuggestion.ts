import { api } from "@/utilsapi";

export default function useGetSuggestions({
  searchTerm,
  limit,
  enabled = true,
}: {
  searchTerm: string;
  limit?: number;
  enabled?: boolean;
}) {
  return api.server.getSuggestions.useQuery(
    {
      searchTerm,
      limit,
    },
    {
      staleTime: Infinity,
      enabled,
    },
  );
}
