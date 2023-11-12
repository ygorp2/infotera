import { api } from "@/utilsapi";

export default function useGetHotel({
  hotelId,
  enabled = true,
}: {
  hotelId: number;
  enabled?: boolean;
}) {
  return api.server.getHotel.useQuery(
    {
      hotelId,
    },
    {
      staleTime: Infinity,
      enabled,
    },
  );
}
