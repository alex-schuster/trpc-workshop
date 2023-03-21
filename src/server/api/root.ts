import { createTRPCRouter } from "~/server/api/trpc";
import { flightsRouter } from "~/server/api/routers/flights";
import { airportsRouter } from "./routers/airports";
import { passengersRouter } from "./routers/passengers";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  flights: flightsRouter,
  airports: airportsRouter,
  passengers: passengersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
