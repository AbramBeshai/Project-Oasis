import { StyleSheet, Text, View } from 'react-native';
import { FitnessProfile } from '../types/fitness';

// This component is the stronger RPG-style profile header at the top of the dashboard.
// It shows the app name, player level, profile path, and a compact rank badge.
type DashboardHeaderProps = {
  level: number;
  profile: FitnessProfile;
};

export function DashboardHeader({ level, profile }: DashboardHeaderProps) {
  return (
    <View style={styles.headerCard}>
      <View style={styles.headerTopRow}>
        <View style={styles.identityBlock}>
          <Text style={styles.appName}>PROJECT OASIS</Text>
          <Text style={styles.title}>Hunter Dashboard</Text>
          <Text style={styles.profileSummary}>
            {profile.goal} | {profile.experienceLevel} | {profile.workoutLength}
          </Text>
        </View>

        <View style={styles.levelBadge}>
          <Text style={styles.levelLabel}>LEVEL</Text>
          <Text style={styles.levelValue}>{level}</Text>
        </View>
      </View>

      <View style={styles.rankRow}>
        <View style={styles.rankPill}>
          <Text style={styles.rankText}>E-RANK HUNTER</Text>
        </View>
        <Text style={styles.equipmentText}>{profile.equipment} Loadout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: '#0b1526',
    borderColor: '#1f4565',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    padding: 18,
  },
  headerTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
  },
  identityBlock: {
    flex: 1,
  },
  appName: {
    color: '#7dd3fc',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 6,
  },
  profileSummary: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  levelBadge: {
    alignItems: 'center',
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    minWidth: 74,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  levelLabel: {
    color: '#083344',
    fontSize: 11,
    fontWeight: '900',
  },
  levelValue: {
    color: '#08111f',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 2,
  },
  rankRow: {
    alignItems: 'center',
    borderTopColor: '#1e3148',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 14,
  },
  rankPill: {
    backgroundColor: '#172554',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  rankText: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '900',
  },
  equipmentText: {
    color: '#94a3b8',
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
});
