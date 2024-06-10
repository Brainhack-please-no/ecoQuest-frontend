import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import { View } from 'react-native';

export default function Timeline() {
  return (
    <CustomScrollView>
      <View>
        <Title title="Timeline" description="See what your friends are up to" />
      </View>
    </CustomScrollView>
  );
}
