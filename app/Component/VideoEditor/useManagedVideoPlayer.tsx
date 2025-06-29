import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "expo-video";

// TS type is optional, but adds safety
type ManagedPlayer = {
  player: VideoPlayer | null;
  destroyPlayer: () => Promise<void>;
  resetPlayer: () => void;
};

export const useManagedVideoPlayer = (useVideoPlayer: any): ManagedPlayer => {
  const initialPlayer = useVideoPlayer(); // ✅ only call hook here
  const [player, setPlayer] = useState<VideoPlayer | null>(initialPlayer);

  const destroyPlayer = async () => {
    if (player) {
      try {
        await player.replaceAsync(null);

        setPlayer(null); // mark player as destroyed
      } catch (e) {
        console.log("Error unloading player:", e);
      }
    }
  };

  const resetPlayer = () => {
    const newPlayer = useVideoPlayer();
    setPlayer(newPlayer);
  };


  return {
    player,
    destroyPlayer,
    resetPlayer,
  };
};
