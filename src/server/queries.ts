import { db } from "./db";

export async function getTournaments(playerId: number) {
  return await db.tournament.findMany({
    where: {
      events: {
        some: {
          matches: {
            some: {
              OR: [
                { team1: { players: { some: { playerId } } } },
                { team2: { players: { some: { playerId } } } },
              ],
            },
          },
        },
      },
    },
  });

  // console.time("raw get");
  // const result = await db.$queryRaw<Tournament[]>`
  //   SELECT * FROM Tournament WHERE id IN
  //     (
  //       SELECT e.tournamentId FROM Event e JOIN Match m ON e.id = m.eventId WHERE
  //         m.team1Id IN (SELECT teamId FROM TeamPlayer WHERE playerId = ${id})
  //         OR
  //         m.team2Id IN (SELECT teamId FROM TeamPlayer WHERE playerId = ${id})
  //     )
  //   `;
  // console.timeEnd("raw get");
  // return result;

  // return await db.$queryRaw`
  //   SELECT * FROM "Tournament" WHERE
  //     ("Tournament"."id") IN
  //       (
  //         SELECT "e"."tournamentId" FROM "Event" AS "e" WHERE
  //           (("e"."id") IN
  //             (
  //               SELECT "m"."eventId" FROM "Match" AS "m" LEFT JOIN "Team" AS "t" ON ("t"."id") = ("m"."team1Id") LEFT JOIN "Team" AS "t2" ON ("t2"."id") = ("m"."team2Id") WHERE
  //                 (
  //                   (
  //                     (("t"."id") IN (SELECT "tp"."teamId" FROM "TeamPlayer" AS "tp" WHERE ("tp"."playerId" = ${id} AND "tp"."teamId" IS NOT NULL)) AND ("t"."id" IS NOT NULL))
  //                     OR
  //                     (("t2"."id") IN (SELECT "tp2"."teamId" FROM "TeamPlayer" AS "tp2" WHERE ("tp2"."playerId" = ${id} AND "tp2"."teamId" IS NOT NULL)) AND ("t2"."id" IS NOT NULL))
  //                   )
  //                   AND "m"."eventId" IS NOT NULL))
  //           AND "e"."tournamentId" IS NOT NULL)
  //       )`;
}

export async function getMatches(playerId: number) {
  return await db.match.findMany({
    where: {
      OR: [
        { team1: { players: { some: { playerId } } } },
        { team2: { players: { some: { playerId } } } },
      ],
    },
    include: { team1: true, team2: true, games: true },
  });
}
