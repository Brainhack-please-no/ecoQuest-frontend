import { ScrollView } from "@/components/ScrollView";
import { ThemedView } from "@/components/ThemedView";
import TitleView from "@/components/Title";

export default function Leaderboard() {
  return (
    <ScrollView>
      <ThemedView>
        <TitleView
          title="Leaderboard"
          description="Complete to get the highest score in your country"
        />
      </ThemedView>
    </ScrollView>
  );
}
