import { Text } from '@/ui/text';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export const Title = ({
  title,
  description = '',
  className = '',
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <View className={twMerge('py-4', className)}>
      <Text type="title">{title}</Text>
      <Text type="subtitle" className="max-w-[70%]">
        {description}
      </Text>
    </View>
  );
};
