import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import { View } from 'react-native';

export default function Leaderboard() {
  return (
    <CustomScrollView>
      <View>
        <Title
          title="Leaderboard"
          description="Complete to get the highest score in your country"
        />
      </View>
    </CustomScrollView>
  );
}
