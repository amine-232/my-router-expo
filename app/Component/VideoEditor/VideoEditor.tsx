import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  useWindowDimensions,
  Animated,
  Pressable,
  Image,
  ImageSourcePropType,
  AppState,
} from "react-native";

import { useVideoPlayer, VideoPlayer, VideoView } from "expo-video";
import { Audio } from "expo-av";
import AudioTrimmer from "./AudioTrimmor/AudoiTrimor";
import { AuthContext } from "@/Context/ctx";
import DownArrow from "@/assets/images/downArrow.png";
import Trimmor from "./Trimmor/Trimmor";
import VolumeSlider from "./VolumeSlider";
import AnimatedView from "./AnimatedView";
import DraggableResizable from "./DraggableResizable";
import EmojiPicker from "./EmojiPicker";
import {
  addEmoji,
  addText,
  generateThumbnails,
  generateThumbnailsCustomTimes,
  getVideoDurationAsync,
  pickMusic,
  playTrimmedSegment,
} from "../ProfileComp/Script";
import SideBar from "./SideBar";
import VideoPlayerWrapper from "./PlayerV";
import { TypeOverlays } from "@/types/type";

export default function ExpoVideoTrimmer({
  vUri,
  setVUri,
}: {
  vUri: any;
  setVUri?: (e: any) => void;
}) {
  const [thumbnails, setThumbnails] = useState<any[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [videoVolume, setVideoVolume] = useState<number>(1.0);
  const [musicUri, setMusicUri] = useState<string | null>(null);
  const [musicPlayer, setMusicPlayer] = useState<Audio.Sound | null>(null);
  const [musicVolume, setMusicVolume] = useState(1.0);
  const [musicStartTime, setMusicStartTime] = useState(0);
  const [musicEndTime, setMusicEndTime] = useState(5);
  const [isTrim, setIsTrim] = useState<boolean>(false);
  const [isAudio, setIsAudio] = useState<boolean>(false);
  const [isMusic, setIsMusic] = useState<boolean>(false);
  const [isTrimAudio, setIsTrimAudio] = useState<boolean>(false);
  const [overlays, setOverlays] = useState<TypeOverlays[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const videoRef = useRef<any>(null);
  const sliderWidth = useRef(0);

  const [endState, setEndState] = useState<boolean>(false);

  const [videoDuration, setVideoDuration] = useState<number>(0);

  const startHandle = useRef(new Animated.Value(0)).current;
  const endHandle = useRef(new Animated.Value(100)).current;
  const { uploadAndProcess } = useContext(AuthContext);
  const trimDuration = Math.max(0, endTime - startTime);
  const [maxAudioDuration, setMaxAudioDuration] = useState<number>(0);

  const thumbWidth = 40;

  const player = useVideoPlayer(vUri, (playerInstance) => {
    playerInstance.muted = false;
    playerInstance.volume = videoVolume;
    playerInstance.play();
  });

  useEffect(() => {
    if (vUri) {
      getVideoDurationAsync(vUri)
        .then((duration) => {
          if (duration < endTime) {
            setEndTime(duration);
          }
          setVideoDuration(duration);
          setStartTime(0);
          setEndTime(Math.min(5, duration));

          // Calculate number of thumbnails to generate based on screen width
          const maxThumbs = Math.floor(width / thumbWidth);

          // Calculate interval between thumbnails
          const interval = duration / maxThumbs;

          // Generate thumbnails spaced by interval
          const thumbs: any[] = [];
          for (let i = 0; i <= maxThumbs; i++) {
            const time = Math.min(i * interval, duration);
            thumbs.push(time);
          }

          // Call your generateThumbnails function with custom times
          generateThumbnailsCustomTimes({
            uri: vUri,
            times: thumbs,
            setThumbnails: setThumbnails,
          });
        })
        .catch(console.log);
    }
  }, [vUri]);

  useEffect(() => {
    if (musicUri) {
      getVideoDurationAsync(musicUri)
        .then(async (duration) => {
          if (duration) {
            console.log("audio", duration, musicStartTime);

            setMaxAudioDuration(duration);
          }
        })

        .catch((e) => {
          console.log("error", e);
        });
    }
  }, [musicUri, musicStartTime]);

  // Create and manage the video player properly

  const playTrimmedAudio = async () => {
    if (!musicPlayer) return;
    try {
      await musicPlayer.stopAsync();
      await musicPlayer
        .setPositionAsync(musicStartTime)
        .then(async () => await musicPlayer.playAsync());

      // setTimeout(async () => {
      //   await musicPlayer.stopAsync();
      // },
      //  (endTime - startTime) * 1000);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        if (player) {
          player.pause();
        }
        if (musicPlayer) {
          musicPlayer.stopAsync();
          musicPlayer.unloadAsync();
        }
      }
    });

    return () => subscription.remove();
  }, [musicPlayer]);
  useEffect(() => {
    if (musicPlayer) {
      musicPlayer.setVolumeAsync(musicVolume).catch(() => {});
    }
  }, [videoVolume, musicVolume, musicPlayer, endTime, player]);

  useEffect(() => {
    if (player) {
      player.volume = videoVolume;

      if (endState) {
        autoPlay(); // fixed typo: autPlay → autoPlay
      }

      const interval = setInterval(() => {
        const playerTime = player.currentTime.toFixed(3);

        if (Number(playerTime) >= endTime) {
          setEndState(true);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [startTime, endState, musicUri, musicPlayer, isTrimAudio]);

  const autoPlay = async () => {
    if (!player) return;
    try {
      PausePlyer();
      player.currentTime = startTime;

      if (musicUri && musicPlayer) {
        playTr();
      } else {
        PlayPlyer();
      }

      setEndState(false);
    } catch (error) {
      console.log("Playback error:", error);
    }
  };
  const StopPlayTrim = async () => {
    try {
      if (musicPlayer && musicUri) {
        await musicPlayer.stopAsync();
        await musicPlayer.unloadAsync();
        // Create a new player
        await musicPlayer.loadAsync(
          { uri: musicUri },
          { shouldPlay: true, positionMillis: musicStartTime * 1000 }
        );
      }
    } catch (e) {
      console.log("Music play error:", e);
    }
  };

  const playTr = async () => {
    try {
      StopPlayTrim();
      if (musicUri && musicPlayer) {
        await musicPlayer.playAsync().then(() => player.play());
      }
    } catch (e) {
      console.log("Music play error:", e);
    }
  };

  const { width, height } = useWindowDimensions();

  const PlayPlyer = async () => {
    if (!player) return;
    player.play();
  };

  const PausePlyer = async () => {
    if (!player) return;

    try {
      player.pause();
    } catch (e) {
      console.log("error", e);
    }
  };
  return (
    <View style={styles.container}>
      {vUri && player ? (
        <VideoPlayerWrapper videoRef={videoRef} player={player} />
      ) : null}
      <View
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          alignSelf: "center",
          zIndex: 4,
          flexDirection: "column",
        }}
      >
        {/* <Button
          title="Play Trimmed Segment"
          onPress={() =>
            playTrimmedSegment({
              videoRef: videoRef,
              musicPlayer: musicPlayer,
              startTime: startTime,
            })
          }
        /> */}
        <View
          style={{
            width: width,
            height: "auto",
            flexDirection: "row",
            marginTop: 130,
            justifyContent: "space-between",
          }}
        >
          <SideBar
            setIsTrim={setIsTrim}
            addText={() => addText(setOverlays)}
            addEmoji={() => setVisible(true)}
            setIsTrimAudio={setIsTrimAudio}
            pickMusic={() =>
              pickMusic({
                setMusicPlayer: setMusicPlayer,
                setMusicUri: setMusicUri,
              })
            }
          />
        </View>

        <EmojiPicker
          visible={visible}
          onClose={() => setVisible(false)}
          onAddEmoji={(e: any) =>
            addEmoji({ emoji: e, setOverlays: setOverlays })
          }
        />

        <View
          style={{
            width: "100%",
            height: "auto",
            marginBottom: 0,
            marginTop: "auto",
            backgroundColor: "black",
            paddingVertical: 10,
            position: "absolute",
            bottom: 0,
          }}
        >
          {isTrimAudio || isTrim ? (
            <View
              style={{ width: width, height: "auto", flexDirection: "column" }}
            >
              <Pressable
                style={{ width: width, height: "auto", padding: 5 }}
                onPress={() => {
                  setIsTrim(false);
                  setIsTrimAudio(false);
                }}
              >
                <Image
                  source={DownArrow as ImageSourcePropType}
                  style={{ width: 80, height: 20, marginHorizontal: "auto" }}
                  resizeMode={"stretch"}
                  tintColor={"#fff"}
                />
              </Pressable>

              {isTrimAudio ? (
                <AudioTrimmer
                  trimDuration={trimDuration}
                  musicUri={musicUri}
                  musicPlayer={musicPlayer}
                  setMusicPlayer={setMusicPlayer}
                  videoStartTime={startTime}
                  musicVolume={musicVolume}
                  setMusicVolume={setMusicVolume}
                  setMusicUri={setMusicUri}
                  musicStartTime={musicStartTime}
                  setMusicStartTime={setMusicStartTime}
                  musicEndTime={musicEndTime}
                  videoEndTime={endTime}
                  setMusicEndTime={setMusicEndTime}
                  PlayPlyer={() => PlayPlyer()}
                  playTrimmedAudio={() => playTrimmedAudio()}
                  autoPlay={() => autoPlay()}
                  maxAudioDuration={maxAudioDuration}
                />
              ) : null}
              {isTrim ? (
                <Trimmor
                  player={player}
                  setValue={(e: number) => {
                    if (!player) return;
                    setVideoVolume(e);
                    player.volume = e;
                  }}
                  videoVolume={videoVolume}
                  sliderWidth={sliderWidth}
                  endTime={endTime}
                  startTime={startTime}
                  maxDuration={videoDuration}
                  startHandle={startHandle}
                  endHandle={endHandle}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  thumbnails={thumbnails}
                />
              ) : null}
            </View>
          ) : null}
        </View>

        <DraggableResizable overlays={overlays} />
       <Button
          title="export"
          onPress={async () => {
            await uploadAndProcess({
              videoUri: vUri,
              musicUri: musicUri,
              startTime: startTime,
              endTime: endTime,
              musicStartTime: musicStartTime,
              musicEndTime: musicEndTime,
              musicVolume: musicVolume,
            });
          }}
        />
        {/* <Button title="Add Text" onPress={(e) => addText(setOverlays)} />
        <Button title="Add Emoji" onPress={() => setVisible(true)} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    zIndex: 0,
  },
});
