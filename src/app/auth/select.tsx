import { useRouter } from 'expo-router';
import React from 'react';

import { Title } from '@/components/title';
import { Button, FocusAwareStatusBar, View } from '@/ui';

export default function SelectAuthOption() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center p-12">
      <FocusAwareStatusBar />
      <Title title="ecoQuest"></Title>
      <Button onPress={() => router.push('/auth/login')} label="Login" />
      <Button
        variant="outline"
        onPress={() => router.push('/auth/register')}
        label="Create an Account"
      />
    </View>
  );
}
