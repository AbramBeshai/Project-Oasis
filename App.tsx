import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DailyQuests } from './src/components/DailyQuests';
import { FitnessProfileForm } from './src/components/FitnessProfileForm';
import { ResetButton } from './src/components/ResetButton';
import { StatsPanel } from './src/components/StatsPanel';
import { XpProgress } from './src/components/XpProgress';
import { STARTING_QUESTS } from './src/data/quests';
import { FitnessProfile } from './src/types/fitness';
import { calculateLevelProgress } from './src/utils/leveling';

// This is the main app screen.
// App.tsx now focuses on state and app logic, while the visual sections live in components.
export default function App() {
  // Stores the player's current level.
  const [level, setLevel] = useState(1);

  // Stores the player's current XP progress toward the next level.
  const [xp, setXp] = useState(0);

  // Stores all daily quests and whether each one has been completed.
  const [quests, setQuests] = useState(STARTING_QUESTS);

  // Stores the user's fitness profile choices.
  // Later, this profile can control which quests the app generates.
  const [fitnessProfile, setFitnessProfile] = useState<FitnessProfile>({
    goal: 'Strength',
    experienceLevel: 'Beginner',
    workoutLength: '20 minutes',
    equipment: 'None',
    limitations: '',
  });

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

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>PROJECT OASIS</Text>
          <Text style={styles.subtitle}>Level {level} Hunter</Text>
        </View>

        <FitnessProfileForm
          profile={fitnessProfile}
          onUpdateProfile={updateFitnessProfile}
          onAddLimitationPreset={addLimitationPreset}
        />

        <XpProgress xp={xp} />
        <StatsPanel level={level} />
        <DailyQuests quests={quests} onCompleteQuest={completeQuest} />
        <ResetButton onPress={resetProgress} />
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
});
