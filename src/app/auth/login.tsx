import { useRouter } from 'expo-router';
import React from 'react';

import { useFetchWithToken } from '@/api';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import type { LoginFormProps } from './(components)/login-form';
import { LoginForm } from './(components)/login-form';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  const { fetchWithToken } = useFetchWithToken();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    const rsp = await fetchWithToken('/users/login', 'POST', data);
    const returnData = await rsp.json();

    if (returnData.success) {
      signIn({ access: returnData.token }, returnData.user);
      console.log('signin', returnData.token);
      router.navigate('/');
    } else {
      alert(returnData.msg);
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
