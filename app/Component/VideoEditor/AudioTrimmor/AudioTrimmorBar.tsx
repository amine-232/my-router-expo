import { View, Text } from "react-native";
import React from "react";
import IconBotton from "../../IconBotton";
import PlayIcon from "@/assets/images/play.png";
import PauseIcon from "@/assets/images/pause.png";
import MixerIcon from "@/assets/images/mixer.png";
import AddMusic from "@/assets/images/addMusic.png";

interface Props {
  isPlay: boolean;
  isShowVol: boolean;
  PlayHnadler: () => void;
  pickAudio: () => void;
  setIsShowVol: (e: boolean) => void;
}

const AudioTrimmorBar = ({
  isPlay,
  isShowVol,
  PlayHnadler,
  pickAudio,
  setIsShowVol,
}: Props) => {
  const barTooBtnMap = [
    {
      name: "play",
      onPress: () => PlayHnadler(),

      icon: isPlay ? PlayIcon : PauseIcon,
    },
    { name: "MusicPicker", onPress: () => pickAudio(), icon: AddMusic },
    {
      name: "soundContral",
      onPress: () => {
        if (!isShowVol) {
          setIsShowVol(true);
        } else {
          setIsShowVol(false);
        }
      },
      icon: MixerIcon,
    },
  ];
  return (
    <View style={{ width: "100%", height: "auto", flexDirection: "row" }}>
      {barTooBtnMap.map((brtn, index) => {
        return (
          <View
            style={{
              width: "auto",
              height: "auto",
              marginHorizontal: 10,
              marginVertical: 5,
            }}
            key={index}
          >
            <IconBotton
              icon={brtn.icon}
              size={25}
              onPress={brtn.onPress}
              color={"#fff"}
            />
          </View>
        );
      })}
    </View>
  );
};

export default AudioTrimmorBar;
