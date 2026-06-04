import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Quest } from '../types/quest';

// This component receives the quest list and renders each quest button.
// It does not decide how XP works; it just calls onCompleteQuest when tapped.
type DailyQuestsProps = {
  quests: Quest[];
  onCompleteQuest: (questId: number) => void;
};

export function DailyQuests({ quests, onCompleteQuest }: DailyQuestsProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Daily Quests</Text>

      {quests.map((quest) => (
        <Pressable
          key={quest.id}
          style={[
            styles.questButton,
            quest.completed && styles.questButtonCompleted,
          ]}
          onPress={() => onCompleteQuest(quest.id)}
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
  );
}

const styles = StyleSheet.create({
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
});
