import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerProgress } from '../types/progress';

// This key is where the player's level, XP, stats, and daily quests are saved.
const PLAYER_PROGRESS_STORAGE_KEY = 'project-oasis-player-progress';

// Saves the player's dashboard progress on the device.
// AsyncStorage can only store strings, so the progress object is converted to JSON.
export async function savePlayerProgress(progress: PlayerProgress) {
  await AsyncStorage.setItem(
    PLAYER_PROGRESS_STORAGE_KEY,
    JSON.stringify(progress)
  );
}

// Loads the player's saved dashboard progress.
// If the user has no saved progress yet, this returns null.
export async function loadPlayerProgress() {
  const savedProgress = await AsyncStorage.getItem(PLAYER_PROGRESS_STORAGE_KEY);

  if (!savedProgress) {
    return null;
  }

  return JSON.parse(savedProgress) as PlayerProgress;
}

// Clears saved dashboard progress.
// This lets Reset Progress actually reset what will be loaded next time.
export async function clearPlayerProgress() {
  await AsyncStorage.removeItem(PLAYER_PROGRESS_STORAGE_KEY);
}
