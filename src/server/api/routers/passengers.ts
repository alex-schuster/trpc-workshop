import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const createPassengerInput = z.object({
  surname: z.string(),
  givenName: z.string(),
});

export type CreatePassengerInput = z.infer<typeof createPassengerInput>;

const create = publicProcedure
  .input(createPassengerInput)
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.passenger.create({
      data: {
        surname: input.surname,
        givenName: input.givenName,
      },
    });
  });

const getOne = publicProcedure
  .input(z.string().cuid2())
  .query(async ({ ctx, input }) => {
    return await ctx.prisma.passenger.findUnique({
      where: {
        id: input,
      },
      include: {
        flights: true,
      },
    });
  });

export const passengersRouter = createTRPCRouter({
  create,
  getOne,
});
