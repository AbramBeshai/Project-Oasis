import { Equipment, ExperienceLevel, FitnessGoal, WorkoutLength } from '../types/fitness';

// These arrays hold the choices shown in the Fitness Profile section.
// Keeping them in one data file makes the options easy to change later.
export const GOAL_OPTIONS: FitnessGoal[] = [
  'Strength',
  'Endurance',
  'Weight Loss',
  'General Fitness',
];

export const EXPERIENCE_OPTIONS: ExperienceLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const WORKOUT_LENGTH_OPTIONS: WorkoutLength[] = [
  '10 minutes',
  '20 minutes',
  '30 minutes',
];

export const EQUIPMENT_OPTIONS: Equipment[] = ['None', 'Dumbbells', 'Gym'];

// These are quick buttons that add common limitations into the text box.
export const LIMITATION_PRESETS = [
  'Knee pain',
  'Back pain',
  'Shoulder injury',
  'Low stamina',
];
