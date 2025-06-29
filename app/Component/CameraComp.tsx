import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import {  useRef, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  useWindowDimensions,
} from "react-native";
import CloseIcon from "@/assets/images/close.png";
import RecordIcon from "@/assets/images/record.png";
import PhotoIcon from "@/assets/images/Photo.png";
import GalleryIcon from "@/assets/images/gallery.png";
import IconBotton from "./IconBotton";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";

import VideoEditor from "./VideoEditor/VideoEditor";
// import ExpoVideoTrimmer from "./VideoEditor/VideoEditor";

const CameraComp = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<any>(null);
  const { width, height } = useWindowDimensions();

  // Create and manage the video player properly

  if (!permission || !micPermission) return <View />;
  if (!permission.granted || !micPermission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          We need your permission to access the camera and microphone.
        </Text>
        <Button title="Grant Camera Permission" onPress={requestPermission} />
        <Button title="Grant Mic Permission" onPress={requestMicPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo) {
      setUri(photo?.uri);
    }
  };

  const recordVideo = async () => {
    if (!ref.current) return;

    try {
      if (recording) {
        ref.current.stopRecording();
        setRecording(false);
        return;
      }

      setRecording(true);
      const video = await ref.current.recordAsync();
      if (video) {
        setVideoUri(video.uri);
      }
      setRecording(false);
    } catch (error) {
      console.error("Error recording video:", error);
      setRecording(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={{ uri: uri } as ImageSourcePropType}
          resizeMode={"contain"}
          style={{ width: 300, aspectRatio: 1 }}
        />
        <Button onPress={() => setUri(null)} title="Take another picture" />
      </View>
    );
  };

  const renderVideo = () => {
    return (
      <View style={{ width: width, height: height - 47 }}>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <IconBotton
            icon={CloseIcon}
            size={30}
            color="black"
            onPress={() => setVideoUri(null)}
          />
        </View>
        <Video
          source={{ uri: videoUri }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          useNativeControls
          style={{ width: width, height: height - 47 }}
        />
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={{ position: "absolute", left: 10, top: 40 }}>
          <IconBotton
            icon={CloseIcon}
            size={30}
            color="#fff"
            onPress={() => router.back()}
          />
        </View>
        <View style={styles.shutterContainer}>
          {mode === "picture" ? (
            <IconBotton
              icon={PhotoIcon}
              size={32}
              color="white"
              onPress={toggleMode}
            />
          ) : (
            <IconBotton
              icon={RecordIcon}
              size={32}
              color="white"
              onPress={toggleMode}
            />
          )}
          <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>

          <IconBotton
            icon={GalleryIcon}
            size={32}
            color="white"
            onPress={toggleFacing}
          />
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <VideoEditor vUri={videoUri} setVUri={setVideoUri} />
      ) : uri ? (
        renderPicture()
      ) : (
        renderCamera()
      )}
    </View>
  );
};

export default CameraComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
