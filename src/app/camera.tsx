import { Text } from '@/ui/text';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();

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

  function capturePhoto() {
    console.log('capturePhoto');
  }

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
        style={{ flex: 1 }}
        className="overflow-hidden justify-center"
      >
        <View style={{ flex: 1 }} className="self-center justify-end p-12">
          <TouchableOpacity
            className="w-16 h-16 bg-white rounded-full border-2 border-black shadow-md"
            onPress={capturePhoto}
          >
            <View className="w-16 h-16 rounded-full"></View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
