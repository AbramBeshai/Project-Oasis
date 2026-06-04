import { ExerciseCategory } from './exercise';

// This type describes one daily quest in Project Oasis.
// Every quest needs an id, a title, an XP reward, the stat it trains, and a completed state.
export type Quest = {
  id: number;
  title: string;
  stat: ExerciseCategory;
  xp: number;
  completed: boolean;
};
