import { ExerciseCategory } from './exercise';
import { Equipment, ExperienceLevel } from './fitness';

// This type describes one daily quest in Project Oasis.
// Every quest needs an id, title, stat reward, difficulty, equipment, XP, and completion state.
export type Quest = {
  id: number;
  title: string;
  stat: ExerciseCategory;
  difficulty: ExperienceLevel;
  equipmentRequired: Equipment;
  xp: number;
  completed: boolean;
};
