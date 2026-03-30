import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type MatchStatus = {
    #upcoming;
    #live;
    #completed;
  };

  type PlayerRole = {
    #batsman;
    #bowler;
    #allrounder;
    #wicketkeeper;
  };

  type Player = {
    name : Text;
    team : Text;
    role : PlayerRole;
    credits : Int;
    points : Int;
  };

  type Match = {
    id : Nat;
    team1 : Text;
    team2 : Text;
    dateTime : Text;
    status : MatchStatus;
  };

  type Contest = {
    matchId : Nat;
    prizePool : Int;
    entryFee : Int;
    participants : [Principal];
  };

  type UserTeam = {
    players : [Player];
    captain : Player;
    viceCaptain : Player;
  };

  type LeaderboardEntry = {
    user : Principal;
    points : Int;
    prize : Int;
  };

  module LeaderboardEntry {
    public func compare(entry1 : LeaderboardEntry, entry2 : LeaderboardEntry) : Order.Order {
      Int.compare(entry2.points, entry1.points);
    };
  };

  type IPLKing = {
    matches : Map.Map<Nat, Match>;
    contests : Map.Map<Nat, Contest>;
    players : Map.Map<Nat, Player>;
    userTeams : Map.Map<Principal, UserTeam>;
    leaderboard : Map.Map<Principal, LeaderboardEntry>;
  };

  let state : IPLKing = {
    matches = Map.empty<Nat, Match>();
    contests = Map.empty<Nat, Contest>();
    players = Map.empty<Nat, Player>();
    userTeams = Map.empty<Principal, UserTeam>();
    leaderboard = Map.empty<Principal, LeaderboardEntry>();
  };

  public query ({ caller }) func getMatches() : async [Match] {
    state.matches.values().toArray();
  };

  public query func getContests(matchId : Nat) : async [Contest] {
    let contests = List.empty<Contest>();
    for (contest in state.contests.values()) {
      if (contest.matchId == matchId) {
        contests.add(contest);
      };
    };
    contests.toArray();
  };

  public query ({ caller }) func getPlayers() : async [Player] {
    state.players.values().toArray();
  };

  public query ({ caller }) func getLeaderboard() : async [LeaderboardEntry] {
    state.leaderboard.values().toArray().sort();
  };

  public shared ({ caller }) func createTeam(players : [Player], captain : Player, viceCaptain : Player) : async () {
    if (players.size() != 11) {
      Runtime.trap("Team must have 11 players");
    };
    let userTeam = {
      players = players;
      captain;
      viceCaptain;
    };
    state.userTeams.add(caller, userTeam);
  };

  public query ({ caller }) func getContestDetails(contestId : Nat) : async ?Contest {
    state.contests.get(contestId);
  };

  public query ({ caller }) func getParticipantsCount(contestId : Nat) : async Nat {
    switch (state.contests.get(contestId)) {
      case (?contest) { contest.participants.size() };
      case (null) { 0 };
    };
  };
};
