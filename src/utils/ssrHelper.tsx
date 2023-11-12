import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../server/api/root";

export const ssrHelper = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: {},
  });
};
