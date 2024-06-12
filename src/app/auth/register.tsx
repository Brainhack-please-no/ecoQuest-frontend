import { useRouter } from 'expo-router';
import React from 'react';

import { useFetchWithToken } from '@/api';
import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';
import type { RegisterFormProps } from './(components)/register-form';
import { RegisterForm } from './(components)/register-form';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const { fetchWithToken } = useFetchWithToken();
  useSoftKeyboardEffect();

  const onSubmit: RegisterFormProps['onSubmit'] = async (data) => {
    console.log(data);
    const rsp = await fetchWithToken('/users/register', 'POST', data);
    const returnData = await rsp.json();
    if (returnData.success) {
      const rsp = await fetchWithToken('/users/login', 'POST', data);
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
