import { View } from "react-native";
import React from "react";
import TrimIcon from "@/assets/images/trim.png";
import TextICon from "@/assets/images/textIcon.png";
import EmojisIcon from "@/assets/images/emojis.png";
import MusicEditIcon from "@/assets/images/musicedit.png";
import AddMusicIcon from "@/assets/images/addIcon.png";
import IconBotton from "../IconBotton";
const SideBar = ({
  setIsTrim,
  addText,
  addEmoji,
  setIsTrimAudio,
  pickMusic,
}: {
  setIsTrim: (e: any) => void;
  addText: () => void;
  addEmoji: () => void;
  setIsTrimAudio: (e: any) => void;
  pickMusic: () => void;
}) => {
  const BtnMap = [
    {
      name: "add Emoji",
      icon: EmojisIcon,
      color: undefined,
      onPress: () => addEmoji(),
    },
    {
      name: "Trimmor",
      icon: TrimIcon,
      color: "#fff",

      onPress: () => setIsTrim((prev: boolean) => !prev),
    },
    {
      name: "add Text",
      icon: TextICon,
      color: "#fff",
      onPress: () => addText(),
    },

    {
      name: "Audio Trimmor",
      icon: MusicEditIcon,
      color: "#fff",
      onPress: () => setIsTrimAudio((prev: boolean) => !prev),
    },
    {
      name: "Add Music",
      icon: AddMusicIcon,
      color: "#fff",
      onPress: () => pickMusic(),
    },
  ];
  return (
    <View
      style={{
        width: 40,
        height: "auto",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: 10,
      }}
    >
      {BtnMap.map((btn, index) => {
        return (
          <View
            style={{
              width: "auto",
              height: "auto",
              marginVertical: 10,
              marginHorizontal: "auto",
            }}
            key={index}
          >
            <IconBotton
              icon={btn.icon}
              size={40}
              color={btn.color}
              onPress={btn.onPress}
            />
          </View>
        );
      })}
    </View>
  );
};

export default SideBar;
