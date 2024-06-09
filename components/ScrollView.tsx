import { ThemedView } from "@/components/ThemedView";
import { Animated, StyleSheet } from "react-native";

export const ScrollView = ({ children }: { children: React.ReactNode }) => (
  <ThemedView style={styles.container}>
    <Animated.ScrollView scrollEventThrottle={16}>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
