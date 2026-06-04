import { StyleSheet, Text, View } from 'react-native';
import { XP_PER_LEVEL } from '../utils/leveling';

// This component displays the player's XP bar and XP text.
type XpProgressProps = {
  xp: number;
};

export function XpProgress({ xp }: XpProgressProps) {
  const xpRemaining = XP_PER_LEVEL - xp;

  return (
    <View style={styles.panel}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.sectionTitle}>XP Progress</Text>
          <Text style={styles.subtitle}>Next level in {xpRemaining} XP</Text>
        </View>

        <Text style={styles.xpBadge}>{xp}%</Text>
      </View>

      <View style={styles.xpBarBackground}>
        <View style={[styles.xpBarFill, { width: `${xp}%` }]} />
      </View>

      <Text style={styles.xpText}>
        {xp} / {XP_PER_LEVEL} XP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#0f2438',
    borderColor: '#1f6f9b',
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
  },
  headingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  subtitle: {
    color: '#93c5fd',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  xpBadge: {
    color: '#7dd3fc',
    fontSize: 28,
    fontWeight: '900',
  },
  xpBarBackground: {
    height: 22,
    backgroundColor: '#1f2937',
    borderRadius: 999,
    marginTop: 16,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
  },
  xpText: {
    color: '#cbd5e1',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 10,
  },
});
