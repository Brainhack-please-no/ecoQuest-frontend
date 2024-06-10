import { Text } from '@/ui/text';
import { View } from 'react-native';

export default function QuestCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="border-2 border-brown-500 rounded-lg bg-[#FEF9EC]">
      <View className="p-2  flex flex-row justify-between bg-[#FAEDCD] rounded-t-md text-lg">
        <Text type="defaultSemiBold">{title}</Text>
        <Text type="defaultSemiBold">3/5</Text>
      </View>
      <View className="p-2 flex justify-between flex-row">
        <View>
          <Text>{description}</Text>
        </View>
        <View className="flex flex-col justify-between">
          <Text>Rewards</Text>
          <Text>Rewards</Text>
        </View>
      </View>
    </View>
  );
}
