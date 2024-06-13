import { useAuth } from '@/core';
import { API_URL } from '@/core/env';
import { Text } from '@/ui/text';
import { BlurView } from 'expo-blur';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Button,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

export const data = {};

export default function CameraC() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camerReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const token = useAuth.use.token();

  const [isLoading, setIsLoading] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: isLoading ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
    if (!cameraRef.current || !camerReady) {
      return;
    }

    const photo = (await cameraRef.current.takePictureAsync()) as {
      uri: string;
    };

    const formData = new FormData();
    formData.append('photo', {
      name: 'Just a name',
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    setTimeout(() => {
      setIsLoading(true); // Set loading state to true after a short delay
    }, 150); // Adjust the delay duration as needed

    const rsp = await fetch(`${API_URL}/scanner`, {
      method: 'POST',
      headers: {
        Authorization: `${token.access}`,
      },
      body: formData,
    });

    const data = await rsp.json();

    // Dummy data
    // const data = {
    //   success: true,
    //   data: {
    //     details: [
    //       {
    //         category: 'vegetable',
    //         'eco-friendliness_score': 2,
    //         original_name: 'BUNSHIMEIJI',
    //         quantity: '2',
    //       },
    //       {
    //         category: 'vegetable',
    //         'eco-friendliness_score': 3,
    //         matched_name: 'Brussel Sprouts',
    //         original_name: 'BRUSSEL SPRUITS',
    //         quantity: '1',
    //       },
    //       {
    //         category: 'vegetable',
    //         'eco-friendliness_score': 3,
    //         matched_name: 'Maitake Mushrooms 100g',
    //         original_name: "MAITAKE M'ROOM 100G",
    //         quantity: '2',
    //       },
    //       {
    //         category: 'dairy',
    //         'eco-friendliness_score': 1,
    //         original_name: 'CHK BL-I-HF HAL',
    //         quantity: '1',
    //       },
    //       {
    //         category: 'vegetable',
    //         'eco-friendliness_score': 2,
    //         matched_name: 'Cherry Tomatoes',
    //         original_name: 'ORCL CHRY TOMATO',
    //         quantity: '1',
    //       },
    //       {
    //         category: 'vegetable',
    //         'eco-friendliness_score': 2,
    //         matched_name: 'Bean Sprouts 200g',
    //         original_name: 'S/BEAN SPRI 200G',
    //         quantity: '1',
    //       },
    //       {
    //         category: 'beverage',
    //         'eco-friendliness_score': 2,
    //         original_name: 'CUT FRUIT JUICES2.50',
    //         quantity: '2',
    //       },
    //       {
    //         category: 'meat',
    //         'eco-friendliness_score': 1,
    //         matched_name: 'Beef Leg',
    //         original_name: 'C/LEG BL BF HAL',
    //         quantity: '1',
    //       },
    //       {
    //         category: 'beverage',
    //         'eco-friendliness_score': 3,
    //         matched_name: 'Yakult 100ml',
    //         original_name: 'YAKULT/YKLK55 100ML',
    //         quantity: '1',
    //       },
    //       {
    //         category: 'vegetable',
    //         'eco-friendliness_score': 3,
    //         original_name: 'ENOKI 200G',
    //         quantity: '3',
    //       },
    //     ],
    //     metrics: {
    //       plastic_bags_used: 0,
    //       plastic_free_packaging: 0,
    //       sustainable_clothing: 1,
    //     },
    //   },
    // };

    setIsLoading(false); // Set loading state to false after receiving the response

    if (!data.success) {
      alert(data.error);
      return;
    }

    router.replace({
      pathname: 'confirmmetric',
      params: { data: JSON.stringify(data.data) },
    });
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
        pointerEvents={isLoading ? 'none' : 'auto'} // Disable touch events when loading
      >
        <View style={{ flex: 1 }} className="self-center justify-end p-12">
          <TouchableOpacity
            className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center"
            onPress={takePicture}
            disabled={isLoading} // Disable the button when loading
          >
            <View className="w-[62px] h-[62px] rounded-full bg-white border-2 border-black"></View>
          </TouchableOpacity>
        </View>
      </CameraView>

      {isLoading && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: overlayOpacity,
          }}
        >
          <BlurView
            intensity={100}
            style={{ flex: 1, width: '100%' }}
            className="flex flex-col items-center justify-center"
            tint="dark"
          >
            <ActivityIndicator size="large"></ActivityIndicator>
            <Text
              className="text-center text-xl text-white pt-6"
              type="defaultSemiBold"
            >
              Loading...
            </Text>
            <Text className="text-center text-md text-white">
              please be patient :)
            </Text>
          </BlurView>
        </Animated.View>
      )}
    </View>
  );
}
