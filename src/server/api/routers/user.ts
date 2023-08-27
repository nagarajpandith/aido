import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  changeLanguage: protectedProcedure
    .input(
      z.object({
        language: z.enum(["en-US", "hi", "ja"]),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          languageSpeak: input.language,
          languageText: input.language,
        },
      });
    }),
});
