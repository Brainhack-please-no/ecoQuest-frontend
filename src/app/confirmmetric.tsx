import { CustomScrollView } from '@/components/custom-scroll-view';
import { SafeAreaView, Text, View } from '@/ui';
import { useLocalSearchParams } from 'expo-router';
import { ResponseData } from './types';

export default function MetricDetail() {
  const { details, metrics } = JSON.parse(
    useLocalSearchParams().data as string
  ) as ResponseData;

  return (
    <CustomScrollView>
      <SafeAreaView>
        <Text type="title">Items</Text>
        <View className="flex gap-4 pt-5">
          {details.map((item, index) => (
            <View key={index} className="border-2 p-2 rounded-xl">
              <View className="flex flex-row justify-between">
                <Text type="defaultBold">{item.matched_name}</Text>
                <View className="bg-primary-100 px-2 py-1 rounded-md">
                  <Text className="text-sm">{item.category}</Text>
                </View>
              </View>
              <View>
                <View className="flex flex-row gap-2">
                  <Text>Qty:</Text>
                  <Text>{item.quantity}</Text>
                </View>
                <View className="flex flex-row gap-2">
                  <Text>Eco Friendliness Score:</Text>
                  <Text>{item['eco-friendliness_score']}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View className="pt-10">
          <Text type="title">Metrics</Text>
          {Object.entries(metrics).map(([key, value], index) => (
            <View key={index}>
              <Text>{`${key}: ${value}`}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </CustomScrollView>
  );
}
