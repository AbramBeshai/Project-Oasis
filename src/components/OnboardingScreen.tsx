import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  EQUIPMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  LIMITATION_PRESETS,
  WORKOUT_LENGTH_OPTIONS,
} from '../data/profileOptions';
import { FitnessProfile } from '../types/fitness';

// These steps make onboarding feel like character creation instead of one long form.
const CREATION_STEPS = [
  'Path',
  'Rank',
  'Equipment',
  'Condition',
  'Review',
] as const;

// This screen appears when the app does not have a saved fitness profile yet.
// It walks the player through character creation one section at a time.
type OnboardingScreenProps = {
  profile: FitnessProfile;
  onUpdateProfile: (field: keyof FitnessProfile, value: string) => void;
  onAddLimitationPreset: (preset: string) => void;
  onCompleteOnboarding: () => void;
};

export function OnboardingScreen({
  profile,
  onUpdateProfile,
  onAddLimitationPreset,
  onCompleteOnboarding,
}: OnboardingScreenProps) {
  // Stores which character creation step the user is currently viewing.
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === CREATION_STEPS.length - 1;
  const currentStepName = CREATION_STEPS[currentStepIndex];

  function goToNextStep() {
    if (!isLastStep) {
      setCurrentStepIndex((stepIndex) => stepIndex + 1);
    }
  }

  function goToPreviousStep() {
    if (!isFirstStep) {
      setCurrentStepIndex((stepIndex) => stepIndex - 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.appName}>PROJECT OASIS</Text>
        <Text style={styles.title}>Character Creation</Text>
        <Text style={styles.subtitle}>
          Build your starting profile so the System can assign the right daily
          missions.
        </Text>
      </View>

      <View style={styles.stepTrack}>
        {CREATION_STEPS.map((stepName, index) => (
          <View
            key={stepName}
            style={[
              styles.stepDot,
              index <= currentStepIndex && styles.stepDotActive,
            ]}
          >
            <Text
              style={[
                styles.stepDotText,
                index <= currentStepIndex && styles.stepDotTextActive,
              ]}
            >
              {index + 1}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.stepLabel}>
          Step {currentStepIndex + 1} / {CREATION_STEPS.length}
        </Text>
        <Text style={styles.sectionTitle}>{currentStepName}</Text>

        {currentStepName === 'Path' && (
          <View style={styles.sectionContent}>
            <Text style={styles.fieldHint}>Choose your main training goal.</Text>
            <View style={styles.optionList}>
              {GOAL_OPTIONS.map((goal) => (
                <CreationOption
                  key={goal}
                  label={goal}
                  detail={getGoalDescription(goal)}
                  selected={profile.goal === goal}
                  onPress={() => onUpdateProfile('goal', goal)}
                />
              ))}
            </View>
          </View>
        )}

        {currentStepName === 'Rank' && (
          <View style={styles.sectionContent}>
            <Text style={styles.fieldHint}>
              Pick the level that matches your current training experience.
            </Text>
            <View style={styles.optionList}>
              {EXPERIENCE_OPTIONS.map((experienceLevel) => (
                <CreationOption
                  key={experienceLevel}
                  label={experienceLevel}
                  detail={getExperienceDescription(experienceLevel)}
                  selected={profile.experienceLevel === experienceLevel}
                  onPress={() =>
                    onUpdateProfile('experienceLevel', experienceLevel)
                  }
                />
              ))}
            </View>
          </View>
        )}

        {currentStepName === 'Equipment' && (
          <View style={styles.sectionContent}>
            <Text style={styles.fieldHint}>How long should each workout be?</Text>
            <View style={styles.optionList}>
              {WORKOUT_LENGTH_OPTIONS.map((workoutLength) => (
                <CreationOption
                  key={workoutLength}
                  label={workoutLength}
                  detail={getWorkoutLengthDescription(workoutLength)}
                  selected={profile.workoutLength === workoutLength}
                  onPress={() => onUpdateProfile('workoutLength', workoutLength)}
                />
              ))}
            </View>

            <Text style={styles.fieldHint}>
              What equipment do you have available?
            </Text>
            <View style={styles.optionList}>
              {EQUIPMENT_OPTIONS.map((equipment) => (
                <CreationOption
                  key={equipment}
                  label={equipment}
                  detail={getEquipmentDescription(equipment)}
                  selected={profile.equipment === equipment}
                  onPress={() => onUpdateProfile('equipment', equipment)}
                />
              ))}
            </View>
          </View>
        )}

        {currentStepName === 'Condition' && (
          <View style={styles.sectionContent}>
            <Text style={styles.fieldHint}>
              Add any limitations so quests can stay realistic.
            </Text>
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
        )}

        {currentStepName === 'Review' && (
          <View style={styles.sectionContent}>
            <Text style={styles.fieldHint}>
              Confirm your starting hunter profile.
            </Text>

            <View style={styles.reviewGrid}>
              <ReviewItem label="Path" value={profile.goal} />
              <ReviewItem label="Rank" value={profile.experienceLevel} />
              <ReviewItem label="Workout" value={profile.workoutLength} />
              <ReviewItem label="Equipment" value={profile.equipment} />
            </View>

            <View style={styles.conditionBox}>
              <Text style={styles.reviewLabel}>Condition Notes</Text>
              <Text style={styles.reviewValue}>
                {profile.limitations || 'No limitations added'}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.navigationRow}>
        <Pressable
          style={[styles.secondaryButton, isFirstStep && styles.disabledButton]}
          disabled={isFirstStep}
          onPress={goToPreviousStep}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              isFirstStep && styles.disabledButtonText,
            ]}
          >
            Back
          </Text>
        </Pressable>

        <Pressable
          style={styles.primaryButton}
          onPress={isLastStep ? onCompleteOnboarding : goToNextStep}
        >
          <Text style={styles.primaryButtonText}>
            {isLastStep ? 'Begin Daily Missions' : 'Continue'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// This option card is used for each character creation choice.
// The selected state changes the border, background, and confirmation marker.
type CreationOptionProps = {
  label: string;
  detail?: string;
  compact?: boolean;
  selected: boolean;
  onPress: () => void;
};

function CreationOption({
  label,
  detail,
  compact = false,
  selected,
  onPress,
}: CreationOptionProps) {
  return (
    <Pressable
      style={[
        styles.optionCard,
        compact && styles.optionCardCompact,
        selected && styles.optionCardSelected,
      ]}
      onPress={onPress}
    >
      <View style={styles.optionHeader}>
        <Text
          style={[styles.optionTitle, selected && styles.optionTitleSelected]}
        >
          {label}
        </Text>
        <View style={[styles.selectMarker, selected && styles.selectMarkerOn]}>
          <Text style={[styles.selectMarkerText, selected && styles.selectMarkerTextOn]}>
            {selected ? 'SET' : ''}
          </Text>
        </View>
      </View>

      {detail ? <Text style={styles.optionDetail}>{detail}</Text> : null}
    </Pressable>
  );
}

type ReviewItemProps = {
  label: string;
  value: string;
};

function ReviewItem({ label, value }: ReviewItemProps) {
  return (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewLabel}>{label}</Text>
      <Text style={styles.reviewValue}>{value}</Text>
    </View>
  );
}

function getGoalDescription(goal: FitnessProfile['goal']) {
  const descriptions: Record<FitnessProfile['goal'], string> = {
    Strength: 'Build power with strength-focused missions.',
    Endurance: 'Improve stamina through conditioning missions.',
    'Weight Loss': 'Prioritize calorie-burning and consistency.',
    'General Fitness': 'Balance strength, stamina, agility, and discipline.',
  };

  return descriptions[goal];
}

function getExperienceDescription(
  experienceLevel: FitnessProfile['experienceLevel']
) {
  const descriptions: Record<FitnessProfile['experienceLevel'], string> = {
    Beginner: 'Start easy and build momentum safely.',
    Intermediate: 'Use balanced quests with moderate challenge.',
    Advanced: 'Unlock harder variants with higher intensity.',
  };

  return descriptions[experienceLevel];
}

function getWorkoutLengthDescription(
  workoutLength: FitnessProfile['workoutLength']
) {
  const descriptions: Record<FitnessProfile['workoutLength'], string> = {
    '10 minutes': 'Quick daily missions for busy days.',
    '20 minutes': 'Balanced sessions for steady progress.',
    '30 minutes': 'Longer missions with more quest variety.',
  };

  return descriptions[workoutLength];
}

function getEquipmentDescription(equipment: FitnessProfile['equipment']) {
  const descriptions: Record<FitnessProfile['equipment'], string> = {
    None: 'Only bodyweight missions. No equipment needed.',
    Dumbbells: 'Bodyweight and dumbbell missions.',
    Gym: 'Bodyweight, dumbbell, and gym-based missions.',
  };

  return descriptions[equipment];
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  hero: {
    marginTop: 20,
    marginBottom: 4,
  },
  appName: {
    color: '#7dd3fc',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  stepTrack: {
    flexDirection: 'row',
    gap: 8,
  },
  stepDot: {
    alignItems: 'center',
    backgroundColor: '#0b1526',
    borderColor: '#24364f',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 34,
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#7dd3fc',
  },
  stepDotText: {
    color: '#94a3b8',
    fontWeight: '900',
  },
  stepDotTextActive: {
    color: '#08111f',
  },
  panel: {
    backgroundColor: '#101c2f',
    borderColor: '#24364f',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  stepLabel: {
    color: '#7dd3fc',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
  },
  sectionContent: {
    gap: 12,
    marginTop: 14,
  },
  fieldHint: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  optionList: {
    gap: 10,
  },
  optionCard: {
    backgroundColor: '#0b1526',
    borderColor: '#24364f',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  optionCardCompact: {
    minWidth: '30%',
    flex: 1,
  },
  optionCardSelected: {
    backgroundColor: '#0f2d40',
    borderColor: '#38bdf8',
    borderWidth: 2,
  },
  optionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionTitle: {
    color: '#e2e8f0',
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  optionTitleSelected: {
    color: '#ffffff',
  },
  optionDetail: {
    color: '#94a3b8',
    lineHeight: 19,
    marginTop: 7,
  },
  selectMarker: {
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    minHeight: 26,
    minWidth: 44,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  selectMarkerOn: {
    backgroundColor: '#38bdf8',
  },
  selectMarkerText: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '900',
  },
  selectMarkerTextOn: {
    color: '#08111f',
  },
  textInput: {
    backgroundColor: '#0b1526',
    borderColor: '#24364f',
    borderRadius: 8,
    borderWidth: 1,
    color: '#ffffff',
    padding: 12,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
    fontWeight: '800',
  },
  reviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reviewItem: {
    backgroundColor: '#0b1526',
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  conditionBox: {
    backgroundColor: '#0b1526',
    borderRadius: 8,
    padding: 12,
  },
  reviewLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
  },
  reviewValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 5,
  },
  navigationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 15,
  },
  secondaryButtonText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '900',
  },
  disabledButton: {
    opacity: 0.45,
  },
  disabledButtonText: {
    color: '#64748b',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    flex: 2,
    padding: 15,
  },
  primaryButtonText: {
    color: '#08111f',
    fontSize: 16,
    fontWeight: '900',
  },
});
