import { Text } from '@/ui/text';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';

export const data = {};

export default function CameraC() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camerReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex flex-col items-center justify-center h-full p-10">
        <Text className="text-center text-xl" type="defaultSemiBold">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && camerReady) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      // return photo;
      // const rsp = await fetch('https://example.com/upload', {
      //   method: 'POST',
      //   body: JSON.stringify({ photo }),
      // });
      // const data = await rsp.json();

      const data = {
        details: [
          {
            original_name: 'Organic Bananas',
            matched_name: 'Chiquita Organic Bananas',
            category: 'Produce',
            quantity: '1 bunch',
            price_per_unit: '$0.59',
            total_price: '$1.77',
            plastic_packaging_count: 0,
            'eco-friendliness_score': 1,
          },
          {
            original_name: '2L Diet Soda',
            matched_name: 'Coca-Cola Diet Soda 2L',
            category: 'Beverages',
            quantity: '1 bottle',
            price_per_unit: '$1.99',
            total_price: '$1.99',
            plastic_packaging_count: 1,
            'eco-friendliness_score': 0.5,
          },
          {
            original_name: 'Unknown Item',
            matched_name: 'N/A',
            category: 'N/A',
            quantity: 'N/A',
            price_per_unit: 'N/A',
            total_price: 'N/A',
            plastic_packaging_count: 0,
            'eco-friendliness_score': 0,
          },
        ],
        metrics: {
          plastic_free_packaging: 1,
          plastic_bags_used: 1,
          sustainable_clothing: 0,
        },
      };

      router.push({ pathname: 'confirmmetric', params: { data } });
    }
  };

  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <View className="flex-1">
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />

      <CameraView
        onCameraReady={() => {
          setCameraReady(true);
        }}
        ref={cameraRef}
        style={{ flex: 1 }}
        className="overflow-hidden justify-center"
      >
        <View style={{ flex: 1 }} className="self-center justify-end p-12">
          <TouchableOpacity
            className="w-16 h-16 bg-white rounded-full border-2 border-black shadow-md"
            onPress={takePicture}
          >
            <View className="w-16 h-16 rounded-full"></View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
