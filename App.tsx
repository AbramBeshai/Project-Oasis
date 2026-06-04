import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DailyQuests } from './src/components/DailyQuests';
import { OnboardingScreen } from './src/components/OnboardingScreen';
import { ResetButton } from './src/components/ResetButton';
import { StatsPanel } from './src/components/StatsPanel';
import { XpProgress } from './src/components/XpProgress';
import { STARTING_QUESTS } from './src/data/quests';
import { FitnessProfile } from './src/types/fitness';
import { calculateLevelProgress } from './src/utils/leveling';
import {
  clearFitnessProfile,
  loadFitnessProfile,
  saveFitnessProfile,
} from './src/utils/profileStorage';

// These values become the default answers shown on the onboarding screen.
const DEFAULT_FITNESS_PROFILE: FitnessProfile = {
  goal: 'Strength',
  experienceLevel: 'Beginner',
  workoutLength: '20 minutes',
  equipment: 'None',
  limitations: '',
};

// This is the main app screen.
// App.tsx controls the app flow: load saved profile, show onboarding, then show quests.
export default function App() {
  // Stores whether the app is still checking the phone for a saved profile.
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Stores whether onboarding has been completed.
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Stores the player's current level.
  const [level, setLevel] = useState(1);

  // Stores the player's current XP progress toward the next level.
  const [xp, setXp] = useState(0);

  // Stores all daily quests and whether each one has been completed.
  const [quests, setQuests] = useState(STARTING_QUESTS);

  // Stores the user's fitness profile choices.
  // This starts with defaults, then gets replaced by saved data if one exists.
  const [fitnessProfile, setFitnessProfile] = useState<FitnessProfile>(
    DEFAULT_FITNESS_PROFILE
  );

  // Runs once when the app opens.
  // It checks the phone storage to see if onboarding was already completed.
  useEffect(() => {
    async function prepareApp() {
      const savedProfile = await loadFitnessProfile();

      if (savedProfile) {
        setFitnessProfile(savedProfile);
        setHasCompletedOnboarding(true);
      }

      setIsLoadingProfile(false);
    }

    prepareApp();
  }, []);

  // Updates one field inside the fitness profile without deleting the other fields.
  function updateFitnessProfile(field: keyof FitnessProfile, value: string) {
    setFitnessProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  // Adds a preset injury/limitation into the text box.
  // If the text box already has something, it adds the new preset after a comma.
  function addLimitationPreset(preset: string) {
    setFitnessProfile((currentProfile) => ({
      ...currentProfile,
      limitations: currentProfile.limitations
        ? `${currentProfile.limitations}, ${preset}`
        : preset,
    }));
  }

  // Saves the fitness profile and moves the user from onboarding to daily quests.
  async function completeOnboarding() {
    await saveFitnessProfile(fitnessProfile);
    setHasCompletedOnboarding(true);
  }

  // This function runs when the user taps a quest button.
  function completeQuest(questId: number) {
    const quest = quests.find((item) => item.id === questId);

    // If the quest does not exist or was already completed, stop here.
    if (!quest || quest.completed) {
      return;
    }

    const levelProgress = calculateLevelProgress(xp, quest.xp);

    // Mark the tapped quest as completed.
    setQuests((currentQuests) =>
      currentQuests.map((item) =>
        item.id === questId ? { ...item, completed: true } : item
      )
    );

    // If XP reaches 100 or more, level up and carry extra XP forward.
    if (levelProgress.shouldLevelUp) {
      setLevel((currentLevel) => currentLevel + 1);
      Alert.alert('Level Up!', 'You became stronger. Keep going.');
    }

    setXp(levelProgress.remainingXp);
  }

  // This resets the quests and XP for testing while you build the app.
  function resetProgress() {
    setLevel(1);
    setXp(0);
    setQuests(STARTING_QUESTS);
  }

  // This clears the saved profile so you can test the onboarding screen again.
  async function resetOnboarding() {
    await clearFitnessProfile();
    resetProgress();
    setFitnessProfile(DEFAULT_FITNESS_PROFILE);
    setHasCompletedOnboarding(false);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content}>
        {isLoadingProfile ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#38bdf8" />
            <Text style={styles.loadingText}>Loading Project Oasis...</Text>
          </View>
        ) : !hasCompletedOnboarding ? (
          <OnboardingScreen
            profile={fitnessProfile}
            onUpdateProfile={updateFitnessProfile}
            onAddLimitationPreset={addLimitationPreset}
            onCompleteOnboarding={completeOnboarding}
          />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.appName}>PROJECT OASIS</Text>
              <Text style={styles.subtitle}>Level {level} Hunter</Text>
              <Text style={styles.profileSummary}>
                {fitnessProfile.goal} | {fitnessProfile.experienceLevel} |{' '}
                {fitnessProfile.workoutLength}
              </Text>
            </View>

            <XpProgress xp={xp} />
            <StatsPanel level={level} />
            <DailyQuests quests={quests} onCompleteQuest={completeQuest} />
            <ResetButton onPress={resetProgress} />
            <ResetButton label="Edit Fitness Profile" onPress={resetOnboarding} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#08111f',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  loadingContainer: {
    minHeight: 500,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#cbd5e1',
    fontWeight: '700',
  },
  header: {
    marginTop: 20,
    marginBottom: 8,
  },
  appName: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#7dd3fc',
    fontSize: 18,
    marginTop: 4,
  },
  profileSummary: {
    color: '#cbd5e1',
    marginTop: 6,
  },
});
