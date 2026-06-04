import { Equipment, ExperienceLevel } from './fitness';

// These are the RPG-style stats an exercise can train.
// The app can use this later to increase the right stat when a quest is completed.
export type ExerciseCategory = 'Strength' | 'Endurance' | 'Agility' | 'Discipline';

// This type describes easier or harder versions of the same exercise.
// Example: a push-up can become wall push-ups for beginners or decline push-ups for advanced users.
export type ExerciseVariants = Record<ExperienceLevel, string>;

// This type describes one exercise in the Project Oasis exercise library.
export type Exercise = {
  id: number;
  name: string;
  category: ExerciseCategory;
  difficulty: ExperienceLevel;
  equipmentRequired: Equipment;
  variants: ExerciseVariants;
  xp: number;
};
