import PlayIcon from "@/assets/images/play.png";
import PauseIcon from "@/assets/images/pause.png";
import RewindIcon from "@/assets/images/backsec.png";
import ForwardIcon from "@/assets/images/secondforward.png";
import FullscreenIcon from "@/assets/images/fullscreen.png";
import PictureInPictureIcon from "@/assets/images/pip.png";
import VolumeUpIcon from "@/assets/images/VolumeUpIcon.png";
import VolumeDownIcon from "@/assets/images/VolumeDownIcon.png";
import React from "react";
import { View, Platform, Alert, Pressable, Image } from "react-native";

const IconSize = Platform.select({
  web: { width: 40, height: 40 },
  android: { width: 30, height: 30 },
  ios: { width: 30, height: 30 },
});

const ControlButton = ({
  icon,
  onPress,
}: {
  icon: any;
  onPress: () => void;
}) => {
  return (
    <Pressable style={{ padding: 10 }} onPress={onPress}>
      <Image
        source={icon}
        style={IconSize}
        resizeMode="contain"
        tintColor="#fff"
      />
    </Pressable>
  );
};

const ControlerAndroid = ({
  player,
  playerRef,
  pipEnabled,
  isPlaying,
  isPlayingWeb,
  togglePlay,
  currentTime,
  volume,
  handleVolumeChange,
  isFullscreen,
  setIsFullscreen,
  setVolume,
  setShowVolume,
}: {
  isFullscreen: boolean;
  setIsFullscreen: (e: boolean) => void;
  isPlayingWeb: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  handleSeek?: (value: number) => void;
  volume: number;
  handleVolumeChange: (value: number) => void;
  setCurrentTime: (e: any) => void;
  player: any;
  playerRef: any;
  pipEnabled: boolean;
  isPlaying: boolean;
  setVolume: (e: number) => void;
  setShowVolume: (e: boolean) => void;
}) => {
  const handlePlayPause = () => {
    if (!player) return;
    try {
      player.playing ? player.pause() : player.play();
    } catch (e) {
      console.warn("Failed to toggle play/pause:", e);
    }
  };

  const handleRewind = () => {
    if (!player) return;
    try {
      player.currentTime = Math.max(0, player.currentTime - 10);
    } catch (e) {
      console.warn("Failed to rewind:", e);
    }
  };

  const handleForward = () => {
    if (!player) return;
    try {
      player.currentTime += 10;
    } catch (e) {
      console.warn("Failed to forward:", e);
    }
  };

  const handleVolumeUp = () => {
    if (!player) return;
    try {
      player.volume = Math.min(1, player.volume + 0.1);
      if (volume < 0.9) {
        setVolume(volume + 0.1);
        setShowVolume(true);
      }
    } catch (e) {
      // console.warn("Failed to increase volume:", e);
    }
  };

  const handleVolumeDown = () => {
    if (!player) return;
    try {
      player.volume = Math.max(0, player.volume - 0.1);
      if (volume > 0.1) {
        setVolume(volume - 0.1);
        setShowVolume(true);
      }
    } catch (e) {
      // console.warn("Failed to decrease volume:", e);
    }
  };

  const handleFullscreen = () => {
    if (pipEnabled) {
      Alert.alert(
        "Exit PiP first",
        "Please exit Picture-in-Picture mode before entering fullscreen."
      );
      return;
    }
    try {
      playerRef.current?.enterFullscreen?.();
    } catch (e) {
      // console.warn("Failed to enter fullscreen:", e);
    }
  };

  const handlePiP = () => {
    if (!pipEnabled) {
      try {
        playerRef.current?.startPictureInPicture?.();
      } catch (e) {
        // console.warn("Failed to start PiP:", e);
      }
    } else {
      try {
        playerRef.current?.stopPictureInPicture?.();
      } catch (e) {
        // console.warn("Failed to stop PiP:", e);
      }
    }
  };

  const handleTogglePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (playerRef.current) {
        await playerRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP error:", error);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ControlButton
        icon={RewindIcon}
        onPress={() => {
          if (Platform.OS === "web") {
            const video = playerRef.current;
            if (!video) return;
            video.currentTime = currentTime - 10;
          } else {
            handleRewind();
          }
        }}
      />
      <ControlButton
        icon={
          Platform.OS === "web"
            ? isPlayingWeb
              ? PauseIcon
              : PlayIcon
            : isPlaying
            ? PauseIcon
            : PlayIcon
        }
        onPress={() => {
          if (Platform.OS === "web") {
            togglePlay();
          } else {
            handlePlayPause();
          }
        }}
      />
      <ControlButton
        icon={ForwardIcon}
        onPress={() => {
          if (Platform.OS === "web") {
            const video = playerRef.current;
            if (!video) return;
            video.currentTime = currentTime + 10;
          } else {
            handleForward();
          }
        }}
      />
      <ControlButton
        icon={VolumeDownIcon}
        onPress={() => {
          if (Platform.OS === "web") {
            if (volume >= 0.2) {
              handleVolumeChange(volume - 0.1);
            }
          } else {
            handleVolumeDown();
          }
        }}
      />
      <ControlButton
        icon={VolumeUpIcon}
        onPress={() => {
          if (Platform.OS === "web") {
            if (volume < 0.9) {
              handleVolumeChange(volume + 0.1);
            }
          } else {
            handleVolumeUp();
          }
        }}
      />
      <ControlButton
        icon={FullscreenIcon}
        onPress={() => {
          if (Platform.OS === "web") {
            const video = playerRef.current;
            if (!video) return;

            if (!document.fullscreenElement) {
              video.requestFullscreen().then(() => setIsFullscreen(true));
            } else {
              document.exitFullscreen().then(() => setIsFullscreen(false));
            }
          } else {
            handleFullscreen();
          }
        }}
      />
      <ControlButton
        icon={PictureInPictureIcon}
        onPress={() => {
          if (Platform.OS === "web") {
            handleTogglePiP();
          } else {
            handlePiP();
          }
        }}
      />
    </View>
  );
};

const Controler = ({
  player,
  playerRef,
  pipEnabled,
  isPlaying,
  isPlayingWeb,
  togglePlay,
  currentTime,
  duration,
  volume,
  handleVolumeChange,
  setCurrentTime,
  isFullscreen,
  setIsFullscreen,
  setVolume,
  setShowVolume,
}: {
  isFullscreen: boolean;
  setIsFullscreen: (e: boolean) => void;
  player?: any;
  playerRef?: any;
  pipEnabled: boolean;
  isPlaying?: any;
  isPlayingWeb: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  handleSeek?: (value: number) => void;
  volume: number;
  handleVolumeChange: (value: number) => void;
  setCurrentTime: (e: any) => void;
  setVolume: (e: number) => void;
  setShowVolume: (e: boolean) => void;
}) => {
  return (
    <ControlerAndroid
      player={player}
      playerRef={playerRef}
      pipEnabled={pipEnabled}
      isPlaying={isPlaying}
      togglePlay={() => togglePlay()}
      currentTime={currentTime}
      duration={duration}
      handleSeek={(val) => setCurrentTime(val)}
      volume={volume}
      handleVolumeChange={(val: number) => handleVolumeChange(val)}
      isPlayingWeb={isPlayingWeb}
      setCurrentTime={setCurrentTime}
      isFullscreen={isFullscreen}
      setIsFullscreen={setIsFullscreen}
      setVolume={setVolume}
      setShowVolume={setShowVolume}
    />
  );
};

export default Controler;
