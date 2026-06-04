import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FitnessProfile } from '../types/fitness';
import { FitnessProfileForm } from './FitnessProfileForm';

// This screen appears when the app does not have a saved fitness profile yet.
// It reuses FitnessProfileForm, then adds one button to save and enter the app.
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
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.appName}>PROJECT OASIS</Text>
        <Text style={styles.title}>Build Your Fitness Profile</Text>
        <Text style={styles.subtitle}>
          Choose your starting path so your daily quests can match your real life.
        </Text>
      </View>

      <FitnessProfileForm
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onAddLimitationPreset={onAddLimitationPreset}
      />

      <Pressable style={styles.primaryButton} onPress={onCompleteOnboarding}>
        <Text style={styles.primaryButtonText}>Start Daily Quests</Text>
      </Pressable>
    </View>
  );
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
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#38bdf8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#08111f',
    fontSize: 16,
    fontWeight: '800',
  },
});
