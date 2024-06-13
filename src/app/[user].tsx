import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { metricMapping, useUser } from '@/api/user';
import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/ui';
import { MedalIcon } from 'lucide-react-native';
import { Animated, Pressable, RefreshControl } from 'react-native';
import { twMerge } from 'tailwind-merge';

const medals = [
  {
    name: 'Plastic Free',
  },
  {
    name: 'Sustainable Clothing',
  },
  {
    name: 'ecoQuest',
  },
  {
    name: 'Completionist',
  },
];

export default function User() {
  const local = useLocalSearchParams<{ user: string }>();
  if (!local.user) {
    return <Text>No user</Text>;
  }

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
          <Text type="defaultBold" className="text-2xl">
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
          <Text type="defaultBold" className="text-2xl">
            Medals
          </Text>
          <Text>
            Medals {data.username} has earned through completing quests
          </Text>
        </View>
        <View className="flex flex-row flex-wrap gap-4 pl-4">
          {medals.map((stat, index) => {
            const scale = new Animated.Value(1);

            const onPressIn = () => {
              Animated.spring(scale, {
                toValue: 0.94,
                useNativeDriver: true,
              }).start();
            };

            const onPressOut = () => {
              Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            };

            return (
              <Pressable
                key={index}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                className="w-[45%]"
              >
                <Animated.View
                  style={{ transform: [{ scale }] }}
                  className="bg-[#FFF9EC] shadow-md shadow-yellow-600/20 rounded-xl p-4 flex-1 flex flex-col gap-2"
                >
                  <View className="flex items-center justify-center">
                    <MedalIcon
                      size={64}
                      strokeWidth={1.5}
                      className={twMerge(
                        'color-yellow-500 m-4',
                        index === 0 ? 'color-yellow-500' : 'color-gray-500'
                      )}
                    />
                  </View>
                  <Text type="defaultBold" className="text-md text-center pb-2">
                    {stat.name}
                  </Text>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </CustomScrollView>
  );
}
