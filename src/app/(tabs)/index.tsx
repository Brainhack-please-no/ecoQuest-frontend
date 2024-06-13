import { useFetchWithToken } from '@/api';
import { useQuests } from '@/api/quest';
import { useUser } from '@/api/user';
import { CustomScrollView } from '@/components/custom-scroll-view';
import QuestCard from '@/components/quest/quest-card';
import { Title } from '@/components/title';
import { useAuth } from '@/core';
import { Text } from '@/ui/text';
import { router, useFocusEffect } from 'expo-router';
import { ChevronsUpIcon } from 'lucide-react-native';
import * as React from 'react';
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const gestureTranslateY = new Animated.Value(0);

  const authUser = useAuth.use.user();

  const { data: user, refetch, isLoading } = useUser(authUser._id);
  const {
    data: quests,
    refetch: refetchQuests,
    isLoading: isLoadingQuests,
  } = useQuests();

  const refreshing = isLoading || isLoadingQuests;

  const onRefresh = React.useCallback(() => {
    refetch();
    refetchQuests();
  }, [refetch, refetchQuests]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      refetchQuests();
    }, [refetch, refetchQuests])
  );

  if (isLoading || isLoadingQuests) {
    return (
      <View className="flex-1 justify-center  p-3">
        <ActivityIndicator />
      </View>
    );
  }

  const parseMetrics = (metrics) => {
    try {
      return JSON.parse(metrics);
    } catch (error) {
      console.error('Failed to parse metrics', error);
      return {};
    }
  };

  const getQuestStatus = (quest, userMetrics) => {
    const userMetricValue = userMetrics ? userMetrics[quest.metric] || 0 : 0;
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

  const sortedData = quests
    ? quests
        .map((quest) => ({
          ...quest,
          status: getQuestStatus(quest, userMetrics),
          points: quest.points,
          currentProgress: userMetrics ? userMetrics[quest.metric] || 0 : 0,
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
