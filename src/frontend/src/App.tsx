import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  ChevronRight,
  Crown,
  Menu,
  Shield,
  Star,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetLeaderboard, useGetMatches } from "./hooks/useQueries";

// ── Types ──────────────────────────────────────────────────────────────────
interface ContestCard {
  id: string;
  team1: string;
  team2: string;
  team1Flag: string;
  team2Flag: string;
  dateTime: string;
  prizePool: string;
  entryFee: string;
  spots: string;
  status: "live" | "upcoming";
}

interface LeaderboardRow {
  rank: number;
  user: string;
  avatar: string;
  points: number;
  prize: string;
}

// ── Static Data ────────────────────────────────────────────────────────────
const CONTESTS: ContestCard[] = [
  {
    id: "1",
    team1: "KKR",
    team2: "MI",
    team1Flag: "🟣",
    team2Flag: "🔵",
    dateTime: "Today, 7:30 PM",
    prizePool: "₹1,00,000",
    entryFee: "₹49",
    spots: "1,024 spots left",
    status: "live",
  },
  {
    id: "2",
    team1: "CSK",
    team2: "RCB",
    team1Flag: "🟡",
    team2Flag: "🔴",
    dateTime: "Today, 3:30 PM",
    prizePool: "₹2,50,000",
    entryFee: "₹99",
    spots: "512 spots left",
    status: "live",
  },
  {
    id: "3",
    team1: "RR",
    team2: "SRH",
    team1Flag: "🩷",
    team2Flag: "🟠",
    dateTime: "Tomorrow, 7:30 PM",
    prizePool: "₹75,000",
    entryFee: "₹29",
    spots: "2,048 spots left",
    status: "upcoming",
  },
  {
    id: "4",
    team1: "GT",
    team2: "PBKS",
    team1Flag: "🔵",
    team2Flag: "🔴",
    dateTime: "Apr 2, 3:30 PM",
    prizePool: "₹50,000",
    entryFee: "₹49",
    spots: "4,096 spots left",
    status: "upcoming",
  },
  {
    id: "5",
    team1: "DC",
    team2: "LSG",
    team1Flag: "💙",
    team2Flag: "🟢",
    dateTime: "Apr 3, 7:30 PM",
    prizePool: "₹1,50,000",
    entryFee: "₹79",
    spots: "768 spots left",
    status: "upcoming",
  },
];

const MOCK_LEADERBOARD: LeaderboardRow[] = [
  {
    rank: 1,
    user: "Rohit_King99",
    avatar: "RK",
    points: 1842,
    prize: "₹25,000",
  },
  {
    rank: 2,
    user: "CricketMaster",
    avatar: "CM",
    points: 1795,
    prize: "₹15,000",
  },
  {
    rank: 3,
    user: "FantasyGuru07",
    avatar: "FG",
    points: 1761,
    prize: "₹10,000",
  },
  { rank: 4, user: "IPLPro_2024", avatar: "IP", points: 1734, prize: "₹5,000" },
  { rank: 5, user: "Virat_Fan11", avatar: "VF", points: 1698, prize: "₹3,000" },
  { rank: 6, user: "BatSmash_X", avatar: "BX", points: 1672, prize: "₹1,500" },
  { rank: 7, user: "SixMachine", avatar: "SM", points: 1645, prize: "₹1,000" },
  { rank: 8, user: "DreamTeam_01", avatar: "DT", points: 1619, prize: "₹500" },
];

const NAV_LINKS = [
  "Home",
  "Contests",
  "Teams",
  "Stats",
  "Leaderboard",
  "Schedule",
];

const FEATURES = [
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Dynamic Player Stats",
    desc: "Live performance metrics, form guides, and match analytics for every IPL player to make smarter picks.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real-Time Scoring",
    desc: "Ball-by-ball fantasy points updating instantly as your players score runs, take wickets, and field brilliantly.",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Detailed Analytics",
    desc: "Deep-dive into pitch conditions, head-to-head stats, and AI-powered player recommendations.",
  },
];

// ── Components ─────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.11_0.028_152/0.97)] shadow-panel backdrop-blur-md"
          : "bg-[oklch(0.11_0.028_152/0.8)] backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#home" className="flex-shrink-0" data-ocid="nav.link">
          <img
            src="/assets/generated/iplking-logo-transparent.dim_300x100.png"
            alt="IPL King"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              data-ocid="nav.link"
              className="px-3 py-2 text-sm font-semibold tracking-wide text-text-secondary hover:text-gold transition-colors duration-200 uppercase"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            data-ocid="nav.primary_button"
            className="rounded-full border-gold text-gold hover:bg-gold hover:text-[oklch(0.09_0.01_145)] font-bold uppercase tracking-wider text-xs transition-all duration-200"
            onClick={() => toast.info("Login coming soon!")}
          >
            Login
          </Button>
          <Button
            size="sm"
            data-ocid="nav.secondary_button"
            className="rounded-full bg-gold-gradient text-[oklch(0.09_0.01_145)] font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all duration-200 shadow-gold-glow"
            onClick={() => toast.info("Sign Up coming soon!")}
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 text-text-primary"
          data-ocid="nav.toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-green-panel border-t border-green-border px-4 pb-4"
          >
            <nav className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  data-ocid="nav.link"
                  className="px-3 py-3 text-sm font-semibold text-text-secondary hover:text-gold uppercase tracking-wide border-b border-green-border/40 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="flex gap-2 pt-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-gold text-gold font-bold uppercase text-xs"
                  data-ocid="nav.primary_button"
                  onClick={() => toast.info("Login coming soon!")}
                >
                  Login
                </Button>
                <Button
                  className="flex-1 rounded-full bg-gold-gradient text-[oklch(0.09_0.01_145)] font-bold uppercase text-xs"
                  data-ocid="nav.secondary_button"
                  onClick={() => toast.info("Sign Up coming soon!")}
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[600px] flex items-center pt-16 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/cricket-stadium-hero.dim_1400x600.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[oklch(0.07_0.025_150/0.75)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.07_0.025_150/0.90)] via-[oklch(0.07_0.025_150/0.60)] to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-gold text-[oklch(0.09_0.01_145)] font-bold text-xs uppercase tracking-widest px-3 py-1">
              🏏 IPL 2025 Season Live
            </Badge>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl leading-tight mb-4">
            <span className="text-text-primary">BUILD YOUR</span>
            <br />
            <span className="text-gold">DREAM IPL TEAM!</span>
          </h1>

          <p className="text-text-secondary text-lg mb-8 max-w-md leading-relaxed">
            Pick your 11 cricketers, outsmart millions of fans, and win massive
            cash prizes every match day.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              className="rounded-full bg-gold-gradient text-[oklch(0.09_0.01_145)] font-bold uppercase tracking-widest px-8 py-6 text-base hover:opacity-90 transition-all duration-200 shadow-gold-glow animate-pulse-gold"
              onClick={() => toast.success("Let's build your team!")}
            >
              PLAY NOW & WIN 🏆
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-ocid="hero.secondary_button"
              className="rounded-full border-text-secondary text-text-primary hover:border-gold hover:text-gold font-bold uppercase tracking-wider px-8 py-6 text-base transition-all duration-200"
              onClick={() => {
                const el = document.getElementById("contests");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Contests
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { label: "Active Players", value: "12L+" },
              { label: "Total Prizes Won", value: "₹50 Cr+" },
              { label: "Matches This Season", value: "74" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-gold font-display text-2xl font-extrabold">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContestCard({
  contest,
  index,
}: { contest: ContestCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      data-ocid={`contests.item.${index + 1}`}
      className="flex-shrink-0 w-72 bg-green-card rounded-2xl border border-green-border p-5 shadow-card hover:border-gold/50 hover:shadow-gold-glow transition-all duration-300 group"
    >
      {/* Status badge */}
      <div className="flex items-center justify-between mb-4">
        <Badge
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
            contest.status === "live"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-gold/15 text-gold border border-gold/30"
          }`}
        >
          {contest.status === "live" ? "● LIVE" : "⏰ UPCOMING"}
        </Badge>
        <span className="text-text-secondary text-xs">{contest.dateTime}</span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="text-center">
          <div className="text-2xl mb-1">{contest.team1Flag}</div>
          <div className="font-display font-extrabold text-text-primary text-lg tracking-wide">
            {contest.team1}
          </div>
        </div>
        <div className="text-center">
          <div className="text-text-secondary text-xs font-bold uppercase tracking-widest bg-green-panel px-2 py-1 rounded-full border border-green-border">
            VS
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1">{contest.team2Flag}</div>
          <div className="font-display font-extrabold text-text-primary text-lg tracking-wide">
            {contest.team2}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-green-panel rounded-xl p-3 text-center">
          <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
            Prize Pool
          </div>
          <div className="text-gold font-display font-extrabold text-base">
            {contest.prizePool}
          </div>
        </div>
        <div className="bg-green-panel rounded-xl p-3 text-center">
          <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">
            Entry Fee
          </div>
          <div className="text-text-primary font-display font-extrabold text-base">
            {contest.entryFee}
          </div>
        </div>
      </div>

      <div className="text-xs text-text-secondary text-center mb-4">
        {contest.spots}
      </div>

      <Button
        className="w-full rounded-full bg-gold-gradient text-[oklch(0.09_0.01_145)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-all duration-200 group-hover:shadow-gold-glow"
        data-ocid={`contests.primary_button.${index + 1}`}
        onClick={() =>
          toast.success(`Joining ${contest.team1} vs ${contest.team2}!`)
        }
      >
        Join Now <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </motion.div>
  );
}

function ActiveContestsSection() {
  const { data: matches } = useGetMatches();

  return (
    <section id="contests" className="py-20 bg-green-deep">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary uppercase tracking-widest mb-2">
            ACTIVE CONTESTS
          </h2>
          <p className="text-text-secondary text-sm uppercase tracking-wider">
            Join a contest and compete for massive prizes
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        {matches && matches.length > 0 ? null : null}

        {/* Horizontal scroll of contest cards */}
        <div
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {CONTESTS.map((contest, i) => (
            <ContestCard key={contest.id} contest={contest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildYourTeamSection() {
  return (
    <section id="teams" className="py-20 bg-green-panel">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary uppercase tracking-widest mb-2">
            BUILD YOUR TEAM
          </h2>
          <p className="text-text-secondary text-sm uppercase tracking-wider">
            Everything you need to dominate fantasy cricket
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`features.card.${i + 1}`}
              className="bg-green-card border border-green-border rounded-2xl p-8 text-center hover:border-gold/50 hover:shadow-gold-glow transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 text-gold mb-6 group-hover:bg-gold/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-extrabold text-text-primary uppercase tracking-wide mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            data-ocid="teams.primary_button"
            className="rounded-full bg-gold-gradient text-[oklch(0.09_0.01_145)] font-bold uppercase tracking-widest px-10 py-6 text-base hover:opacity-90 transition-all duration-200 shadow-gold-glow"
            onClick={() => toast.success("Team builder coming soon!")}
          >
            <Crown className="w-5 h-5 mr-2" /> Create Your Team Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function LiveLeaderboard() {
  const { data: backendLeaderboard, isLoading } = useGetLeaderboard();

  const rows: LeaderboardRow[] =
    backendLeaderboard && backendLeaderboard.length > 0
      ? backendLeaderboard.map((entry, i) => ({
          rank: i + 1,
          user: `${entry.user.toString().slice(0, 12)}...`,
          avatar: entry.user.toString().slice(0, 2).toUpperCase(),
          points: Number(entry.points),
          prize: `₹${Number(entry.prize).toLocaleString("en-IN")}`,
        }))
      : MOCK_LEADERBOARD;

  const rankStyle = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-text-secondary";
  };

  const rankIcon = (rank: number) => {
    if (rank === 1)
      return <Trophy className="w-4 h-4 inline mr-1 text-yellow-400" />;
    if (rank === 2)
      return <Shield className="w-4 h-4 inline mr-1 text-gray-300" />;
    if (rank === 3)
      return <Star className="w-4 h-4 inline mr-1 text-amber-600" />;
    return null;
  };

  return (
    <section id="leaderboard" className="py-20 bg-green-deep">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary uppercase tracking-widest mb-2">
            LIVE LEADERBOARD
          </h2>
          <p className="text-text-secondary text-sm uppercase tracking-wider">
            Top performers winning big this season
          </p>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-green-panel border border-green-border rounded-2xl overflow-hidden shadow-panel"
          data-ocid="leaderboard.table"
        >
          {isLoading ? (
            <div
              className="flex items-center justify-center py-12"
              data-ocid="leaderboard.loading_state"
            >
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-green-border hover:bg-transparent">
                  <TableHead className="text-gold font-bold uppercase tracking-wider text-xs w-16">
                    #
                  </TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider text-xs">
                    User
                  </TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider text-xs text-right">
                    Points
                  </TableHead>
                  <TableHead className="text-gold font-bold uppercase tracking-wider text-xs text-right">
                    Prize
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={row.rank}
                    data-ocid={`leaderboard.row.${i + 1}`}
                    className={`border-green-border transition-colors duration-200 hover:bg-green-card2 ${
                      row.rank <= 3 ? "bg-gold/5" : ""
                    }`}
                  >
                    <TableCell>
                      <span
                        className={`font-display font-extrabold text-base ${rankStyle(row.rank)}`}
                      >
                        {rankIcon(row.rank)}
                        {row.rank}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold text-xs flex-shrink-0">
                          {row.avatar}
                        </div>
                        <span className="text-text-primary font-semibold text-sm">
                          {row.user}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-text-primary font-bold font-display">
                        {row.points.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-gold font-bold font-display">
                        {row.prize}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <Button
            variant="outline"
            data-ocid="leaderboard.secondary_button"
            className="rounded-full border-gold text-gold hover:bg-gold/10 font-bold uppercase tracking-wider text-sm"
            onClick={() => toast.info("Full leaderboard coming soon!")}
          >
            View Full Leaderboard <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: <Users className="w-6 h-6" />,
      title: "Select Players",
      desc: "Pick 11 players from both teams within ₹100 credits budget.",
    },
    {
      num: "02",
      icon: <Crown className="w-6 h-6" />,
      title: "Pick Captain & VC",
      desc: "Your captain earns 2x points and vice-captain earns 1.5x points.",
    },
    {
      num: "03",
      icon: <Trophy className="w-6 h-6" />,
      title: "Join Contest & Win",
      desc: "Enter a contest and win based on your team's real match performance.",
    },
  ];
  return (
    <section id="stats" className="py-20 bg-green-panel">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary uppercase tracking-widest mb-2">
            HOW TO PLAY
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              data-ocid={`howto.card.${i + 1}`}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 text-gold mb-5 mx-auto">
                {step.icon}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-[oklch(0.09_0.01_145)] text-xs font-bold flex items-center justify-center font-display">
                  {step.num.slice(1)}
                </span>
              </div>
              <h3 className="font-display text-xl font-extrabold text-text-primary uppercase tracking-wide mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const columns = [
    {
      title: "Info",
      links: [
        "About IPL King",
        "Fantasy Cricket Rules",
        "Scoring System",
        "Player Credits",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press Kit"],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Fair Play Policy",
        "Responsible Gaming",
      ],
    },
  ];

  return (
    <footer className="bg-green-panel border-t border-green-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <img
              src="/assets/generated/iplking-logo-transparent.dim_300x100.png"
              alt="IPL King"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-text-secondary text-sm leading-relaxed">
              India's most exciting IPL fantasy cricket platform. Play, win, and
              become the IPL King.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-extrabold text-text-primary uppercase tracking-wider text-sm mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#footer"
                      className="text-text-secondary text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-green-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">
                🔞 18+ | Please Play Responsibly
              </p>
              <p className="text-text-secondary/60 text-xs">
                Fantasy cricket involves financial risk. Play within your means.
              </p>
            </div>
            <p className="text-text-secondary/60 text-xs text-center">
              © {year} IPL King. Built with ❤️ using{" "}
              <a
                href={caffeineUrl}
                className="text-gold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-green-deep text-text-primary">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <ActiveContestsSection />
        <BuildYourTeamSection />
        <HowItWorksSection />
        <LiveLeaderboard />
      </main>
      <Footer />
    </div>
  );
}
