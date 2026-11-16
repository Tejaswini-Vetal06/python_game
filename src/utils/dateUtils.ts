import { WeeklyActivityDay } from '../types/gamification';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateNewStreak(
  currentStreak: number,
  longestStreak: number,
  lastActiveDate: string | null
): { newCurrentStreak: number; newLongestStreak: number } {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  if (!lastActiveDate) {
    return { newCurrentStreak: 1, newLongestStreak: Math.max(longestStreak, 1) };
  }

  if (lastActiveDate === today) {
    // Already active today, streak remains unchanged
    return { newCurrentStreak: currentStreak, newLongestStreak: longestStreak };
  }

  if (lastActiveDate === yesterday) {
    // Active yesterday, increment streak
    const nextStreak = currentStreak + 1;
    return {
      newCurrentStreak: nextStreak,
      newLongestStreak: Math.max(longestStreak, nextStreak),
    };
  }

  // Streak broken (more than 1 day missed)
  return { newCurrentStreak: 1, newLongestStreak: longestStreak };
}

export function getWeeklyActivity(historyDates: string[]): WeeklyActivityDay[] {
  const days: WeeklyActivityDay[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayStr = getTodayDateString();

  const countMap: Record<string, number> = {};
  for (const date of historyDates) {
    countMap[date] = (countMap[date] || 0) + 1;
  }

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const dayName = dayNames[d.getDay()];

    days.push({
      dayName,
      dateStr,
      count: countMap[dateStr] || 0,
      isToday: dateStr === todayStr,
    });
  }

  return days;
}
