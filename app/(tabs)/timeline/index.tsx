import { ScrollView } from "@/components/ScrollView";
import { ThemedView } from "@/components/ThemedView";
import TitleView from "@/components/Title";

export default function Timeline() {
  return (
    <ScrollView>
      <ThemedView>
        <TitleView
          title="Timeline"
          description="See what your friends are up to"
        />
      </ThemedView>
    </ScrollView>
  );
}
