import { useRouter } from 'expo-router';
import React from 'react';

import { Title } from '@/components/title';
import { useIsFirstTime } from '@/core/hooks';
import { Button, FocusAwareStatusBar, SafeAreaView, View } from '@/ui';
export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  return (
    <View className="flex h-full justify-center p-12">
      <FocusAwareStatusBar />
      <Title title="Welcome to ecoQuest"></Title>
      <SafeAreaView className="mt-6">
        <Button
          label="Let's Get Started "
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/auth/select');
          }}
        />
      </SafeAreaView>
    </View>
  );
}
