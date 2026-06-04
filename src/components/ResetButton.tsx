import { Pressable, StyleSheet, Text } from 'react-native';

// This is a small reusable outline button.
// App.tsx can change the label and decide what happens when it is pressed.
type ResetButtonProps = {
  label?: string;
  onPress: () => void;
};

export function ResetButton({ label = 'Reset Progress', onPress }: ResetButtonProps) {
  return (
    <Pressable style={styles.resetButton} onPress={onPress}>
      <Text style={styles.resetButtonText}>{label}</Text>
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
