import { createRouter } from "@restype/core";
import { contract } from "@/utils/contract";
import { getTournaments, getMatches } from "@/server/queries";

const createContext = () => void 0;

export const router = createRouter(contract, createContext, {
  player: {
    tournaments: async ({ params }) => {
      const playerId = parseInt(params.id); // TODO auto parse?
      const tournaments = await getTournaments(playerId);
      return {
        status: 200,
        body: tournaments,
      };
    },
    matches: async ({ params }) => {
      const playerId = parseInt(params.id);
      const mathces = await getMatches(playerId);

      return {
        status: 200,
        body: mathces,
      };
    },
  },
});
