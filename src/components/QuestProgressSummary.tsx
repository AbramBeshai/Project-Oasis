import { StyleSheet, Text, View } from 'react-native';
import { Quest } from '../types/quest';

// This component summarizes how far the player is through today's generated quests.
// It gives the dashboard a quick "what do I need to finish today?" readout.
type QuestProgressSummaryProps = {
  quests: Quest[];
};

export function QuestProgressSummary({ quests }: QuestProgressSummaryProps) {
  const completedCount = quests.filter((quest) => quest.completed).length;
  const totalCount = quests.length;
  const totalXp = quests.reduce((sum, quest) => sum + quest.xp, 0);
  const earnedXp = quests
    .filter((quest) => quest.completed)
    .reduce((sum, quest) => sum + quest.xp, 0);
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={styles.panel}>
      <View style={styles.headingRow}>
        <Text style={styles.sectionTitle}>Today's Quest Progress</Text>
        <Text style={styles.counterText}>
          {completedCount}/{totalCount}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Completed</Text>
          <Text style={styles.summaryValue}>{completedCount}</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={styles.summaryValue}>{totalCount - completedCount}</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>XP Earned</Text>
          <Text style={styles.summaryValue}>
            {earnedXp}/{totalXp}
          </Text>
        </View>
      </View>
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
  headingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  counterText: {
    color: '#7dd3fc',
    fontSize: 18,
    fontWeight: '900',
  },
  progressTrack: {
    backgroundColor: '#1f2937',
    borderRadius: 999,
    height: 12,
    marginTop: 14,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#22c55e',
    height: '100%',
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  summaryBox: {
    backgroundColor: '#0b1526',
    borderRadius: 8,
    flex: 1,
    padding: 10,
  },
  summaryLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
});
