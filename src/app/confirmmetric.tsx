import { View, Text } from '@/ui';
import { useLocalSearchParams } from 'expo-router';
import { ResponseData } from './types';

export default function MetricDetail() {
  const { details, metric } = JSON.parse(
    useLocalSearchParams().data as string
  ) as ResponseData;

  return (
    <View>
      <View>
        {details.map((item, index) => (
          <View key={index}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.original_name}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.matched_name}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.category}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.quantity}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.price_per_unit}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.total_price}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item.plastic_packaging_count}
            </Text>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              {item['eco-friendliness_score']}
            </Text>
          </View>
        ))}
        {metric &&
          typeof metric === 'object' &&
          Object.entries(metric).map(([key, value], index) => (
            <View key={index}>
              <Text
                style={{ fontSize: 20, textAlign: 'center' }}
              >{`${key}: ${value}`}</Text>
            </View>
          ))}
      </View>
    </View>
    // <View>
    //   <View>
    //     {details.map((item, index) => (
    //       <View key={index}>
    //         <Text>{item.original_name}</Text>
    //         <Text>{item.matched_name}</Text>
    //         <Text>{item.category}</Text>
    //         <Text>{item.quantity}</Text>
    //         <Text>{item.price_per_unit}</Text>
    //         <Text>{item.total_price}</Text>
    //         <Text>{item.plastic_packaging_count}</Text>
    //         <Text>{item['eco-friendliness_score']}</Text>
    //       </View>
    //     ))}
    //     {metric &&
    //       typeof metric === 'object' &&
    //       Object.entries(metric).map(([key, value], index) => (
    //         <View key={index}>
    //           <Text>{`${key}: ${value}`}</Text>
    //         </View>
    //       ))}
    //     {/* {Object.entries(metric).map(([key, value], index) => (
    //       <View key={index}>
    //         <Text>{`${key}: ${value}`}</Text>
    //       </View>
    //     ))} */}
    //   </View>
    // </View>
  );
}
