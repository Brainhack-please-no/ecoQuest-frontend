import { Text } from '@/ui/text';
import { CheckIcon, XIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export default function QuestCard({
  name,
  metric,
  status,
  points,
  currentProgress,
  requiredProgress,
}: {
  name: string;
  metric: string;
  status: string;
  points: number;
  currentProgress: number;
  requiredProgress: number;
}) {
  const progress = `${currentProgress}/${requiredProgress}`;
  const isCompleted = status === 'complete';
  const isFailed = status === 'failed';
  const formattedPoints = points > 0 ? `+${points}` : points.toString();

  return (
    <View
      className={twMerge(
        'rounded-xl shadow-md shadow-yellow-600/20 bg-[#FFF9EC]',
        isCompleted ? 'bg-gray-200 shadow-green-600/20' : '',
        isFailed && 'bg-red-100/80 shadow-red-500/20'
      )}
    >
      <View className="flex flex-row justify-between text-lg mb-2 p-4 pb-0">
        <Text type="defaultSemiBold" className="flex-1">
          {name}
        </Text>
        <View>
          {isCompleted && (
            <Text className="text-green-500">
              <CheckIcon size={24} color="green"></CheckIcon>
            </Text>
          )}
          {isFailed && (
            <Text className="text-red-400">
              <XIcon size={24} color="red"></XIcon>
            </Text>
          )}
        </View>
      </View>
      <View className="flex flex-row justify-between mb-3 px-4">
        <Text
          className={twMerge(
            'text-black',
            isCompleted && 'text-green-800',
            isFailed && 'text-red-800'
          )}
          type="defaultSemiBold"
        >
          {formattedPoints} pts
        </Text>
      </View>
      <View
        className={twMerge(
          'relative flex-1 overflow-hidden h-7 rounded-b-xl bg-yellow-300/90',
          isCompleted && 'bg-green-200'
        )}
      >
        <View
          className={twMerge(
            'bg-yellow-500 h-full',
            isCompleted && 'bg-green-500',
            isFailed && 'bg-red-400'
          )}
          style={{
            width: `${Math.min(currentProgress / requiredProgress, 1) * 100}%`,
          }}
        />
        <Text className="absolute right-0 left-0 text-center pt-[3px]">
          <Text className="text-black">{progress}</Text>
        </Text>
      </View>
    </View>
  );
}
