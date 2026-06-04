import { Quest } from './quest';
import { PlayerStats } from './stats';

// This type describes everything that should survive after the app reloads.
// If it changes while using the dashboard, it belongs in saved progress.
export type PlayerProgress = {
  level: number;
  xp: number;
  stats: PlayerStats;
  quests: Quest[];
  lastQuestDate: string;
};
