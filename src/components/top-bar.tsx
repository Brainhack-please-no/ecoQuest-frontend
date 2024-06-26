import { useUser } from '@/api/user';
import { useAuth } from '@/core';
import { Text } from '@/ui/text';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const xpLevelMap = {
  1: 1000,
  2: 2000,
  3: 3000,
  4: 4000,
  5: 5000,
  // Add more levels and XP requirements as needed
};

const calculateLevel = (xp: number) => {
  let level = 1;
  let xpRequired = xpLevelMap[level];
  let totalXpForCurrentLevel = 0;

  while (xp >= xpRequired && level < Object.keys(xpLevelMap).length) {
    xp -= xpRequired;
    level++;
    totalXpForCurrentLevel += xpRequired;
    xpRequired = xpLevelMap[level];
  }

  return { level, xpRequired, currentXp: xp };
};

const TopBar = ({
  xp,
  points,
  refreshing,
}: {
  xp: number;
  points: number;
  refreshing: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth.getState();
  const { data: userData, refetch } = useUser(user?._id, { refreshing });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 500);

    return () => clearInterval(intervalId);
  }, [refetch]);

  const { level, xpRequired, currentXp } = useMemo(
    () => calculateLevel(userData?.xp),
    [userData?.xp]
  );

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      className="border-b-2 border-[#D4A373] px-5 pb-4 bg-[#FAEDCE]"
    >
      <View style={styles.xpContainer}>
        <Text type="defaultBold" className="text-xl">
          lvl {level}
        </Text>
        <Text className="text-sm leading-[12px]">
          {currentXp}/{xpRequired} XP
        </Text>
      </View>

      <Text type="defaultBold">{userData?.points} pts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpContainer: {
    flexDirection: 'column',
  },
});

export default TopBar;
