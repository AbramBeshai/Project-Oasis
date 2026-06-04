import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// This number controls how much XP the player needs before leveling up.
const XP_PER_LEVEL = 100;

// This is the starting list of daily quests.
// Later, we can move this into a separate file or database.
const STARTING_QUESTS = [
  { id: 1, title: '20 Push-ups', xp: 25, completed: false },
  { id: 2, title: '20 Squats', xp: 25, completed: false },
  { id: 3, title: '10-minute Walk', xp: 30, completed: false },
  { id: 4, title: '30-second Plank', xp: 20, completed: false },
];

export default function App() {
  // Stores the player's current level.
  const [level, setLevel] = useState(1);

  // Stores the player's current XP progress toward the next level.
  const [xp, setXp] = useState(0);

  // Stores all daily quests and whether each one has been completed.
  const [quests, setQuests] = useState(STARTING_QUESTS);

  // This function runs when the user taps a quest button.
  function completeQuest(questId: number) {
    const quest = quests.find((item) => item.id === questId);

    // If the quest does not exist or was already completed, stop here.
    if (!quest || quest.completed) {
      return;
    }

    const newXp = xp + quest.xp;

    // Mark the tapped quest as completed.
    setQuests((currentQuests) =>
      currentQuests.map((item) =>
        item.id === questId ? { ...item, completed: true } : item
      )
    );

    // If XP reaches 100 or more, level up and carry extra XP forward.
    if (newXp >= XP_PER_LEVEL) {
      setLevel((currentLevel) => currentLevel + 1);
      setXp(newXp - XP_PER_LEVEL);
      Alert.alert('Level Up!', 'You became stronger. Keep going.');
    } else {
      setXp(newXp);
    }
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

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>XP Progress</Text>

          <View style={styles.xpBarBackground}>
            <View style={[styles.xpBarFill, { width: `${xp}%` }]} />
          </View>

          <Text style={styles.xpText}>
            {xp} / {XP_PER_LEVEL} XP
          </Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Stats</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Strength</Text>
              <Text style={styles.statValue}>{level + 2}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Endurance</Text>
              <Text style={styles.statValue}>{level + 1}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Agility</Text>
              <Text style={styles.statValue}>{level}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Discipline</Text>
              <Text style={styles.statValue}>{level + 3}</Text>
            </View>
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>

          {quests.map((quest) => (
            <Pressable
              key={quest.id}
              style={[
                styles.questButton,
                quest.completed && styles.questButtonCompleted,
              ]}
              onPress={() => completeQuest(quest.id)}
            >
              <View>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questXp}>+{quest.xp} XP</Text>
              </View>

              <Text style={styles.questStatus}>
                {quest.completed ? 'DONE' : 'START'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.resetButton} onPress={resetProgress}>
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </Pressable>
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
  panel: {
    backgroundColor: '#101c2f',
    borderColor: '#24364f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  xpBarBackground: {
    height: 14,
    backgroundColor: '#1f2937',
    borderRadius: 999,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
  },
  xpText: {
    color: '#cbd5e1',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#0b1526',
    borderRadius: 8,
    padding: 12,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 13,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  questButton: {
    backgroundColor: '#0b1526',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questButtonCompleted: {
    backgroundColor: '#123524',
    opacity: 0.85,
  },
  questTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  questXp: {
    color: '#7dd3fc',
    marginTop: 4,
  },
  questStatus: {
    color: '#ffffff',
    fontWeight: '800',
  },
  resetButton: {
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#cbd5e1',
    fontWeight: '700',
  },
});