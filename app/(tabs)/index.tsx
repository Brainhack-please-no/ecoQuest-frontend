import Camera from "@/components/Camera";
import { ScrollView } from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TitleView from "@/components/Title";
import QuestCard from "@/components/quest/QuestCard";
import { useCameraPermissions } from "expo-camera";
import * as React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [showCamera, setShowCamera] = React.useState(false);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY < -100) {
        setShowCamera(true);
      }
    })
    .onEnd(() => {
      setShowCamera(false);
    });

  return (
    <ScrollView>
      <GestureDetector gesture={gesture}>
        <View>
          <ThemedView style={styles.container}>
            <TitleView
              title="Quests"
              description="Complete quests to earn points and level up"
            />
          </ThemedView>
          <ThemedView style={styles.questContainer}>
            <ThemedText>Refreshes in 2 weeks</ThemedText>
            <QuestCard
              title="Plastic Free Week"
              description="Quest Description"
            />
          </ThemedView>
          <Camera />
        </View>
      </GestureDetector>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questContainer: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },
});
