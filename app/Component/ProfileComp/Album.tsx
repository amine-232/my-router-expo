import {
  View,
  Text,
  Pressable,
  FlatList,
  Platform,
  Dimensions,
  VirtualizedList,
} from "react-native";
import React, { useState } from "react";
import ListITems from "./ListITems"; // Make sure this is correctly implemented

const TabPress = ({
  barState,
  title,
  setBatState,
}: {
  title: string;
  barState: string;
  setBatState: (e: string) => void;
}) => {
  return (
    <Pressable
      style={{
        width: "50%",
        padding: 5,
        borderRightWidth: 1,
        borderColor: "silver",
        backgroundColor: barState === title ? "#1F52FF" : "#fff",
      }}
      onPress={() => {
        if (barState !== title) {
          setBatState(title);
        }
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: barState === title ? "600" : "200",
          color: barState === title ? "#fff" : "black",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const Tobar = ({
  barState,
  setBatState,
}: {
  barState: string;
  setBatState: (e: string) => void;
}) => {
  return (
    <View
      style={{
        width: "100%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomWidth: 1,
        borderColor: "silver",
        flexDirection: "row",
      }}
    >
      <TabPress barState={barState} setBatState={setBatState} title="Photos" />
      <TabPress barState={barState} setBatState={setBatState} title="Videos" />
    </View>
  );
};

const VideosCard = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        width: Platform.OS === "android" ? 100 : "30%",
        height: 100,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: "silver",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginHorizontal: Platform.OS === "android" ? 10 : "auto",
      }}
    >
      <Text style={{ textAlign: "center", marginTop: 35 }}>VideosCard</Text>
    </View>
  );
};

const PhotosCard = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        width: Platform.OS === "android" ? 100 : "20%",
        height: 100,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: "silver",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginHorizontal: Platform.OS === "android" ? 10 : "auto",
      }}
    >
      <Text style={{ textAlign: "center", marginTop: 35 }}>PhotosCard</Text>
    </View>
  );
};

const RenderList = ({ barState }: { barState: string }) => {
  if (barState === "Photos") {
    if (Platform.OS === "web") {
      return (
        <ListITems
          key="photos" // unique key to force re-render
          numColumns={4}
          data={Array.from({ length: 13 }, () => ({}))}
          Component={(item: any) => <PhotosCard item={item} />}
        />
      );
    } else {
      return (
        <ListITems
          key="photos" // unique key to force re-render
          horizontal
          data={Array.from({ length: 13 }, () => ({}))}
          Component={(item: any) => <PhotosCard item={item} />}
        />
      );
    }
  }

  if (barState === "Videos") {
    if (Platform.OS === "web") {
      return (
        <ListITems
          key="videos" // different key for different layout
          numColumns={3}
          data={Array.from({ length: 13 }, () => ({}))}
          Component={(item: any) => <VideosCard item={item} />}
        />
      );
    } else {
      return (
        <ListITems
          key="videos" // different key for different layout
          horizontal
          data={Array.from({ length: 13 }, () => ({}))}
          Component={(item: any) => <VideosCard item={item} />}
        />
      );
    }
  }

  return null;
};
const Album = () => {
  const [barState, setBatState] = useState<string>("Photos");

  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.4,
        marginHorizontal: Dimensions.get("window").width * 0.05,
        height: 400,
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        flexDirection: "column",
        marginVertical: 20,
        overflow: "hidden",
        backgroundColor: "black",
        zIndex: 4,
        ...Platform.select({
          android: {
            width: "90%",
            height: "auto",
          },
        }),
      }}
    >
      <Tobar barState={barState} setBatState={setBatState} />
      <RenderList barState={barState} />
    </View>
  );
};

export default Album;
