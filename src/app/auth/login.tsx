import { useRouter } from 'expo-router';
import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import type { LoginFormProps } from './(components)/login-form';
import { LoginForm } from './(components)/login-form';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.navigate('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
