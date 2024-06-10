import { useRouter } from 'expo-router';
import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import type { RegisterFormProps } from './(components)/register-form';
import { RegisterForm } from './(components)/register-form';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: RegisterFormProps['onSubmit'] = (data) => {
    console.log(data);
    signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.replace('/');
  };
  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
}
