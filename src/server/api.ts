import { createRouter } from "@restype/core";
import { contract } from "@/utils/contract";
import { getTournaments } from "@/server/queries";

const createContext = () => void 0;

export const router = createRouter(contract, createContext, {
  playerTournaments: async ({ params }) => {
    const playerId = parseInt(params.id); // TODO auto parse?
    const tournaments = await getTournaments(playerId);

    return {
      status: 200,
      body: tournaments,
    };
  },
});
