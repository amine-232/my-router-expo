import React from "react";
import { useWindowDimensions, View } from "react-native";
import AnimatedView from "./AnimatedView"; // Adjust import path accordingly
import AudioTrimmer from "./AudioTrimmor/AudoiTrimor"; // Adjust import path accordingly
import Trimmor from "./Trimmor/Trimmor"; // Adjust import path accordingly
import VolumeSlider from "./VolumeSlider"; // Adjust import path accordingly
import EmojiPicker from "./EmojiPicker"; // Adjust import path accordingly

type Props = {
  isTrimAudio: boolean;
  musicUri: string;
  musicPlayer: any;
  setMusicPlayer: (player: any) => void;
  startTime: number;
  musicVolume: number;
  setMusicVolume: (val: number) => void;
  setMusicUri: (uri: string) => void;
  musicStartTime: number;
  setMusicStartTime: (val: number) => void;
  musicEndTime: number;
  setMusicEndTime: (val: number) => void;
  isTrim: boolean;
  sliderWidth: any;
  endTime: number;
  maxDuration: number;
  startHandle: any;
  endHandle: any;
  setStartTime: (val: number) => void;
  setEndTime: (val: number) => void;
  thumbnails: any[];
  isAudio: boolean;
  videoVolume: number;
  setVideoVolume: (val: number) => void;
  player: any;
  isMusic: boolean;
  visible: boolean;
  setVisible: (val: boolean) => void;
  addEmoji: (e: any) => void;
};

export default function OverlaysManager({
  isTrimAudio,
  musicUri,
  musicPlayer,
  setMusicPlayer,
  startTime,
  musicVolume,
  setMusicVolume,
  setMusicUri,
  musicStartTime,
  setMusicStartTime,
  musicEndTime,
  setMusicEndTime,

  isTrim,
  sliderWidth,
  endTime,
  maxDuration,
  startHandle,
  endHandle,
  setStartTime,
  setEndTime,
  thumbnails,

  isAudio,
  videoVolume,
  setVideoVolume,
  player,
  isMusic,
  visible,
  setVisible,
  addEmoji,
}: Props) {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        zIndex: 100,
      }}
    >

    </View>
  );
}
