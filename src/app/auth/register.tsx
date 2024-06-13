import { useRouter } from 'expo-router';
import React from 'react';

import { useAuth } from '@/core';
import { API_URL, Env } from '@/core/env';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import type { RegisterFormProps } from './(components)/register-form';
import { RegisterForm } from './(components)/register-form';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();

  const onSubmit: RegisterFormProps['onSubmit'] = async (data) => {
    console.log(data);
    const rsp = await fetch(API_URL + '/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const returnData = await rsp.json();
    if (returnData.success) {
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
        router.navigate('/');
      } else {
        alert(returnData.msg);
      }
    } else {
      alert(returnData.msg);
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
}
