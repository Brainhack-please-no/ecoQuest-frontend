import { CustomScrollView } from '@/components/custom-scroll-view';
import { Title } from '@/components/title';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function DiscoverScreen() {
  return (
    <CustomScrollView>
      <View style={styles.container}>
        <Title
          title="Discover"
          description="Find eco friendly wood veneers in your area"
        />
      </View>
    </CustomScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
