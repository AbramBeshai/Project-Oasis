import AsyncStorage from '@react-native-async-storage/async-storage';
import { FitnessProfile } from '../types/fitness';

// This key is the name AsyncStorage uses to find the saved profile on the phone.
const FITNESS_PROFILE_STORAGE_KEY = 'project-oasis-fitness-profile';

// Saves the user's onboarding answers on the device.
// AsyncStorage stores strings, so we convert the profile object into JSON first.
export async function saveFitnessProfile(profile: FitnessProfile) {
  await AsyncStorage.setItem(
    FITNESS_PROFILE_STORAGE_KEY,
    JSON.stringify(profile)
  );
}

// Loads the saved profile from the device.
// If the user has never completed onboarding, this returns null.
export async function loadFitnessProfile() {
  const savedProfile = await AsyncStorage.getItem(FITNESS_PROFILE_STORAGE_KEY);

  if (!savedProfile) {
    return null;
  }

  return JSON.parse(savedProfile) as FitnessProfile;
}

// Removes the saved profile.
// This is useful while testing onboarding again during development.
export async function clearFitnessProfile() {
  await AsyncStorage.removeItem(FITNESS_PROFILE_STORAGE_KEY);
}
