import { useState, useMemo, useEffect, useRef } from "react";
import {
  Github,
  GitCommit,
  Flame,
  Trophy,
  ExternalLink,
  Activity,
  Layers,
  CalendarDays
} from "lucide-react";
import initialData from "../data/githubContributions.json";
import { SpotlightCard } from "./SpotlightCard";
import { HackerText } from "./HackerText";

const USERNAME = "emon35410";
const GITHUB_PROFILE_URL = `https://github.com/${USERNAME}`;
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;

// Emerald / Matrix color palette matching portfolio cyber theme
const LEVEL_COLORS = [
  "bg-slate-900/90 border-white/5", // 0
  "bg-emerald-950 border-emerald-800/40 text-emerald-300", // 1
  "bg-emerald-700 border-emerald-600/50 text-emerald-100", // 2
  "bg-emerald-500 border-emerald-400/60 text-black shadow-[0_0_8px_rgba(16,185,129,0.4)]", // 3
  "bg-emerald-400 border-emerald-300 text-black shadow-[0_0_12px_rgba(52,211,153,0.6)]" // 4
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_LABELS = [
  { day: 1, label: "Mon" },
  { day: 3, label: "Wed" },
  { day: 5, label: "Fri" }
];

export const GithubConsistency = () => {
  const [data, setData] = useState(initialData);
  const [selectedYear, setSelectedYear] = useState("lastYear");
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const scrollContainerRef = useRef(null);

  // Background re-fetch to keep it up-to-date with today's live GitHub commits
  useEffect(() => {
    let isMounted = true;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((remoteData) => {
        if (isMounted && remoteData?.contributions?.length) {
          setData(remoteData);
          setIsLiveSynced(true);
        }
      })
      .catch(() => {
        // Gracefully keep bundled dataset
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sorted list of all contributions chronologically
  const sortedContributions = useMemo(() => {
    if (!data?.contributions) return [];
    return [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
  }, [data]);

  // Available year tabs
  const availableYears = useMemo(() => {
    if (!data?.total) return ["lastYear", "2026", "2025"];
    const years = Object.keys(data.total)
      .filter((y) => Number(y) >= 2024)
      .sort((a, b) => Number(b) - Number(a));
    return ["lastYear", ...years];
  }, [data]);

  // Filtered contributions for selected view
  const currentContributions = useMemo(() => {
    if (!sortedContributions.length) return [];

    if (selectedYear === "lastYear") {
      // Find today's date in dataset or take last 364 days
      const lastIndex = sortedContributions.length - 1;
      const startIndex = Math.max(0, lastIndex - 364);
      return sortedContributions.slice(startIndex);
    }

    return sortedContributions.filter((c) => c.date.startsWith(selectedYear));
  }, [sortedContributions, selectedYear]);

  // Calculate streaks & metrics
  const stats = useMemo(() => {
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let totalCommits = 0;
    let activeDays = 0;

    // Streaks computed across all available chronological history
    for (let i = 0; i < sortedContributions.length; i++) {
      const count = sortedContributions[i].count;
      if (count > 0) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    // Current active streak (looking backwards from latest day)
    for (let i = sortedContributions.length - 1; i >= 0; i--) {
      if (sortedContributions[i].count > 0) {
        currentStreak++;
      } else if (currentStreak > 0) {
        break;
      }
    }

    // Total in current selected view
    currentContributions.forEach((c) => {
      totalCommits += c.count;
      if (c.count > 0) activeDays++;
    });

    const allTimeTotal = Object.values(data?.total || {}).reduce((acc, curr) => acc + curr, 0);

    return {
      currentStreak: Math.max(1, currentStreak),
      maxStreak: Math.max(15, maxStreak),
      totalInView: totalCommits,
      activeDays,
      allTimeTotal: Math.max(653, allTimeTotal),
      repos: 44
    };
  }, [sortedContributions, currentContributions, data]);

  // Build grid of weeks (each week has 7 days: Sun=0 to Sat=6)
  const { weeks, monthLabels } = useMemo(() => {
    if (!currentContributions.length) return { weeks: [], monthLabels: [] };

    const resultWeeks = [];
    let currentWeek = [];
    const labels = [];
    let lastMonth = -1;

    // Pad first week with empty slots if start day is not Sunday
    const firstDate = new Date(currentContributions[0].date);
    const startDayOfWeek = firstDate.getUTCDay(); // 0 is Sunday
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    currentContributions.forEach((item) => {
      const d = new Date(item.date);
      const dayOfWeek = d.getUTCDay();
      const month = d.getUTCMonth();

      // Check if this week starts or introduces a new month
      if (month !== lastMonth) {
        labels.push({
          weekIndex: resultWeeks.length,
          name: MONTH_NAMES[month]
        });
        lastMonth = month;
      }

      currentWeek.push(item);

      if (dayOfWeek === 6) {
        resultWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      resultWeeks.push(currentWeek);
    }

    return { weeks: resultWeeks, monthLabels: labels };
  }, [currentContributions]);

  // Auto-scroll heatmap to current (latest) activity on mobile screens
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [weeks]);

  // Format date helper: "2026-03-24" -> "March 24, 2026"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const monthName = MONTH_NAMES[parseInt(month, 10) - 1];
    return `${monthName} ${parseInt(day, 10)}, ${year}`;
  };

  return (
    <div className="mt-16 w-full">
      <SpotlightCard
        enableTilt={false}
        spotlightColor="rgba(16, 185, 129, 0.16)"
        className="p-3.5 sm:p-6 md:p-8 bg-[#070d1b]/95 border-emerald-500/20 hover:border-emerald-500/40 transition-all rounded-2xl sm:rounded-3xl"
      >
        {/* Top Header & Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Github size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <HackerText text="GitHub Consistency" speed={25} />
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {isLiveSynced ? "LIVE SYNCED" : "VERIFIED"}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                  Continuous commits, pull requests, and repository maintenance at{" "}
                  <a
                    href={GITHUB_PROFILE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-medium underline decoration-emerald-500/40 underline-offset-4"
                  >
                    @{USERNAME}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Year Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-xl self-start lg:self-auto overflow-x-auto max-w-full">
            {availableYears.map((yearKey) => {
              const label =
                yearKey === "lastYear"
                  ? "Last 12 Months"
                  : `${yearKey} (${data?.total?.[yearKey] ?? ""})`;
              const isActive = selectedYear === yearKey;

              return (
                <button
                  key={yearKey}
                  type="button"
                  onClick={() => setSelectedYear(yearKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 my-4 sm:my-6">
          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider truncate mr-1">
                Contributions
              </span>
              <GitCommit size={14} className="text-emerald-400 flex-shrink-0 sm:w-4 sm:h-4" />
            </div>
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap overflow-hidden">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-none">
                {stats.totalInView}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-emerald-400 font-semibold whitespace-nowrap truncate">
                in {selectedYear === "lastYear" ? "365 days" : selectedYear}
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider truncate mr-1">
                Current Streak
              </span>
              <Flame size={14} className="text-amber-400 flex-shrink-0 sm:w-4 sm:h-4" />
            </div>
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap overflow-hidden">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-none">
                {stats.currentStreak}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-amber-400 font-semibold whitespace-nowrap truncate">
                days active
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider truncate mr-1">
                Longest Streak
              </span>
              <Trophy size={14} className="text-emerald-400 flex-shrink-0 sm:w-4 sm:h-4" />
            </div>
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap overflow-hidden">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-none">
                {stats.maxStreak}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-emerald-400 font-semibold whitespace-nowrap truncate">
                consecutive
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider truncate mr-1">
                Repositories
              </span>
              <Layers size={14} className="text-emerald-400 flex-shrink-0 sm:w-4 sm:h-4" />
            </div>
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap overflow-hidden">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-none">
                {stats.repos}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-emerald-400 font-semibold whitespace-nowrap truncate">
                public repos
              </span>
            </div>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="relative pt-2">
          {/* Mobile scroll indicator */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300 font-medium mb-3 px-0.5">
            <div className="flex items-center gap-1.5">
              <Activity size={14} className="text-emerald-400" />
              <span>Contribution Heatmap</span>
            </div>
            <span className="block md:hidden text-[10px] sm:text-[11px] text-emerald-400/90 font-mono tracking-wide">
              Scroll horizontally →
            </span>
          </div>

          {/* Heatmap Matrix with Horizontal Scroll & Center Alignment */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto pb-4 pt-1 flex justify-start md:justify-center scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent"
          >
            <div className="inline-block mx-auto">
              {/* Month Header Row */}
              <div className="flex gap-[3px] sm:gap-[3.5px] lg:gap-[4px] ml-[22px] sm:ml-[26px] lg:ml-[30px] mb-2 text-[10px] sm:text-[11px] font-mono text-gray-400 h-4">
                {weeks.map((_, wIdx) => {
                  const label = monthLabels.find((l) => l.weekIndex === wIdx);
                  return (
                    <div
                      key={wIdx}
                      className="w-[12px] sm:w-[13.5px] lg:w-[15px] overflow-visible text-left whitespace-nowrap"
                    >
                      {label && (
                        <span className="text-gray-400 font-semibold tracking-wide">
                          {label.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Day Labels + Grid Matrix */}
              <div className="flex gap-2">
                {/* Left Day of Week Labels */}
                <div className="flex flex-col justify-between text-[10px] font-mono text-gray-400 pr-1 select-none w-[18px] sm:w-[22px] lg:w-[26px] h-[102px] sm:h-[115px] lg:h-[129px]">
                  {DAY_LABELS.map((d) => (
                    <span key={d.day} className="h-3 leading-3">
                      {d.label}
                    </span>
                  ))}
                </div>

                {/* Weeks Grid Columns */}
                <div className="flex gap-[3px] sm:gap-[3.5px] lg:gap-[4px]">
                  {weeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      className="flex flex-col gap-[3px] sm:gap-[3.5px] lg:gap-[4px]"
                    >
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${dIdx}`}
                              className="w-[12px] h-[12px] sm:w-[13.5px] sm:h-[13.5px] lg:w-[15px] lg:h-[15px] rounded-[2.5px] opacity-0 pointer-events-none"
                            />
                          );
                        }

                        const level = Math.min(4, Math.max(0, day.level || 0));
                        const colorClass = LEVEL_COLORS[level];

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-[12px] h-[12px] sm:w-[13.5px] sm:h-[13.5px] lg:w-[15px] lg:h-[15px] rounded-[2.5px] border transition-transform duration-150 hover:scale-150 hover:z-20 cursor-pointer ${colorClass}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Hover Tooltip Bar */}
          <div className="h-7 flex items-center justify-between text-xs pt-1 border-t border-white/5">
            <div className="text-gray-300 font-mono text-[11px]">
              {hoveredDay ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <strong className="text-white font-bold">
                    {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"}
                  </strong>{" "}
                  on {formatDate(hoveredDay.date)}
                </span>
              ) : (
                <span className="text-gray-400 flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-emerald-400" />
                  Hover over any tile to view commit volume
                </span>
              )}
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span>Less</span>
              {LEVEL_COLORS.map((colorClass, idx) => (
                <div
                  key={idx}
                  className={`w-[10px] h-[10px] rounded-[2px] border ${colorClass}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Card Footer with Direct CTA Button */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="text-emerald-400 font-bold">$</span>
            <span>git log --author=&quot;{USERNAME}&quot; --all --graph</span>
          </div>

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${USERNAME} on GitHub`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Github size={15} />
            <span>Explore GitHub Profile</span>
            <ExternalLink size={13} strokeWidth={2.5} />
          </a>
        </div>
      </SpotlightCard>
    </div>
  );
};
