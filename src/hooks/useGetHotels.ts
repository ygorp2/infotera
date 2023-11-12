import { api } from "@/utilsapi";

export default function useGetHotels() {
  return api.server.getHotels.useQuery(undefined, {
    staleTime: Infinity,
  });
}
