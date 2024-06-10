import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { useProfile } from '@/api';
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

export default function User() {
  const local = useLocalSearchParams<{ id: string }>();
  const signOut = useAuth.use.signOut();

  // return <Button onPress={signOut} label="Sign Out" />;

  const { data, isPending, isError } = useProfile({
    //@ts-ignore
    variables: { id: local.id },
  });

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading profile</Text>
      </View>
    );
  }

  return (
    <CustomScrollView>
      <Stack.Screen options={{ title: 'Post', headerBackTitle: 'Feed' }} />
      <FocusAwareStatusBar />
      <Title title={data.name} description={data.friends.length + ' friends'} />
      <View className="flex gap-8">
        <View>
          <Text type="defaultSemiBold" className="text-xl">
            Statistics
          </Text>
          <Text>Some interesting facts since you've started using the app</Text>
        </View>
        <View>
          {data.statistics.map((stat, index) => (
            <View
              key={index}
              className="flex flex-row items-center justify-between py-1"
            >
              <Text type="defaultSemiBold">{stat.name}</Text>
              <Text type="defaultBold">{stat.value}</Text>
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
          {data.medals.map((stat, index) => (
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
    </CustomScrollView>
  );
}
