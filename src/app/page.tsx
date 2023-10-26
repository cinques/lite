import { ClientComponent } from "@/components/ClientComponent";
import { getMatches, getTournaments } from "@/server/queries";

export default async function Home() {
  const tournaments = await getTournaments(1);
  const matches = await getMatches(1);

  return (
    <div>
      Hello world
      <div>
        {tournaments.map((tournament) => (
          <div key={tournament.id}>{tournament.name}</div>
        ))}

        {matches.map((match) => (
          <div key={match.id}>
            {match.team1.name} vs {match.team2.name}
            {match.games.map((game) => (
              <div key={game.id}>
                {game.score1}:{game.score2}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ClientComponent />
    </div>
  );
}
