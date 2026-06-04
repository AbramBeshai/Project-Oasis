import { StyleSheet, Text, View } from 'react-native';
import { PlayerStats } from '../types/stats';

// This component displays the player's RPG-style stats.
// App.tsx owns the stat values and updates them when quests are completed.
type StatsPanelProps = {
  stats: PlayerStats;
};

export function StatsPanel({ stats }: StatsPanelProps) {
  const statItems = [
    { label: 'Strength', value: stats.Strength },
    { label: 'Endurance', value: stats.Endurance },
    { label: 'Agility', value: stats.Agility },
    { label: 'Discipline', value: stats.Discipline },
  ];

  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Stats</Text>

      <View style={styles.statsGrid}>
        {statItems.map((stat) => (
          <View key={stat.label} style={styles.statBox}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
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
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
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
});
