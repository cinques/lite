"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/query-client";
import { r } from "@/utils/restype-client";

export function ClientComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Some />
    </QueryClientProvider>
  );
}

function Some() {
  const { isLoading, data, error } = r.player.tournaments.useQuery({
    params: { id: "1" },
  });

  if (isLoading) {
    return <div>is loading</div>;
  }

  if (error) {
    return <div>error </div>;
  }

  return <div>some: {JSON.stringify(data)}</div>;
}
