// This number controls how much XP the player needs before leveling up.
export const XP_PER_LEVEL = 100;

// This helper receives the current XP and the XP gained from a quest.
// It returns the new XP amount and whether the player should level up.
export function calculateLevelProgress(currentXp: number, gainedXp: number) {
  const totalXp = currentXp + gainedXp;

  return {
    shouldLevelUp: totalXp >= XP_PER_LEVEL,
    remainingXp: totalXp >= XP_PER_LEVEL ? totalXp - XP_PER_LEVEL : totalXp,
  };
}
