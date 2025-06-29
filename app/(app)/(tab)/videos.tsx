import {
  View,
  Text,
  ImageSourcePropType,
  ColorValue,
  Image,
  Platform,
  Dimensions,
  FlatList,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import IconBotton from "@/app/Component/IconBotton";
import LikeIcon from "@/assets/images/likeOutlined.png";
import LikeBIcon from "@/assets/images/likeBold.png";
import Comment from "@/assets/images/comment.png";
import VideoScreen from "@/app/Component/VideoComp";
import ShareIcon from "@/assets/images/share.png";
import { useVideoPlayer, VideoView } from "expo-video";
import Controler from "@/app/Component/Controler";
import { useEvent } from "expo";
import WebVideoComp from "@/app/Component/WebVideoComp";
import { useFocusEffect } from "expo-router";

const SCREEN_HEIGHT = Dimensions.get("window").height - 47;

const ContentComp = ({
  shouldPlay,
  isVisible,
  pipEnabled,
  player,
  playerRef,
  setPipEnabled,
  videoUri,
  isPlayingWeb,
  togglePlay,
  currentTime,
  duration,
  handleSeek,
  volume,
  handleVolumeChange,
  setCurrentTime,
  setDuration,
}: {
  videoUri: any;
  player: any;
  playerRef: any;
  pipEnabled: boolean;
  shouldPlay: boolean;
  isVisible: boolean;
  setPipEnabled: (e: boolean) => void;
  isPlayingWeb: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  handleSeek?: (value: number) => void;
  volume: number;
  handleVolumeChange: (value: number) => void;
  setCurrentTime: (e: any) => void;
  setDuration: (e: any) => void;
}) => (
  <View style={{ width: "100%", height: "100%", paddingVertical: 5 }}>
    {Platform.OS === "web" ? (
      <WebVideoComp
        uri={videoUri}
        playerRef={playerRef}
        isPlaying={isPlayingWeb}
        togglePlay={() => togglePlay()}
        currentTime={currentTime}
        duration={duration}
        handleSeek={(val) => setCurrentTime(val)}
        volume={volume}
        handleVolumeChange={(val: number) => handleVolumeChange(val)}
        setDuration={setDuration}
        setCurrentTime={setCurrentTime}
      />
    ) : (
      <VideoScreen
        pipEnabled={pipEnabled}
        shouldPlay={shouldPlay}
        isVisible={isVisible}
        player={player}
        playerRef={playerRef}
        setPipEnabled={setPipEnabled}
      />
    )}
  </View>
);

const LeftSideComp = () => {
  const [isLike, setIslike] = useState(false);

  const sideBarMap = [
    {
      name: "like",
      icon: isLike
        ? (LikeBIcon as ImageSourcePropType)
        : (LikeIcon as ImageSourcePropType),
      color: "#fff",
      onPress: () => setIslike(!isLike),
    },
    {
      name: "comment",
      icon: Comment as ImageSourcePropType,
      color: "#fff",
      onPress: () => {},
    },
    { name: "share", icon: ShareIcon, color: "#fff", onPress: () => {} },
  ];

  return (
    <View
      style={{
        alignItems: "center",
        height: "auto",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          height: "auto",
          width: "100%",
          marginVertical: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/032/176/191/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg",
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "silver",
          }}
          resizeMode={"cover"}
        />
      </View>
      {sideBarMap.map((bar, index) => (
        <View
          key={index}
          style={{
            height: 50,
            width: "100%",
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconBotton
            style={{
              height: "auto",
              width: "auto",
            }}
            icon={bar.icon as ImageSourcePropType}
            onPress={bar.onPress}
            color={bar.color}
            size={30}
          />
        </View>
      ))}
    </View>
  );
};

const uri =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const videoTestList = [
  {
    uri: uri,
    index: 0,
  },
  {
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    index: 1,
  },
  {
    uri: uri,
    index: 2,
  },
  {
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    index: 3,
  },
  {
    uri: uri,
    index: 4,
  },
  {
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    index: 5,
  },
  {
    uri: uri,
    index: 6,
  },
  {
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    index: 7,
  },
  {
    uri: uri,

    index: 8,
  },
  {
    uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    index: 9,
  },
];

const Videos = () => {
  const [videoList] = useState(videoTestList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUri, setVideoUri] = useState(videoTestList[0].uri);
  const [pipEnabled, setPipEnabled] = useState(false);
  const [isPlayingWeb, setIsPlayingWeb] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(0.1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [showVolume, setShowVolume] = useState<boolean>(false);

  const playerRef = useRef<VideoView | any>(null);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = playerRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const togglePlay = () => {
    const video = playerRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlayingWeb(true);
    } else {
      video.pause();
      setIsPlayingWeb(false);
    }
  };
  const handleVolumeChange = (e: number) => {
    const video = playerRef.current;
    if (!video) return;
    const vol = parseFloat(String(e));

    playerRef.current.volume = vol;
    setVolume(e);
  };
  const player = useVideoPlayer(videoUri, (p) => {
    p.loop = true;
    p.muted = false;
    p.volume = 1.0;
    try {
      p.play();
    } catch {}
    p.staysActiveInBackground = true;
  });

  // Create refs for each item view

  const itemRefs = useRef<Map<number, View>>(new Map());

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player?.playing ?? false,
  });

  // Called on scroll - figure out which index is currently mostly visible
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Calculate current index by scroll offset / item height (SCREEN_HEIGHT)
    const index = Math.round(offsetY / SCREEN_HEIGHT);

    if (index !== currentIndex && index >= 0 && index < videoList.length) {
      setCurrentIndex(index);
      setVideoUri(videoList[index].uri);
    }
  };

  useEffect(() => {
    if (showVolume === true) {
      const timeout = setTimeout(() => {
        setShowVolume(false);
      }, 1000);
      () => {
        return clearTimeout(timeout);
      };
    }
  }, [currentIndex, showVolume]);

  useFocusEffect(
    React.useCallback(() => {
      // On focus (do nothing or play if you want)
      return () => {
        // On unfocus (user left the screen), pause the video
        if (Platform.OS === "web" && playerRef.current) {
          playerRef.current.pause?.(); // optional chaining to avoid crash
        } else if (player?.pause) {
          try {
            player.pause();
          } catch (err) {
            // console.warn("Error pausing native player:", err);
          }
        }
      };
    }, [player, playerRef])
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Video player */}
      <View style={{ width: "100%", height: SCREEN_HEIGHT }}>
        <ContentComp
          pipEnabled={pipEnabled}
          isVisible={true}
          shouldPlay={true}
          player={player}
          playerRef={playerRef}
          setPipEnabled={setPipEnabled}
          videoUri={videoUri}
          isPlayingWeb={isPlayingWeb}
          togglePlay={togglePlay}
          currentTime={currentTime}
          duration={duration}
          handleSeek={(e: any) => handleSeek(e)}
          volume={volume}
          handleVolumeChange={(e: any) => handleVolumeChange(e)}
          setCurrentTime={setCurrentTime}
          setDuration={setDuration}
        />
      </View>

      {/* FlatList rendering placeholders */}
      <FlatList
        data={videoList}
        keyExtractor={(_, index) => index.toString()}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16} // fires onScroll at 60fps approx.
        renderItem={({ index }) => (
          <View
            ref={(ref) => {
              if (ref) {
                itemRefs.current.set(index, ref);
              } else {
                itemRefs.current.delete(index);
              }
            }}
            style={{
              height: SCREEN_HEIGHT,
              width: "100%",
              borderWidth: 2,
              borderColor: "#fff",
            }}
          >
            {showVolume ? (
              <View
                style={{
                  width: 50,
                  height: "auto",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "gray",
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {volume > 0.9
                    ? "90"
                    : volume > 0.8
                    ? "80"
                    : volume > 0.7
                    ? "70"
                    : volume > 0.6
                    ? "60"
                    : volume > 0.5
                    ? "50"
                    : volume > 0.4
                    ? "40"
                    : volume > 0.3
                    ? "30"
                    : volume > 0.2
                    ? "20"
                    : volume > 0.1
                    ? "10"
                    : "0"}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                width: 100,
                height: "auto",
                position: "absolute",
                right: 0,
                top: "30%",
                backgroundColor: "#22222288",
              }}
            >
              <LeftSideComp />
            </View>
            <Controler
              isPlaying={isPlaying}
              player={player}
              playerRef={playerRef}
              pipEnabled={pipEnabled}
              isPlayingWeb={isPlayingWeb}
              togglePlay={togglePlay}
              currentTime={currentTime}
              duration={duration}
              handleSeek={(e: any) => setCurrentTime(e)}
              volume={volume}
              handleVolumeChange={(val) => setVolume(val)}
              setCurrentTime={setCurrentTime}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
              setVolume={setVolume}
              setShowVolume={setShowVolume}
            />
          </View>
        )}
        style={{ height: SCREEN_HEIGHT, position: "absolute", width: "100%" }}
      />
    </View>
  );
};

export default Videos;
