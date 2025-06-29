import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  PanResponder,
  useWindowDimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import VolumeSlider from "../VolumeSlider";
import IconBotton from "../../IconBotton";
import AddMusic from "@/assets/images/addMusic.png";

import { getVideoDurationAsync } from "../../ProfileComp/Script";
import AudioTrimmorBar from "./AudioTrimmorBar";
import VolumeBar from "./VolumeBar";
import TimerTimeLine from "./TimerTimeLine";
import AudioSelector from "./AudioSelector";

interface AudioTrimmerProps {
  musicUri: string | null;
  setMusicUri: (uri: string | null) => void;
  musicPlayer: Audio.Sound | null;
  setMusicPlayer: (player: Audio.Sound | null) => void;
  musicVolume: number;
  setMusicVolume: (vol: number) => void;
  videoStartTime: number;
  musicStartTime: number;
  setMusicStartTime: (t: number) => void;
  musicEndTime: number;
  setMusicEndTime: (t: number) => void;
  videoEndTime: any;
  trimDuration: number;
  PlayPlyer: () => void;
  playTrimmedAudio: () => void;
  autoPlay: () => void;
  maxAudioDuration: number
}

export default function AudioTrimmer({
  musicUri,
  setMusicUri,
  musicPlayer,
  videoEndTime,
  setMusicPlayer,
  musicVolume,
  setMusicVolume,
  videoStartTime,
  musicStartTime,
  setMusicStartTime,
  musicEndTime,
  setMusicEndTime,
  trimDuration,
  PlayPlyer,
  playTrimmedAudio,
  autoPlay,
  maxAudioDuration
}: AudioTrimmerProps) {

  const [startTime, setStartTime] = useState(musicStartTime);
  const [endTime, setEndTime] = useState(musicEndTime);

  const sliderWidth = useRef(0);
  const startHandle = useRef(new Animated.Value(0)).current;
  const endHandle = useRef(new Animated.Value(100)).current;
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(100);

  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isShowVol, setIsShowVol] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {

    setStartTime(musicStartTime);
    setEndTime(musicEndTime);

    if (sliderWidth.current && maxAudioDuration) {
      const left = (musicStartTime / maxAudioDuration) * sliderWidth.current;
      boxX.setValue(left);
    }
  }, [
    musicStartTime,
    musicEndTime,
    isPlay,
    isShowVol,
    musicStartTime,
    maxAudioDuration,
    trimDuration,
  ]);

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setMusicUri(uri);
      loadAudio(uri);
    }
  };

  const loadAudio = async (uri: string) => {
    if (musicPlayer) {
      await musicPlayer.unloadAsync();
      setMusicPlayer(null);
    }
    const { sound, status } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false, volume: musicVolume }
    );
    setMusicPlayer(sound);

    const state = status as any;

    if (state.durationMillis) {
      const durationSeconds = state.durationMillis / 1000;
      const initEnd = Math.min(5, durationSeconds);
      // setStartTime(0);
      setEndTime(initEnd);
      setMusicStartTime(initEnd - trimDuration);
      setMusicEndTime(initEnd);

      if (sliderWidth.current > 0) {
        startHandle.setValue(0);
        const endPos = (initEnd / durationSeconds) * sliderWidth.current;
        endHandle.setValue(endPos);
        setStartX(0);
        setEndX(endPos);
      }
    }
  };

  const StopTrimmedAudio = async () => {
    if (!musicPlayer) return;
    try {
      await musicPlayer.stopAsync();
    } catch (e) {
      console.warn(e);
    }
  };

  const PlayHnadler = async () => {
    autoPlay();
  };

  useEffect(() => {
    if (musicPlayer) {
      musicPlayer.setVolumeAsync(musicVolume);
    }
  }, [musicVolume, musicPlayer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlay && musicPlayer) {
      interval = setInterval(async () => {
        const status = await musicPlayer.getStatusAsync();
        if (status.isLoaded && status.positionMillis != null) {
          setCurrentTime(status.positionMillis / 1000);

          if (status.positionMillis >= endTime * 1000) {
            await musicPlayer.stopAsync();
          }
          setIsPlay(false);
        }
      }, 500); // check every 0.5 second
    }

    return () => clearInterval(interval);
  }, [isPlay, musicPlayer]);

  const boxX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {musicUri ? (
        <AudioTrimmorBar
          isPlay={isPlay}
          isShowVol={isShowVol}
          PlayHnadler={PlayHnadler}
          pickAudio={pickAudio}
          setIsShowVol={setIsShowVol}
        />
      ) : (
        <View
          style={{ width: "auto", height: "auto", marginHorizontal: "auto" }}
        >
          <IconBotton
            icon={AddMusic}
            size={50}
            onPress={() => pickAudio()}
            color={"#fff"}
          />
        </View>
      )}
      {musicUri && maxAudioDuration !== 0 && (
        <>
          {isShowVol ? (
            <VolumeBar
              musicVolume={musicVolume}
              setMusicVolume={setMusicVolume}
            />
          ) : null}
          <TimerTimeLine
            startTime={startTime}
            currentTime={currentTime}
            audioDuration={maxAudioDuration}
          />
          <AudioSelector
            setEndTime={setEndTime}
            setEndX={setEndX}
            setStartX={setStartX}
            audioDuration={maxAudioDuration}
            sliderWidth={sliderWidth}
            endTime={endTime}
            startTime={startTime}
            startHandle={startHandle}
            endHandle={endHandle}
            setMusicStartTime={setMusicStartTime}
            setMusicEndTime={setMusicEndTime}
            trimDuration={trimDuration}
            boxX={boxX}
            setStartTime={setStartTime}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  timelineStrip: {
    marginTop: 10,
    height: 60,
    position: "relative",
    backgroundColor: "yellow",
  },
  handle: {
    width: 20,
    height: 60,
    marginLeft: -10,
    backgroundColor: "blue",
    position: "absolute",
    top: 0,
    zIndex: 999,
    borderRadius: 5,
  },
  trimBox: {
    position: "absolute",
    top: 0,
    height: 60,
    backgroundColor: "rgba(0, 0, 255, 0.4)", // transparent blue
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 5,
    zIndex: 10,
  },
});
