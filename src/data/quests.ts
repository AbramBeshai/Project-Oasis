import { Quest } from '../types/quest';

// This is the starting list of daily quests.
// Later, we can generate these based on the user's fitness profile.
export const STARTING_QUESTS: Quest[] = [
  { id: 1, title: '20 Push-ups', xp: 25, completed: false },
  { id: 2, title: '20 Squats', xp: 25, completed: false },
  { id: 3, title: '10-minute Walk', xp: 30, completed: false },
  { id: 4, title: '30-second Plank', xp: 20, completed: false },
];
