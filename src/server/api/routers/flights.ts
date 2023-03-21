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

const bookOrCancelFlightInput = z.object({
  passengerId: z.string(),
  flightId: z.string(),
});

const bookFlight = publicProcedure
  .input(bookOrCancelFlightInput)
  .mutation(async ({ ctx, input }) => {
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

const getMyFlights = publicProcedure
  .input(z.object({ passengerId: z.string() }))
  .query(async ({ ctx, input }) => {
    const flights = await ctx.prisma.flight.findMany({
      where: {
        passengers: {
          some: {
            id: input.passengerId,
          },
        },
      },
      include: { passengers: true },
    });
    return flights;
  });

const cancelFlight = publicProcedure
  .input(bookOrCancelFlightInput)
  .mutation(async ({ ctx, input }) => {
    const flight = await ctx.prisma.flight.update({
      where: { id: input.flightId },
      data: {
        passengers: {
          disconnect: {
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
  getMyFlights,
  cancelFlight,
});
