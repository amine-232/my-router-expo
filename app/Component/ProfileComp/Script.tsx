import * as DocumentPicker from "expo-document-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Audio } from "expo-av";
import React from "react";
import * as FileSystem from "expo-file-system";

export async function getVideoDurationAsync(uri: string): Promise<number> {
  try {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false }
    );

    const state = status as any 
    if (state.durationMillis != null) {
      await sound.unloadAsync();  // Clean up
      return state.durationMillis / 1000; // duration in seconds
    } else {
      await sound.unloadAsync();
      throw new Error('Could not get video duration');
    }
  } catch (e) {
    throw e;
  }
}



type TypeOverLAys = { id: string; type: "text" | "emoji"; content: string };

export const addText = (setOverlays: (e: any) => void) =>
  setOverlays((prev: any) => [
    ...prev,
    { id: String(new Date().getTime()), type: "text", content: "New text" },
  ]);

export const addEmoji = ({
  emoji,
  setOverlays,
}: {
  emoji: string;
  setOverlays: React.Dispatch<React.SetStateAction<TypeOverLAys[]>>;
}) => {
  setOverlays((prev: any[]) => [
    ...prev,
    { id: String(Date.now()), type: "emoji", content: emoji } as any,
  ]);
};

export const pickVideo = async ({
  setVideoUri,
  setStartTime,
  setEndTime,
  maxDuration,
  setThumbnails,
}: {
  setVideoUri: (e: any) => void;
  setStartTime: (e: any) => void;
  setEndTime: (e: any) => void;
  maxDuration: number;
  setThumbnails: (e: any) => any;
}) => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "video/*",
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    setVideoUri(uri);
    setStartTime(0);
    setEndTime(5);
    generateThumbnails({
      uri: uri,
      maxDuration: maxDuration,
      setThumbnails: setThumbnails,
    });
  }
};
export const generateThumbnailsCustomTimes = async ({
  uri,
  times,
  setThumbnails,
}: {
  uri: string;
  times: number[];
  setThumbnails: (e: any) => any;
}) => {
  const thumbs: any[] = [];

  for (const time of times) {
    try {
      const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(uri, {
        time: Math.floor(time * 1000), // convert seconds to ms
      });
      thumbs.push({ time, uri: thumbUri });
    } catch {
      // fail silently or handle errors
    }
  }

  setThumbnails(thumbs);
};


export const generateThumbnails = async ({
  uri,
  maxDuration,
  setThumbnails,
}: {
  uri: string;
  maxDuration: number;
  setThumbnails: (e: any) => any;
}) => {
  const interval = 2;
  const thumbs: any[] = [];

  for (let time = 0; time <= maxDuration; time += interval) {
    try {
      const { uri: thumbUri } = await VideoThumbnails.getThumbnailAsync(uri, {
        time: time * 1000,
      });
      thumbs.push({ time, uri: thumbUri });
    } catch {
      break;
    }
  }

  setThumbnails(thumbs);
};

export const playTrimmedSegment = async ({
  videoRef,
  musicPlayer,
  startTime,
}: {
  videoRef: any;
  musicPlayer: any;
  startTime: number;
}) => {
  if (!videoRef.current) return;
  try {
    await videoRef.current.setPositionAsync(startTime * 1000);
    await videoRef.current.playAsync();

    if (musicPlayer) {
      await musicPlayer.setPositionAsync(startTime * 1000);
      await musicPlayer.playAsync();
    }
  } catch (e) {
    console.warn("Play trimmed segment error:", e);
  }
};

export const pickMusic = async ({
  setMusicUri,
  setMusicPlayer,
}: {
  setMusicUri: (e: any) => void;
  setMusicPlayer: (e: any) => void;
}) => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "audio/*",
  });

  if (!result.canceled) {
    const uri = result.assets[0].uri;
    setMusicUri(uri);
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, isLooping: true, volume: 1.0 }
      );
      setMusicPlayer(sound);
    } catch (e) {
      console.warn("Failed to load music:", e);
    }
  }
};
