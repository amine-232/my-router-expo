import {
  View,
  Pressable,
  Image,
  Animated,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { Audio } from "expo-av";
import { addEmoji, addText, pickMusic } from "../../ProfileComp/Script";
import SideBar from "../SideBar";
import EmojiPicker from "../EmojiPicker";
import Trimmor from "../Trimmor/Trimmor";
import AudioTrimmer from "../AudioTrimmor/AudoiTrimor";
import DraggableResizable from "../DraggableResizable";
import DownArrow from "@/assets/images/downArrow.png";
import { TypeOverlays } from "@/types/type";

type Props = {
  stringState: {
    musicUri: string | null;
  };
  setStringState: (e: any) => void;
  setMusicUri: (e: any) => void;
  startTime: number;
  endTime: number;
  numberState: {
    videoVolume: number;
    musicVolume: number;
    musicStartTime: number;
    musicEndTime: number;
    videoDuration: number;
    maxAudioDuration: number;
    trimDuration: number;
  };
  musicPlayer: any;
  setMusicPlayer: (e: any) => void;
  setNumberState: (e: any) => void;
  setStartTime: (e: number) => void;
  setEndTime: (e: number) => void;
  booleanState: {
    isTrim: boolean;
    isAudio: boolean;
    isMusic: boolean;
    isTrimAudio: boolean;
    visible: boolean;
    endState: boolean;
  };
  setBooleanState: (e: any) => void;

  overlays: TypeOverlays[];
  setOverlays: React.Dispatch<React.SetStateAction<TypeOverlays[]>>;
  thumbnails: any[];
  videoRef: React.RefObject<any>;
  startHandle: Animated.Value;
  endHandle: Animated.Value;
  sliderWidth: React.RefObject<number>;
  player: any;
  setVideoVolume: (e: number) => void;
};

class ClassVideoEidtor extends React.Component<Props> {
  render() {
    const {
      stringState,
      numberState,
      booleanState,
      setStringState,
      setNumberState,
      setBooleanState,
      overlays,
      setOverlays,
      videoRef,
      startHandle,
      endHandle,
      sliderWidth,
      player,
      thumbnails,
      startTime,
      endTime,
      setEndTime,
      setStartTime,
    } = this.props;

    console.log("endTime", "stratTime", startTime, endTime);

    return (
      <View style={styles.wrapper}>
        <View style={styles.topBar}>
          <SideBar
            setIsTrim={(val) => setBooleanState({ isTrim: val })}
            addText={() => addText(setOverlays)}
            addEmoji={() => setBooleanState({ visible: true })}
            setIsTrimAudio={(val) => setBooleanState({ isTrimAudio: val })}
            pickMusic={() =>
              pickMusic({
                setMusicPlayer: this.props.setMusicPlayer,
                setMusicUri: this.props.setMusicUri,
              })
            }
          />
        </View>

        <EmojiPicker
          visible={booleanState.visible}
          onClose={() => setBooleanState({ visible: false })}
          onAddEmoji={(e) => addEmoji({ emoji: e, setOverlays })}
        />

        <View style={styles.bottomBar}>
          {(booleanState.isTrim || booleanState.isTrimAudio) && (
            <View style={{ width: "100%" }}>
              <Pressable
                onPress={() => {
                  setBooleanState({
                    isTrimAudio: false,
                  });
                }}
              >
                <Image
                  source={DownArrow as ImageSourcePropType}
                  style={styles.downArrow}
                  resizeMode="stretch"
                  tintColor="#fff"
                />
              </Pressable>

              {booleanState.isTrimAudio && (
                <AudioTrimmer
                  trimDuration={numberState.videoDuration}
                  musicUri={stringState.musicUri}
                  musicPlayer={this.props.musicPlayer}
                  setMusicPlayer={(e) => this.props.setMusicPlayer(e)}
                  videoStartTime={startTime}
                  musicVolume={numberState.musicVolume}
                  setMusicVolume={(val) =>
                    setNumberState({
                      musicVolume: val,
                    })
                  }
                  setMusicUri={(uri) => this.props.setMusicUri(uri)}
                  musicStartTime={numberState.musicStartTime}
                  setMusicStartTime={(val) =>
                    setNumberState({
                      musicStartTime: val,
                    })
                  }
                  musicEndTime={numberState.musicEndTime}
                  videoEndTime={endTime}
                  setMusicEndTime={(val) =>
                    setNumberState({
                      musicEndTime: val,
                    })
                  }
                  PlayPlyer={() => {}}
                  playTrimmedAudio={() => {}}
                  autoPlay={() => {}}
                  maxAudioDuration={numberState.maxAudioDuration}
                />
              )}

              {booleanState.isTrim && (
                <Trimmor
                  player={player}
                  setValue={(val) => {
                    this.props.setVideoVolume(val);
                    if (player) player.volume = val;
                  }}
                  videoVolume={numberState.videoVolume}
                  sliderWidth={sliderWidth}
                  endTime={endTime}
                  startTime={startTime}
                  maxDuration={numberState.videoDuration}
                  startHandle={startHandle}
                  endHandle={endHandle}
                  setStartTime={setStartTime}
                  setEndTime={setEndTime}
                  thumbnails={thumbnails}
                />
              )}
            </View>
          )}
        </View>

        <DraggableResizable overlays={overlays} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
  },
  topBar: {
    marginTop: 130,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 10,
  },
  downArrow: {
    width: 80,
    height: 20,
    alignSelf: "center",
  },
});

export default ClassVideoEidtor;
