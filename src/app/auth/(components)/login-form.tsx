import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Title } from '@/components/title';
import { Button, ControlledInput, View } from '@/ui';

const schema = z.object({
  username: z.string({ required_error: 'Username is required' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(3, 'Password must be at least 3 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-12 gap-2">
      <Title title="Sign In" />

      <ControlledInput
        testID="name"
        control={control}
        name="username"
        label="Username"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
