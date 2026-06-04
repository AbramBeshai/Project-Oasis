// This type describes one daily quest in Project Oasis.
// Every quest needs an id, a title, an XP reward, and a completed state.
export type Quest = {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
};
