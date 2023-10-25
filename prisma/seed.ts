import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tournament1 = await prisma.tournament.create({
    data: {
      name: "moscow stage 6",
    },
  });

  const players = await Promise.all(
    ["Artem", "Kolyan", "Ilyha", "Bogdan"].map((name) =>
      prisma.player.create({
        data: {
          name,
        },
      }),
    ),
  );

  const teams = await Promise.all(
    ["ArtKol", "IlBog"].map((name) =>
      prisma.team.create({
        data: {
          name,
        },
      }),
    ),
  );

  const teamPlayers = [
    [teams[0]!.id, players[0]!.id],
    [teams[0]!.id, players[1]!.id],
    [teams[1]!.id, players[2]!.id],
    [teams[1]!.id, players[3]!.id],
  ] as const;

  await Promise.all(
    teamPlayers.map(([teamId, playerId]) =>
      prisma.teamPlayer.create({
        data: { teamId, playerId },
      }),
    ),
  );

  const event = await prisma.event.create({
    data: {
      name: "some event",
      format: "Open Doubles",
      tournamentId: tournament1.id,
      matches: {
        create: {
          format: "best of 5",
          team1Id: teams[0]!.id,
          team2Id: teams[1]!.id,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
