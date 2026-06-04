import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExerciseCategory } from '../types/exercise';
import { Quest } from '../types/quest';

// This object gives every stat its own color and short icon label.
// Later, these labels can become real icons from an icon library.
const STAT_STYLES: Record<ExerciseCategory, { icon: string; color: string }> = {
  Strength: { icon: 'STR', color: '#ef4444' },
  Endurance: { icon: 'END', color: '#22c55e' },
  Agility: { icon: 'AGI', color: '#f59e0b' },
  Discipline: { icon: 'DSC', color: '#8b5cf6' },
};

// This component receives the quest list and renders each quest as a mission card.
// It does not decide how XP works; it just calls onCompleteQuest when tapped.
type DailyQuestsProps = {
  quests: Quest[];
  onCompleteQuest: (questId: number) => void;
};

export function DailyQuests({ quests, onCompleteQuest }: DailyQuestsProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Daily Missions</Text>

      {quests.map((quest, index) => {
        const statStyle = STAT_STYLES[quest.stat];

        return (
          <Pressable
            key={quest.id}
            style={[
              styles.questCard,
              { borderLeftColor: statStyle.color },
              quest.completed && styles.questCardCompleted,
            ]}
            onPress={() => onCompleteQuest(quest.id)}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.statBadge, { backgroundColor: statStyle.color }]}>
                <Text style={styles.statBadgeText}>{statStyle.icon}</Text>
              </View>

              <View style={styles.questTitleBlock}>
                <Text style={styles.missionLabel}>Mission {index + 1}</Text>
                <Text style={styles.questTitle}>{quest.title}</Text>
              </View>

              <View
                style={[
                  styles.completionBadge,
                  quest.completed && styles.completionBadgeDone,
                ]}
              >
                <Text
                  style={[
                    styles.completionText,
                    quest.completed && styles.completionTextDone,
                  ]}
                >
                  {quest.completed ? 'CLEARED' : 'ACTIVE'}
                </Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaPill}>
                <Text style={styles.metaLabel}>STAT</Text>
                <Text style={styles.metaValue}>{quest.stat}</Text>
              </View>

              <View style={styles.metaPill}>
                <Text style={styles.metaLabel}>DIFFICULTY</Text>
                <Text style={styles.metaValue}>{quest.difficulty}</Text>
              </View>

              <View style={styles.metaPill}>
                <Text style={styles.metaLabel}>EQUIPMENT</Text>
                <Text style={styles.metaValue}>{quest.equipmentRequired}</Text>
              </View>
            </View>

            <View style={styles.rewardRow}>
              <Text style={styles.rewardText}>Reward: +{quest.xp} XP</Text>
              <Text style={styles.actionText}>
                {quest.completed ? 'Reward Claimed' : 'Complete Mission'}
              </Text>
            </View>
          </Pressable>
        );
      })}
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
    fontWeight: '800',
    marginBottom: 12,
  },
  questCard: {
    backgroundColor: '#0b1526',
    borderColor: '#1e3148',
    borderLeftWidth: 5,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  questCardCompleted: {
    backgroundColor: '#10261d',
    borderColor: '#1f5139',
  },
  cardTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  statBadge: {
    alignItems: 'center',
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  statBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  questTitleBlock: {
    flex: 1,
  },
  missionLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
  questTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 2,
  },
  completionBadge: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  completionBadgeDone: {
    backgroundColor: '#22c55e',
  },
  completionText: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '900',
  },
  completionTextDone: {
    color: '#052e16',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  metaPill: {
    backgroundColor: '#101c2f',
    borderRadius: 8,
    flex: 1,
    padding: 9,
  },
  metaLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '900',
  },
  metaValue: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  rewardRow: {
    alignItems: 'center',
    borderTopColor: '#1e3148',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
  },
  rewardText: {
    color: '#7dd3fc',
    flex: 1,
    fontWeight: '900',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
});
