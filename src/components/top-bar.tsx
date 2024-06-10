import { Text } from '@/ui/text';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TopBar = ({ xp, points }: { xp: number; points: number }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      className="border-b-2 border-[#D4A373] px-5 pb-4 bg-[#FAEDCE]"
    >
      <View style={styles.xpContainer}>
        <Text type="defaultBold" className="text-xl">
          lvl 4
        </Text>
        <Text className="text-sm leading-[12px]">{xp}/200 XP</Text>
      </View>

      <Text type="defaultBold">{points} pts</Text>
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
