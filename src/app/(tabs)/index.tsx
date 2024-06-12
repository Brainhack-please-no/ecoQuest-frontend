import { useFetchWithToken } from '@/api';
import { useUser } from '@/api/user';
import { CustomScrollView } from '@/components/custom-scroll-view';
import QuestCard from '@/components/quest/quest-card';
import { Title } from '@/components/title';
import { useAuth } from '@/core';
import { Text } from '@/ui/text';
import { router } from 'expo-router';
import { ChevronsUpIcon } from 'lucide-react-native';
import * as React from 'react';
import { Animated, RefreshControl, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const gestureTranslateY = new Animated.Value(0);

  const { fetchWithToken } = useFetchWithToken();
  const authUser = useAuth.use.user();

  const { data: user, refetch } = useUser(authUser._id);
  // Call refetch to manually refresh user data
  const handleRefresh = () => {
    refetch();
  };

  const [data, setData] = React.useState(null);
  const [isPending, setIsPending] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchWithToken(`/quests`, 'GET');
      const result = await response.json();
      console.log(result);
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
    refetch();
  }, []);

  const parseMetrics = (metrics) => {
    try {
      return JSON.parse(metrics);
    } catch (error) {
      console.error('Failed to parse metrics', error);
      return {};
    }
  };

  const getQuestStatus = (quest, userMetrics) => {
    const userMetricValue = userMetrics[quest.metric] || 0;
    if (quest.more_or_less === 'more') {
      if (userMetricValue >= quest.required_amount) {
        return 'complete';
      } else {
        return 'incomplete';
      }
    } else {
      if (userMetricValue <= quest.required_amount) {
        return 'complete';
      } else {
        return 'failed';
      }
    }
  };

  const userMetrics = parseMetrics(user.metrics);

  const sortedData = data
    ? data
        .map((quest) => ({
          ...quest,
          status: getQuestStatus(quest, userMetrics),
          points: quest.points,
          currentProgress: userMetrics[quest.metric] || 0,
          requiredProgress: quest.required_amount,
        }))
        .sort((a, b) => {
          const statusOrder = { incomplete: 0, failed: 1, complete: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        })
    : [];

  const gesture = Gesture.Pan()
    .onStart(() => {
      gestureTranslateY.setValue(0); // Reset position at start of gesture
    })
    .onUpdate((e) => {
      if (e.translationY < 0) {
        gestureTranslateY.setValue(e.translationY); // Update position based on drag
      }
      if (e.translationY < -100) {
        router.navigate('../camera');
      }
    })
    .onEnd(() => {
      Animated.spring(gestureTranslateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    })
    .runOnJS(true);

  return (
    <>
      <CustomScrollView
        bounces
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.questContainer}>
          <Title
            title="Quests"
            description="Complete quests to earn points and level up"
          />
        </View>
        <View style={styles.questContainer}>
          <Text>Refreshes in 2 weeks</Text>
          {sortedData &&
            sortedData.map((quest) => (
              <QuestCard
                key={quest.quest_id}
                name={quest.name}
                metric={quest.metric}
                status={quest.status}
                points={quest.points}
                currentProgress={quest.currentProgress}
                requiredProgress={quest.requiredProgress}
              />
            ))}
        </View>
      </CustomScrollView>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.panGestureContainer,
            { transform: [{ translateY: gestureTranslateY }] },
          ]}
        >
          <Text>swipe up to scan</Text>
          <ChevronsUpIcon size={24} color={'#666'} />
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questContainer: {
    flex: 1,
    marginTop: 10,
    gap: 10,
  },
  panGestureContainer: {
    position: 'absolute',
    height: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
