import { ScrollView } from "@/components/ScrollView";
import { ThemedView } from "@/components/ThemedView";
import TitleView from "@/components/Title";
import * as React from "react";
import { StyleSheet } from "react-native";

export default function DiscoverScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <TitleView
          title="Discover"
          description="Find eco friendly wood veneers in your area"
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
