import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function QuestCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <ThemedView style={styles.container} lightColor="#FFF9EC">
      <ThemedView lightColor="#FAEDCD" style={styles.header}>
        <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
          {title}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{ fontSize: 18 }}>
          3/5
        </ThemedText>
      </ThemedView>
      <View style={styles.body}>
        <View>
          <ThemedText>{description}</ThemedText>
        </View>
        <View style={styles.rewards}>
          <ThemedText>Rewards</ThemedText>
          <ThemedText>Rewards</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D4A373CC",
    overflow: "hidden",
  },
  header: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    padding: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    padding: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rewards: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
