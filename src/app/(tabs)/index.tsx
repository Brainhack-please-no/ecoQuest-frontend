import { CustomScrollView } from '@/components/custom-scroll-view';
import QuestCard from '@/components/quest/quest-card';
import { Title } from '@/components/title';
import { Text } from '@/ui/text';
import { router } from 'expo-router';
import { ChevronsUpIcon } from 'lucide-react-native';
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const gestureTranslateY = new Animated.Value(0);

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
      <CustomScrollView>
        <View style={styles.questContainer}>
          <Title
            title="Quests"
            description="Complete quests to earn points and level up"
          />
        </View>
        <View style={styles.questContainer}>
          <Text>Refreshes in 2 weeks</Text>
          <QuestCard
            title="Plastic Free Week"
            description="Quest Description"
          />
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
