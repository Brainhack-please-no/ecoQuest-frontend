import { Animated, StyleSheet, View } from "react-native";

export const CustomScrollView = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <View style={styles.container}>
    <Animated.ScrollView
      bounces={false}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>{children}</View>
    </Animated.ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
