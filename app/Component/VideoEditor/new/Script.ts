import { AppState } from "react-native";
import {
  generateThumbnailsCustomTimes,
  getVideoDurationAsync,
} from "../../ProfileComp/Script";
import { Audio } from "expo-av";
import { VideoPlayer } from "expo-video";
import { TypeGetAuduration, TypeGetThu } from "@/types/type";

export const componentDidMount = async ({
  musicPlayer,
  player,
  vUri,
  width,
  setValue,
  setThumb,
  setAppStateListener,
}: {
  musicPlayer: any;
  player: VideoPlayer;
  vUri: string;
  width: number;
  setValue: (e: any) => void;
  setThumb: (e: any) => void;
  setAppStateListener: (e: any) => void;
}) => {
  if (vUri) {
    try {
      const duration = await getVideoDurationAsync(vUri);
      const thumbWidth = 40;
      const maxThumbs = Math.floor(width / thumbWidth);
      const interval = duration / maxThumbs;
      const thumbs = [];

      for (let i = 0; i <= maxThumbs; i++) {
        const time = Math.min(i * interval, duration);
        thumbs.push(time);
      }

      generateThumbnailsCustomTimes({
        uri: vUri,
        times: thumbs,
        setThumbnails: (thumbs: any[]) => setThumb(thumbs),
      });

      setValue({
        videoUri: vUri,
        videoDuration: duration,
        startTime: 0,
        endTime: Math.min(5, duration),
      });

      const appStateListener = AppState.addEventListener("change", (state) => {
        if (state !== "active" && musicPlayer) {
          musicPlayer?.pausePlayer?.();
          musicPlayer?.pauseAsync();
        }
        player.play();
      });

      setAppStateListener(appStateListener);
    } catch (e) {
      console.log(e);
    }
  }
};

export const componentWillUnmount = async ({
  appStateListener,
}: {
  appStateListener: any;
}) => {
  appStateListener?.remove?.();
  //   clearInterval(playbackInterval); // ✅ Clear interval
};

export const checkPlaybackTime = async ({
  player,
  endTime,
  setEndState,
}: {
  player: VideoPlayer;
  endTime: number;
  setEndState: (e: boolean) => void;
}) => {
  if (!player || !endTime) return;

  try {
    const currentTime = player.currentTime;
    if (currentTime >= endTime * 1000) {
      await player.pause();
      setEndState(true);

      // Optional: Reset video to startTime or perform another action
      // await this.props.player.setPositionAsync(this.state.startTime * 1000);
    }
  } catch (e) {
    console.warn("Error checking playback time:", e);
  }
};
export const playTrimmedAudio = async ({
  musicPlayer,
  startTime,
  endTime,
}: {
  musicPlayer: Audio.Sound;
  startTime: number;
  endTime: number;
}) => {
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

export const stopPlayTrim = async ({
  musicUri,
  musicPlayer,
}: {
  musicUri: string;
  musicPlayer: Audio.Sound;
}) => {
  if (!musicPlayer) return;
  try {
    if (musicUri) {
      await musicPlayer.stopAsync();
      await musicPlayer.unloadAsync();
    }
  } catch (e) {
    console.warn("Stop play error:", e);
  }
};

export const playTr = async ({
  musicUri,
  musicStartTime,
  stopPlayTrim,
  player,
  setmusicPlayer,
}: {
  musicUri: string;
  musicStartTime: number;
  stopPlayTrim: () => void;
  player: VideoPlayer;
  setmusicPlayer: (e: Audio.Sound) => void;
}) => {
  try {
    await stopPlayTrim();
    if (musicUri) {
      const newPlayer = new Audio.Sound();
      await newPlayer.loadAsync(
        { uri: musicUri },
        { shouldPlay: true, positionMillis: musicStartTime }
      );
      await newPlayer.playAsync();
      player.play();
      setmusicPlayer(newPlayer);
    }
  } catch (e) {
    console.warn("playTr error:", e);
  }
};

export const autoPlay = async ({
  player,
  musicPlayer,
  endTime,
  musicUri,
  setEndState,
  playPlayer,
  musicStartTime,
  setmusicPlayer,
}: {
  player: VideoPlayer;
  musicPlayer: Audio.Sound;
  endTime: number;
  musicUri: string;
  setEndState: (e: boolean) => void;
  playPlayer: () => void;
  musicStartTime: number;
  setmusicPlayer: (e: Audio.Sound) => void;
}) => {
  if (!musicPlayer) return;

  try {
    await musicPlayer.pauseAsync();
    //   this.player.currentTime = this.state.startTime;
    player.currentTime = endTime;
    if (musicUri) {
      playTr({
        player: player,
        musicStartTime: musicStartTime,
        setmusicPlayer: setmusicPlayer,
        musicUri: musicUri,
        stopPlayTrim: () =>
          stopPlayTrim({ musicUri: musicUri, musicPlayer: musicPlayer }),
      });
    } else {
      await playPlayer();
    }

    setEndState(false);
  } catch (error) {
    console.error("Playback error:", error);
  }
};

export const PlayPlayer = async ({ player }: { player: VideoPlayer }) => {
  try {
    player.play();
  } catch (e) {
    console.log("error", e);
  }
};

export const PausePlyer = async ({ player }: { player: VideoPlayer }) => {
  try {
    player.pause();
  } catch (e) {
    console.log("error", e);
  }
};

export const getThumbnails = async ({
  setVideoUri,
  setEndTime,
  setStartTime,
  setThumbnails,
  setVideoDuration,
  vUri,
  width,
  thumbWidth,
}: TypeGetThu) => {
  getVideoDurationAsync(vUri)
    .then((duration) => {
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

      setVideoUri(vUri);
    })
    .catch(console.error);
};

export const GetAudioDuration = async ({
  musicUri,
  setMaxAudioDuration,
}: TypeGetAuduration) => {
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
};
