import { useLeaderboard } from '@/api/leaderboard';
import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import { useAuth } from '@/core';
import { ActivityIndicator, Pressable, Text } from '@/ui';
import { Stack, router } from 'expo-router';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { twMerge } from 'tailwind-merge';

export default function Leaderboard() {
  const user = useAuth.use.user();

  const { data: leaderboard, refetch, isLoading, isError } = useLeaderboard();

  const LeaderboardItem = ({
    id,
    rank,
    name,
    points,
  }: {
    id: number;
    rank: number;
    name: string;
    points: number;
  }) => {
    const content = (
      <View
        key={id}
        className={twMerge(
          'flex-row items-center justify-between p-4 bg-[#FFF9EC] shadow-md shadow-yellow-700/20 rounded-xl',
          user?._id === id && 'bg-green-300',
          rank === 1 && 'bg-transparent '
        )}
      >
        <View className="flex-row items-center gap-3">
          <Text
            type="defaultBold"
            className={twMerge(rank === 1 && 'text-white')}
          >
            {rank}
          </Text>
          <Text
            type="defaultSemiBold"
            className={twMerge(
              rank === 1 && 'text-white',
              user?._id === id && 'font-bold'
            )}
          >
            {user?._id === id ? 'You' : name}
          </Text>
        </View>
        <Text
          type="defaultBold"
          className={twMerge(rank === 1 && 'text-white')}
        >
          {points.toLocaleString()} pts
        </Text>
      </View>
    );

    return (
      <Pressable
        onPress={() => {
          router.push(`/${id}`);
        }}
      >
        {rank <= 3 ? (
          <LinearGradient
            colors={['#FD7D11', '#DC21E6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 12,
              padding: 2,
            }}
          >
            {content}
          </LinearGradient>
        ) : (
          content
        )}
      </Pressable>
    );
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Text className="text-center">Error loading leaderboard</Text>
      </View>
    );
  }
  return (
    <CustomScrollView
      bounces
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <View>
        <Title
          title="Leaderboard"
          description="Complete to get the highest score in your country"
        />
      </View>
      <View className="gap-2">
        {leaderboard.map((item, index) => (
          <LeaderboardItem
            key={item.id}
            id={item.id}
            rank={index + 1}
            name={item.username}
            points={item.points}
          />
        ))}
      </View>
    </CustomScrollView>
  );
}
