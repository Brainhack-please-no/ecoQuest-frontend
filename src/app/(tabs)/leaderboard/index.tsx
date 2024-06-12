import { useLeaderboard } from '@/api/leaderboard';
import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import { View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Button,
  FocusAwareStatusBar,
  Pressable,
  Text,
} from '@/ui';
import styled from 'styled-components/native';

export default function Leaderboard() {
  const { data, isPending, isError } = useLeaderboard({});

  const ItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ rank }) => {
      switch (rank) {
        case 1:
          return '#FFD700'; // gold
        case 2:
          return '#C0C0C0'; // silver
        case 3:
          return '#CD7F32'; // bronze
        default:
          return '#FFFFFF'; // pale green
      }
    }};
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: ${({ rank }) => {
      switch (rank) {
        case 1:
          return '#FFD700';
        case 2:
          return '#C0C0C0';
        case 3:
          return '#CD7F32';
        default:
          return '#000000';
      }
    }};
  `;
  const Rank = styled.Text`
    font-size: 18px;
    width: 30px;
  `;

  const Name = styled.Text`
    font-size: 18px;
    flex: 1;
  `;
  const Points = styled.Text`
    font-size: 18px;
    color: #333;
  `;

  const LeaderboardItem = ({ id, rank, name, points }) => (
    <Pressable
      onPress={() => {
        console.log('pressed');
        router.push(`/profile/${id}`);
      }}
    >
      <ItemContainer rank={rank} key={id}>
        <Rank>{rank}</Rank>
        <Name>{name}</Name>
        <Points>{points.toLocaleString()} pts</Points>
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
    <CustomScrollView>
      <View>
        <Title
          title="Leaderboard"
          description="Complete to get the highest score in your country"
        />
      </View>
      <View>
        {data.data.map((item, index) => (
          <LeaderboardItem
            key={item.userId}
            id={item.userId}
            rank={index + 1}
            name={item.name}
            points={item.points}
          />
        ))}
      </View>
    </CustomScrollView>
  );
}
