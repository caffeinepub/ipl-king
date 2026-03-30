import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    credits: bigint;
    name: string;
    role: PlayerRole;
    team: string;
    points: bigint;
}
export interface LeaderboardEntry {
    user: Principal;
    prize: bigint;
    points: bigint;
}
export interface Match {
    id: bigint;
    status: MatchStatus;
    team1: string;
    team2: string;
    dateTime: string;
}
export interface Contest {
    participants: Array<Principal>;
    matchId: bigint;
    entryFee: bigint;
    prizePool: bigint;
}
export enum MatchStatus {
    upcoming = "upcoming",
    live = "live",
    completed = "completed"
}
export enum PlayerRole {
    bowler = "bowler",
    allrounder = "allrounder",
    wicketkeeper = "wicketkeeper",
    batsman = "batsman"
}
export interface backendInterface {
    createTeam(players: Array<Player>, captain: Player, viceCaptain: Player): Promise<void>;
    getContestDetails(contestId: bigint): Promise<Contest | null>;
    getContests(matchId: bigint): Promise<Array<Contest>>;
    getLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getMatches(): Promise<Array<Match>>;
    getParticipantsCount(contestId: bigint): Promise<bigint>;
    getPlayers(): Promise<Array<Player>>;
}
