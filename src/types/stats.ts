import { ExerciseCategory } from './exercise';

// This type stores the player's current RPG stats.
// The keys match exercise categories so a completed quest can reward the correct stat.
export type PlayerStats = Record<ExerciseCategory, number>;
