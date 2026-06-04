import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  LIMITATION_PRESETS,
  WORKOUT_LENGTH_OPTIONS,
} from '../data/profileOptions';
import { FitnessProfile } from '../types/fitness';

// These props are the information this component needs from App.tsx.
// profile is the current form data, and the two functions update that data.
type FitnessProfileFormProps = {
  profile: FitnessProfile;
  onUpdateProfile: (field: keyof FitnessProfile, value: string) => void;
  onAddLimitationPreset: (preset: string) => void;
};

export function FitnessProfileForm({
  profile,
  onUpdateProfile,
  onAddLimitationPreset,
}: FitnessProfileFormProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Fitness Profile</Text>

      <Text style={styles.fieldLabel}>Goal</Text>
      <View style={styles.optionGrid}>
        {GOAL_OPTIONS.map((goal) => (
          <OptionButton
            key={goal}
            label={goal}
            selected={profile.goal === goal}
            onPress={() => onUpdateProfile('goal', goal)}
          />
        ))}
      </View>

      <Text style={styles.fieldLabel}>Experience Level</Text>
      <View style={styles.optionGrid}>
        {EXPERIENCE_OPTIONS.map((experienceLevel) => (
          <OptionButton
            key={experienceLevel}
            label={experienceLevel}
            selected={profile.experienceLevel === experienceLevel}
            onPress={() => onUpdateProfile('experienceLevel', experienceLevel)}
          />
        ))}
      </View>

      <Text style={styles.fieldLabel}>Workout Length</Text>
      <View style={styles.optionGrid}>
        {WORKOUT_LENGTH_OPTIONS.map((workoutLength) => (
          <OptionButton
            key={workoutLength}
            label={workoutLength}
            selected={profile.workoutLength === workoutLength}
            onPress={() => onUpdateProfile('workoutLength', workoutLength)}
          />
        ))}
      </View>

      <Text style={styles.fieldLabel}>Equipment</Text>
      <View style={styles.optionGrid}>
        {EQUIPMENT_OPTIONS.map((equipment) => (
          <OptionButton
            key={equipment}
            label={equipment}
            selected={profile.equipment === equipment}
            onPress={() => onUpdateProfile('equipment', equipment)}
          />
        ))}
      </View>

      <Text style={styles.fieldLabel}>Limitations or Injuries</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Optional: knee pain, back pain, etc."
        placeholderTextColor="#64748b"
        value={profile.limitations}
        onChangeText={(text) => onUpdateProfile('limitations', text)}
      />

      <View style={styles.presetRow}>
        {LIMITATION_PRESETS.map((preset) => (
          <Pressable
            key={preset}
            style={styles.presetButton}
            onPress={() => onAddLimitationPreset(preset)}
          >
            <Text style={styles.presetText}>{preset}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// This smaller component prevents repeating the same button code for every option group.
type OptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function OptionButton({ label, selected, onPress }: OptionButtonProps) {
  return (
    <Pressable
      style={[styles.optionButton, selected && styles.optionButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {label}
      </Text>
    </Pressable>
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
  fieldLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  optionButton: {
    backgroundColor: '#0b1526',
    borderColor: '#24364f',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#38bdf8',
    borderColor: '#7dd3fc',
  },
  optionText: {
    color: '#cbd5e1',
    fontWeight: '700',
  },
  optionTextSelected: {
    color: '#08111f',
  },
  textInput: {
    backgroundColor: '#0b1526',
    borderColor: '#24364f',
    borderWidth: 1,
    borderRadius: 8,
    color: '#ffffff',
    padding: 12,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  presetButton: {
    backgroundColor: '#172554',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  presetText: {
    color: '#bfdbfe',
    fontSize: 12,
    fontWeight: '700',
  },
});
