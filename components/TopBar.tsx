import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const TopBar = ({ xp, points }: { xp: number; points: number }) => {
  const insets = useSafeAreaInsets();
  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top }]}
      lightColor="#FAEDCD"
      darkColor="#333"
    >
      <View style={styles.xpContainer}>
        <ThemedText type="defaultSemiBold">lvl 4</ThemedText>
        <ThemedText style={{ fontSize: 14, lineHeight: 14 }}>
          {xp}/200 XP
        </ThemedText>
      </View>

      <ThemedText type="defaultSemiBold">Points: {points}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D4A373",
  },
  xpContainer: {
    flexDirection: "column",
  },
});

export default TopBar;
