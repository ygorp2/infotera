import { suggestions } from "db.json";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const serverRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getSuggestions: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(({ input }) => {
      const suggestion = suggestions.filter((suggestions) => {
        return (
          suggestions.name.toLowerCase().includes(input.searchTerm) ||
          suggestions.region.toLowerCase().includes(input.searchTerm)
        );
      });
      return suggestion;
    }),
});
