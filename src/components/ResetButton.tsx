import { Pressable, StyleSheet, Text } from 'react-native';

// This is a small reusable button for resetting test progress.
type ResetButtonProps = {
  onPress: () => void;
};

export function ResetButton({ onPress }: ResetButtonProps) {
  return (
    <Pressable style={styles.resetButton} onPress={onPress}>
      <Text style={styles.resetButtonText}>Reset Progress</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#cbd5e1',
    fontWeight: '700',
  },
});
