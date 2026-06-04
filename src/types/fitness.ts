// These types describe the allowed fitness profile choices.
// TypeScript will warn us if we accidentally use a value that does not exist here.
export type FitnessGoal = 'Strength' | 'Endurance' | 'Weight Loss' | 'General Fitness';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type WorkoutLength = '10 minutes' | '20 minutes' | '30 minutes';
export type Equipment = 'None' | 'Dumbbells' | 'Gym';

// This type describes all the information the user chooses in the Fitness Profile form.
export type FitnessProfile = {
  goal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  workoutLength: WorkoutLength;
  equipment: Equipment;
  limitations: string;
};
