import { useRouter } from 'expo-router';
import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import { API_URL } from '@env';
import type { LoginFormProps } from './(components)/login-form';
import { LoginForm } from './(components)/login-form';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    const rsp = await fetch(API_URL + '/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
