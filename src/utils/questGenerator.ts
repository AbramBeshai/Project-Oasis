import { EXERCISE_LIBRARY } from '../data/exercises';
import { Exercise, ExerciseCategory } from '../types/exercise';
import { Equipment, FitnessGoal, FitnessProfile, WorkoutLength } from '../types/fitness';
import { Quest } from '../types/quest';

// This decides how many quests the user gets based on how long they want to train.
// Short workouts get fewer quests, longer workouts get more.
const QUEST_COUNT_BY_WORKOUT_LENGTH: Record<WorkoutLength, number> = {
  '10 minutes': 3,
  '20 minutes': 4,
  '30 minutes': 5,
};

// This maps fitness goals to the stats that should be rewarded most often.
const PRIORITY_STATS_BY_GOAL: Record<FitnessGoal, ExerciseCategory[]> = {
  Strength: ['Strength', 'Discipline', 'Endurance', 'Agility'],
  Endurance: ['Endurance', 'Discipline', 'Agility', 'Strength'],
  'Weight Loss': ['Endurance', 'Agility', 'Discipline', 'Strength'],
  'General Fitness': ['Strength', 'Endurance', 'Agility', 'Discipline'],
};

// This decides which equipment levels are allowed.
// A gym user can do gym, dumbbell, and bodyweight work. A no-equipment user only gets no-equipment quests.
const AVAILABLE_EQUIPMENT: Record<Equipment, Equipment[]> = {
  None: ['None'],
  Dumbbells: ['None', 'Dumbbells'],
  Gym: ['None', 'Dumbbells', 'Gym'],
};

// Generates 3-5 daily quests from the exercise library using the user's onboarding profile.
export function generateDailyQuests(profile: FitnessProfile): Quest[] {
  const questCount = QUEST_COUNT_BY_WORKOUT_LENGTH[profile.workoutLength];
  const allowedEquipment = AVAILABLE_EQUIPMENT[profile.equipment];
  const priorityStats = PRIORITY_STATS_BY_GOAL[profile.goal];

  const matchingExercises = EXERCISE_LIBRARY.filter((exercise) =>
    allowedEquipment.includes(exercise.equipmentRequired)
  );

  const sortedExercises = [...matchingExercises].sort((first, second) => {
    const firstScore = getExerciseScore(first, profile, priorityStats);
    const secondScore = getExerciseScore(second, profile, priorityStats);

    return secondScore - firstScore;
  });

  return sortedExercises.slice(0, questCount).map((exercise, index) => ({
    id: exercise.id,
    title: exercise.variants[profile.experienceLevel],
    stat: exercise.category,
    xp: exercise.xp,
    completed: false,
  }));
}

// Scores each exercise so the generator can pick better quests first.
// Higher score means the exercise matches the user's profile more closely.
function getExerciseScore(
  exercise: Exercise,
  profile: FitnessProfile,
  priorityStats: ExerciseCategory[]
) {
  let score = 0;

  // Reward exercises that train the user's chosen goal/stat.
  const statPriorityIndex = priorityStats.indexOf(exercise.category);
  score += (priorityStats.length - statPriorityIndex) * 10;

  // Beginners should start with beginner exercises.
  // Intermediate and advanced users can receive harder options more often.
  if (exercise.difficulty === profile.experienceLevel) {
    score += 20;
  }

  if (profile.experienceLevel === 'Beginner' && exercise.difficulty === 'Advanced') {
    score -= 30;
  }

  if (profile.experienceLevel === 'Intermediate' && exercise.difficulty === 'Beginner') {
    score += 5;
  }

  if (profile.experienceLevel === 'Advanced' && exercise.difficulty === 'Beginner') {
    score -= 5;
  }

  // Prefer exercises that directly match the user's available equipment.
  if (exercise.equipmentRequired === profile.equipment) {
    score += 8;
  }

  // Keep no-equipment exercises useful even for users with equipment.
  if (exercise.equipmentRequired === 'None') {
    score += 4;
  }

  return score;
}
