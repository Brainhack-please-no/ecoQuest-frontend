import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { useFetchWithToken } from '@/api';
import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import { useAuth } from '@/core';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/ui';

const metricMapping = {
  plastic_bags_used: 'No. of plastic bags used',
  plastic_free_packaging: 'No. of items bought with no plastic packaging',
  sustainable_clothing: 'No. of sustainable clothing items bought',
};

const medals = [
  {
    name: 'Plastic Free',
    description: 'No plastic packaging',
  },
  {
    name: 'Sustainable Clothing',
    description: 'No plastic packaging',
  },
];

export default function User() {
  const local = useLocalSearchParams<{ user: string }>();
  const signOut = useAuth.use.signOut();
  const { fetchWithToken } = useFetchWithToken();
  const user = useAuth.use.user();
  console.log(user, local.user);

  const [data, setData] = React.useState(null);
  const [isPending, setIsPending] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithToken(
          `/users/data/${local.user}`,
          'GET'
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [local.user]);

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
        <Button onPress={signOut} label="Sign Out" />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading profile</Text>
        <Button onPress={signOut} label="Sign Out" />
      </View>
    );
  }

  const metrics = JSON.parse(data.metrics);

  if (!data) {
    return <Text>No data</Text>;
  }

  return (
    <CustomScrollView>
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Title title={data.username} description="5 friends" />
      <View className="flex gap-8">
        <View>
          <Text type="defaultSemiBold" className="text-xl">
            Statistics
          </Text>
          <Text>Some interesting facts since you've started using the app</Text>
        </View>
        <View>
          {metrics &&
            Object.entries(metrics).map(([key, value], index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-between py-1"
              >
                <Text type="defaultSemiBold">{metricMapping[key]}</Text>
                <Text type="defaultBold">{value}</Text>
              </View>
            ))}
        </View>
      </View>
      <View className="flex gap-8 pt-12">
        <View>
          <Text type="defaultSemiBold" className="text-xl">
            Medals
          </Text>
          <Text>
            Medals you’ve earned through completing quests, showcase them to
            your friends!
          </Text>
        </View>
        <View className="flex flex-row flex-wrap gap-4">
          {medals.map((stat, index) => (
            <View
              key={index}
              className="border-2 border-gray-200 rounded-lg p-4 w-[45%]"
            >
              <Text type="defaultSemiBold">{stat.name}</Text>
              <Text type="defaultBold">{stat.description}</Text>
            </View>
          ))}
        </View>
      </View>
      {user._id == local.user && <Button onPress={signOut} label="Sign Out" />}
    </CustomScrollView>
  );
}
