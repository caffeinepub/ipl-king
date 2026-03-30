import { useMutation, useQuery } from "@tanstack/react-query";
import type { Player } from "../backend.d";
import { useActor } from "./useActor";

export function useGetMatches() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMatches();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContests(matchId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contests", matchId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContests(matchId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPlayers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlayers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTeam() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      players,
      captain,
      viceCaptain,
    }: { players: Player[]; captain: Player; viceCaptain: Player }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createTeam(players, captain, viceCaptain);
    },
  });
}
