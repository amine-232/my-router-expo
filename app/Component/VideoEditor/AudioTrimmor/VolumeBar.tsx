import { View, Text } from "react-native";
import React from "react";
import VolumeSlider from "../VolumeSlider";

interface VolumeProps {
  musicVolume: number;
  setMusicVolume: (e: number) => void;
}

const VolumeBar = ({ musicVolume, setMusicVolume }: VolumeProps) => {
  return (
    <View
      style={{
        marginVertical: 5,
        flexDirection: "row",
        width: "100%",
        height: "auto",
        backgroundColor: "black",
      }}
    >
      <View style={{ flex: 1 }}>
        <VolumeSlider
          height={40}
          color={"black"}
          horizontal={false}
          value={musicVolume}
          setValue={(val) => setMusicVolume(val)}
        />
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          marginVertical: "auto",
          padding: 5,
        }}
      >
        <Text style={{ fontWeight: "800", color: "#fff" }}>
          {(musicVolume * 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  );
};

export default VolumeBar;
