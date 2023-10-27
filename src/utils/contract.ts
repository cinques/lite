import { z } from "zod";
import { createContract } from "@restype/core";

export const contract = createContract({
  player: {
    tournaments: {
      method: "GET",
      path: "/player/:id/tournaments",
      responses: {
        200: z.array(z.object({ id: z.number(), name: z.string() })),
      },
    },
    matches: {
      method: "GET",
      path: "/player/:id/matches",
      responses: {
        200: z.array(z.object({})),
      },
    },
  },
});
