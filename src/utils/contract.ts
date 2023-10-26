import { z } from "zod";
import { createContract } from "@restype/core";

export const contract = createContract({
  playerTournaments: {
    method: "GET",
    path: "/player/:id/tournaments",
    responses: {
      200: z.array(z.object({ id: z.number(), name: z.string() })),
    },
  },
});
