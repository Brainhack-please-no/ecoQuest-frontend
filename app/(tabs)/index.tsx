import { ScrollView } from "@/components/ScrollView";
import { ThemedView } from "@/components/ThemedView";
import TitleView from "@/components/Title";
import * as React from "react";
import { Image, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <TitleView
          title="Quests"
          description="Complete quests to earn points and level up"
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
