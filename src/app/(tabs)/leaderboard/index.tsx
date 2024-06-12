import { useLeaderboard } from '@/api/leaderboard';
import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import { useAuth } from '@/core';
import { API_URL, Env } from '@/core/env';
import { ActivityIndicator, FocusAwareStatusBar, Pressable, Text } from '@/ui';
import { Stack, router } from 'expo-router';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import styled from 'styled-components/native';

export default function Leaderboard() {
  const signOut = useAuth.use.signOut();
  const { access } = useAuth.use.token();

  const [data, setData] = React.useState(null);
  const [isPending, setIsPending] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard`, {
        headers: {
          Authorization: `${access}`,
        },
      });
      if (response.status === 400) {
        console.log('logout');
        signOut();
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const ItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ rank }: { rank: number }) => {
      switch (rank) {
        case 1:
          return '#FFD700'; // gold
        case 2:
          return '#C0C0C0'; // silver
        case 3:
          return '#CD7F32'; // bronze
        default:
          return '#FEF9EC'; // pale green
      }
    }};
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${({ rank }: { rank: number }) => {
      switch (rank) {
        case 1:
          return '#FFD700';
        case 2:
          return '#C0C0C0';
        case 3:
          return '#CD7F32';
        default:
          return '#D4A373';
      }
    }};
  `;

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
  }) => (
    <Pressable
      onPress={() => {
        router.push(`/profile/${id}`);
      }}
    >
      <ItemContainer rank={rank} key={id}>
        <View className="flex-row items-center gap-3">
          <Text type="defaultBold">{rank}</Text>
          <Text type="defaultSemiBold">{name}</Text>
        </View>
        <Text type="defaultBold">{points.toLocaleString()} pts</Text>
      </ItemContainer>
    </Pressable>
  );
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
    <CustomScrollView
      bounces
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Title
          title="Leaderboard"
          description="Complete to get the highest score in your country"
        />
      </View>
      <View>
        {data.map((item, index) => (
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
