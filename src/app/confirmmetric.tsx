import { View, Text } from '@/ui';
import { useLocalSearchParams } from 'expo-router';

export default function MetricDetail() {
  const item = useLocalSearchParams();

  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
}
