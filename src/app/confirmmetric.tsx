import { useFetchWithToken } from '@/api';
import { useQuests } from '@/api/quest';
import { metricMapping, useUser } from '@/api/user';
import { CustomScrollView } from '@/components/custom-scroll-view';
import { useAuth } from '@/core';
import { Button, SafeAreaView, Text, View } from '@/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { ResponseData } from './types';

export default function MetricDetail() {
  const { details, metrics } = JSON.parse(
    useLocalSearchParams().data as string
  ) as ResponseData;
  const { fetchWithToken } = useFetchWithToken();

  console.log(details);

  async function handleSubmit() {
    const rsp = await fetchWithToken('/datacheck', 'POST', metrics);
    const data = await rsp.json();
    if (data.success) {
      router.replace('/');
    } else {
      alert('Something went wrong.');
    }
  }

  return (
    <CustomScrollView bounces>
      <SafeAreaView>
        <View className="bg-white py-4">
          <Text type="title">Items</Text>
        </View>
        <View className="flex gap-4 pt-5">
          {details.length > 0 &&
            details.map((item, index) => (
              <View
                key={index}
                className="bg-[#FFF9EC] p-4 rounded-xl shadow-md shadow-yellow-700/20"
              >
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
          {details.length === 0 && (
            <View className="flex flex-row items-center justify-center py-16 border rounded-xl border-dashed border-gray-500">
              <Text type="defaultSemiBold">No items found</Text>
            </View>
          )}
        </View>
        <View className="my-12">
          <Text type="title" className="pb-4">
            Metrics
          </Text>
          {Object.entries(metrics).map(([key, value], index) => (
            <View
              key={index}
              className="flex flex-row items-center justify-between py-1"
            >
              <Text type="defaultSemiBold">{metricMapping[key]}</Text>
              <Text type="defaultBold">{value}</Text>
            </View>
          ))}
        </View>
        <View className="">
          <Button label="Confirm" onPress={handleSubmit} />
          <Button
            label="Cancel"
            onPress={() => router.replace('/')}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    </CustomScrollView>
  );
}
