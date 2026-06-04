import { StyleSheet, Text, View } from 'react-native';
import { XP_PER_LEVEL } from '../utils/leveling';

// This component displays the player's XP bar and XP text.
type XpProgressProps = {
  xp: number;
};

export function XpProgress({ xp }: XpProgressProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>XP Progress</Text>

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
});
