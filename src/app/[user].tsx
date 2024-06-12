import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { metricMapping, useUser } from '@/api/user';
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
import { RefreshControl } from 'react-native';

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
  if (!local.user) {
    return <Text>No user</Text>;
  }
  const user = useAuth.use.user();

  const { data, refetch, isPending, isError } = useUser(local.user);

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Text className="text-center">Error loading profile</Text>
      </View>
    );
  }

  const metrics = JSON.parse(data.metrics);

  if (!data) {
    return <Text>No data</Text>;
  }

  return (
    <CustomScrollView
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isPending} />
      }
    >
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Title title={data.username} description="5 friends" />
      <View className="flex gap-8">
        <View>
          <Text type="defaultSemiBold" className="text-xl">
            Statistics
          </Text>
          <Text>Some interesting facts about {data.username}</Text>
        </View>
        <View>
          {Object.entries(metricMapping).map(([key, value], index) => (
            <View
              key={index}
              className="flex flex-row items-center justify-between py-1"
            >
              <Text type="defaultSemiBold">{value}</Text>
              <Text type="defaultBold">{metrics ? metrics[key] : '0'}</Text>
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
            Medals {data.username} has earned through completing quests
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
