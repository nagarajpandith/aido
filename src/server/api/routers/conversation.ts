import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const conversationRouter = createTRPCRouter({
  createConversation: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        type: z.enum(["Query", "Support"]),
        author: z.enum(["user", "bot"]),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.conversation.create({
        data: {
          message: input.text,
          userId: ctx.session.user.id,
          type: input.type,
          author: input.author,
        },
      });
    }),

  getConversation: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.conversation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
