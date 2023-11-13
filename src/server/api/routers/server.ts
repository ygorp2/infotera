import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { hotels, suggestions } from "db.json";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const SuggestionsSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    region: z.string(),
    type: z.string(),
  })
  .array();

export const HotelSchema = z.object({
  id: z.number(),
  hotel: z.object({
    name: z.string(),
    address: z.string(),
    stars: z.number(),
    image: z.string(),
    description: z.string(),
  }),
  lowestPrice: z.object({ currency: z.string(), amount: z.number() }),
  rooms: z.array(
    z.object({
      roomType: z.object({ name: z.string() }),
      price: z.object({ currency: z.string(), amount: z.number() }),
      cancellationPolicies: z.object({ refundable: z.boolean() }),
    }),
  ),
});

export const serverRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .output(
      z.object({
        greeting: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getSuggestions: publicProcedure
    .input(
      z.object({ searchTerm: z.string(), limit: z.number().gte(1).optional() }),
    )
    .output(SuggestionsSchema)
    .query(({ input }) => {
      const suggestion = suggestions.filter((suggestions) => {
        return (
          suggestions.name.toLowerCase().includes(input.searchTerm) ||
          suggestions.region.toLowerCase().includes(input.searchTerm)
        );
      });
      return suggestion.slice(0, input.limit ?? suggestion.length);
    }),
  getHotels: publicProcedure.output(HotelSchema.array()).query(() => {
    return hotels;
  }),
  getHotel: publicProcedure
    .input(z.object({ hotelId: z.number() }))
    .output(HotelSchema.optional())
    .query(({ input }) => {
      const hotel = hotels.filter((hotel) => {
        return hotel.id === input.hotelId;
      });
      return hotel[0];
    }),
});

export type ServerRouterInputs = inferRouterInputs<typeof serverRouter>;
export type ServerRouterOutputs = inferRouterOutputs<typeof serverRouter>;
