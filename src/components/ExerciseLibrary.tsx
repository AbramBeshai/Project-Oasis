import { StyleSheet, Text, View } from 'react-native';
import { EXERCISE_LIBRARY } from '../data/exercises';
import { FitnessProfile } from '../types/fitness';

// This component shows the exercise library on the dashboard.
// It highlights the version of each exercise that matches the user's experience level.
type ExerciseLibraryProps = {
  profile: FitnessProfile;
};

export function ExerciseLibrary({ profile }: ExerciseLibraryProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Exercise Library</Text>

      {EXERCISE_LIBRARY.map((exercise) => (
        <View key={exercise.id} style={styles.exerciseCard}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.xpBadge}>+{exercise.xp} XP</Text>
          </View>

          <Text style={styles.metaText}>
            {exercise.category} | {exercise.difficulty} |{' '}
            {exercise.equipmentRequired}
          </Text>

          <Text style={styles.variantLabel}>
            Your variant: {exercise.variants[profile.experienceLevel]}
          </Text>
        </View>
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
  exerciseCard: {
    backgroundColor: '#0b1526',
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },
  exerciseHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  exerciseName: {
    color: '#ffffff',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  xpBadge: {
    color: '#7dd3fc',
    fontSize: 13,
    fontWeight: '800',
  },
  metaText: {
    color: '#94a3b8',
    marginTop: 6,
  },
  variantLabel: {
    color: '#cbd5e1',
    fontWeight: '700',
    marginTop: 8,
  },
});
