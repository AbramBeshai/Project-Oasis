import { StyleSheet, Text, View } from 'react-native';

// This component calculates and displays the player's RPG-style stats.
// Later, we can replace these simple formulas with real stat upgrade logic.
type StatsPanelProps = {
  level: number;
};

export function StatsPanel({ level }: StatsPanelProps) {
  const stats = [
    { label: 'Strength', value: level + 2 },
    { label: 'Endurance', value: level + 1 },
    { label: 'Agility', value: level },
    { label: 'Discipline', value: level + 3 },
  ];

  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Stats</Text>

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
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
