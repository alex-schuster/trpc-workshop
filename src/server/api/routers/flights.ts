import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const getAll = publicProcedure.query(({ ctx }) => {
  return ctx.prisma.flight.findMany();
});

const filterFlightsInput = z.object({
  originCode: z.string().optional(),
  destinationCode: z.string().optional(),
  departureAfter: z.string().datetime().optional(),
  arrivalBefore: z.string().datetime().optional(),
  maxPrice: z.number().int().optional(),
  excludeFullyBooked: z.boolean().optional(),
});

const filterFlights = publicProcedure
  .input(filterFlightsInput)
  .query(async ({ ctx, input }) => {
    if (!input.originCode && !input.destinationCode) {
      return [];
    }
    const flights = await ctx.prisma.flight.findMany({
      where: {
        originId: input.originCode,
        destinationId: input.destinationCode,
        departureAt: input.departureAfter
          ? { gte: new Date(input.departureAfter) }
          : undefined,
        arrivalAt: input.arrivalBefore
          ? { lte: new Date(input.arrivalBefore) }
          : undefined,
        price: input.maxPrice ? { lte: input.maxPrice } : undefined,
      },
      include: { passengers: true },
    });
    return flights.filter((item) => {
      if (!input.excludeFullyBooked) {
        return true;
      }
      return item.passengers.length < item.capacity;
    });
  });

const bookFlightInput = z.object({
  passengerId: z.string().cuid2(),
  flightId: z.string().cuid2(),
});

const bookFlight = publicProcedure
  .input(bookFlightInput)
  .query(async ({ ctx, input }) => {
    const flight = await ctx.prisma.flight.update({
      where: { id: input.flightId },
      data: {
        passengers: {
          connect: {
            id: input.passengerId,
          },
        },
      },
      include: { passengers: true },
    });
    return flight;
  });

export const flightsRouter = createTRPCRouter({
  getAll,
  filterFlights,
  bookFlight,
});
