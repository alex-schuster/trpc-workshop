import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const findAirports = publicProcedure.query(async ({ ctx }) => {
  return await ctx.prisma.airport.findMany();
});

export const flightsRouter = createTRPCRouter({
  findAirports
});
