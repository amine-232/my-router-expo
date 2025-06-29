import { View, AppState, Animated, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ClassVideoEidtor from "./ClassVideoEidtor";
import { SourceLoadEventPayload, useVideoPlayer } from "expo-video";
import { Audio } from "expo-av";
import VideoplayerWrapper from "../PlayerV";
import { TypeOverlays } from "@/types/type";
import {
  generateThumbnailsCustomTimes,
  getVideoDurationAsync,
} from "../../ProfileComp/Script";
import { useEvent } from "expo";

type TypeOverLAys = { id: string; type: "text" | "emoji"; content: string };

type Props = {
  vUri: any;
  setVUri?: (e: any) => void;
};

const NewVideoEditor = ({ vUri, setVUri }: Props) => {
  const [videoUri, setVideoUri] = useState<any>(null);

  const { width, height } = useWindowDimensions();

  const [thumbnails, setThumbnails] = useState<any[]>([]);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
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
  const [endState, setEndState] = useState<boolean>(false);
  const [overlays, setOverlays] = useState<TypeOverlays[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const videoRef = useRef<any>(null);

  const sliderWidth = useRef(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const startHandle = useRef(new Animated.Value(0)).current;
  const endHandle = useRef(new Animated.Value(100)).current;
  // const { uploadAndProcess } = useContext(AuthContext);
  const trimDuration = Math.max(0, endTime - startTime);
  const [maxAudioDuration, setMaxAudioDuration] = useState<number>(0);

  const player = useVideoPlayer(videoUri, (playerInstance) => {
    playerInstance.muted = false;
    playerInstance.volume = videoVolume;
  });

  // const [duration, setDuration] = useState<number | null>(null);

  const sourceLoadEvent = useEvent(player, "sourceLoad");

  const duration = sourceLoadEvent?.duration;

  // Create and manage the video player properly

  // const interval = setInterval(() => {
  //   if (player.currentTime >= endTime) {
  //     setEndState(true);
  //   }
  // }, 500);

  // const { state } = useEvent(player, "sourceLoad", (e) => {});

  useEffect(() => {
    if (vUri && player) {
      if (player.duration) {
        // setDuration(Math.min(5, player.duration));
        player.play();
      }

      if (duration !== 0 && duration) {
        setStartTime(0);
        // setEndTime(Math.min(5, duration));

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
        setVideoUri(vUri);
      }
    }
  }, [vUri, endTime, videoDuration, duration]);

  console.log(
    "player.duration",
    duration ? Math.min(5, duration) : "not pickerd"
  );

  const thumbWidth = 40;
  useEffect(() => {
    if (musicUri) {
      getVideoDurationAsync(musicUri)
        .then(async (duration) => {
          if (duration) {
            console.log("audio", duration);
            setMaxAudioDuration(duration);
          }
        })
        .catch((e) => {
          console.log("error", e);
        });

      if (maxAudioDuration < 0 && endTime > maxAudioDuration) {
        // setEndTime(maxAudioDuration);
      }
    }
  }, [musicUri]);

  useEffect(() => {
    if (player.currentTime >= endTime) {
      console.log("video reach end");
      setEndState(true);
    }
  }, [
    startTime,
    endState,
    musicUri,
    isTrimAudio,
    isTrim,
    isAudio,
    isMusic,
    isTrimAudio,
    endState,
    visible,
    endTime,
    endState,
  ]);

  console.log(duration);

  const playTrimmedAudio = async () => {
    if (!musicPlayer) return;
    try {
      await musicPlayer.stopAsync();
      await musicPlayer.setPositionAsync(startTime * 1000);
      await musicPlayer.playAsync();

      setTimeout(async () => {
        await musicPlayer.stopAsync();
      }, (endTime - startTime) * 1000);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        try {
          player?.pause?.();
          musicPlayer?.pauseAsync?.();
        } catch (e) {
          console.warn("Pause error on app blur:", e);
        }
      }
    });

    return () => subscription.remove();
  }, [musicPlayer]);

  useEffect(() => {
    if (musicPlayer) {
      musicPlayer.setVolumeAsync(musicVolume).catch(() => {});
    }
  }, [videoVolume, musicVolume, musicPlayer, endTime]);

  useEffect(() => {
    if (player && maxAudioDuration > 0) {
      player.volume = videoVolume;
      if (endState) {
        autoPlay(); // fixed typo: autPlay → autoPlay
      }
    }
  }, [startTime, endState, musicUri, isTrimAudio]);

  const autoPlay = async () => {
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
        await musicPlayer.unloadAsync().then(() => player);
      }
    } catch (e) {
      console.log("Music play error:", e);
    }
  };

  const playTr = async () => {
    try {
      StopPlayTrim();
      if (musicUri) {
        // Create a new player
        const newPlayer = new Audio.Sound();
        await newPlayer.loadAsync(
          { uri: musicUri },
          { shouldPlay: true, positionMillis: musicStartTime }
        );
        await newPlayer.playAsync().then(() => player.play());

        setMusicPlayer(newPlayer); // update your state
      }
    } catch (e) {
      console.log("Music play error:", e);
    }
  };

  const PlayPlyer = async () => {
    try {
      player.play();
    } catch (e) {
      console.log("error", e);
    }
  };

  const PausePlyer = async () => {
    try {
      player.pause();
    } catch (e) {
      console.log("error", e);
    }
  };

  const setBooleanState = (e: any) => {
    console.log(e);
    if (e && Object.values(e) && Object.keys(e)[0] === "isTrim") {
      if (!isTrim) {
        setIsTrim(true);
      } else {
        setIsTrim(false);
      }
    }
    if (Object.keys(e)[0] === "isAudio") {
      if (!isAudio) {
        setIsAudio(true);
      } else {
        setIsAudio(false);
      }
    }

    if (Object.keys(e)[0] === "isMusic") {
      if (!isMusic) {
        setIsMusic(true);
      } else {
        setIsMusic(false);
      }
    }
    if (Object.keys(e)[0] === "isTrimAudio") {
      if (!isTrimAudio) {
        setIsTrimAudio(true);
      } else {
        setIsTrim(false);
        setIsTrimAudio(false);
      }
    }
    if (Object.keys(e)[0] === "visible") {
      if (!visible) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    if (Object.keys(e)[0] === "endState") {
      if (!endState) {
        setEndState(true);
      } else {
        setEndState(false);
      }
    }
  };

  const setNumberState = (e: any) => {
    if (e && Object.values(e) && Object.keys(e)[0] === "videoVolume") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "musicVolume") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "musicStartTime") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "musicEndTime") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "videoDuration") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "maxAudioDuration") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "trimDuration") {
      const value = Object.values(e) as any;
      setIsTrim(value);
    }
  };

  const setStringState = (e: any) => {
    if (e && Object.values(e) && Object.keys(e)[0] === "videoUri") {
      const value = Object.values(e) as any;
      setVideoUri(value);
    }
    if (e && Object.values(e) && Object.keys(e)[0] === "musicUri") {
      const value = Object.values(e) as any;
      setMusicUri(value);
    }
  };

  return (
    <View style={{ width, height }}>
      {videoUri && player ? (
        <View style={{ width: width, height: height }}>
          <VideoplayerWrapper videoRef={videoRef} player={player} />
        </View>
      ) : null}

      <View
        style={{
          width,
          height,
          position: "absolute",
          top: 0,
          zIndex: 4,
        }}
      >
        <ClassVideoEidtor
          stringState={{ musicUri: musicUri }}
          setStringState={setStringState}
          numberState={{
            videoVolume: videoVolume,
            musicVolume: musicVolume,
            musicStartTime: musicStartTime,
            musicEndTime: musicEndTime,
            videoDuration: videoDuration,
            maxAudioDuration: maxAudioDuration,
            trimDuration: trimDuration,
          }}
          setMusicPlayer={setMusicPlayer}
          setNumberState={(e) => {
            setNumberState(e);
          }}
          booleanState={{
            isTrim: isTrim,
            isAudio: isAudio,
            isMusic: isMusic,
            isTrimAudio: isTrimAudio,
            visible: visible,
            endState: endState,
          }}
          setBooleanState={setBooleanState}
          overlays={overlays}
          setOverlays={setOverlays}
          videoRef={videoRef}
          startHandle={startHandle}
          endHandle={endHandle}
          sliderWidth={sliderWidth}
          player={player}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          thumbnails={thumbnails}
          setMusicUri={setMusicUri}
          musicPlayer={musicPlayer}
          setVideoVolume={setVideoVolume}
        />
      </View>
    </View>
  );
};

export default NewVideoEditor;
