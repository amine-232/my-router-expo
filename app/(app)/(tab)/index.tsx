import {
  View,
  Text,
  ScrollView,
  Platform,
  VirtualizedList,
} from "react-native";

import React from "react";
import LiveList from "../../HomeComp/LiveList";
import StoryList from "../../HomeComp/StoryList";
import PostCard from "../../HomeComp/PostList";
import RightSide from "../../HomeComp/RightSide";
import LeftSide from "../../HomeComp/LeftSide";
import { StatusBar } from "expo-status-bar";

const getItem = (data: any, index: number) => data[index];
const getItemCount = (data: any) => data.length;

const HomeTab = () => {
  const ListItem = [
    { key: "LiveList", component: <LiveList /> },
    { key: "StoryList", component: <StoryList /> },
    { key: "PostCard", component: <PostCard /> },
  ];

  return (
    <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
      {Platform.OS === "web" && (
        <View
          style={{
            width: "20%",
            height: "100%",
            borderWidth: 1,
            borderColor: "silver",
          }}
        >
          <LeftSide />
        </View>
      )}
      <View
        style={{
          width: "60%",
          height: "100%",
          ...Platform.select({ android: { width: "100%", height: "100%" } }),
        }}
      >
        <VirtualizedList
          data={ListItem}
          style={{}}
          getItem={getItem}
          initialNumToRender={3}
          extraData={(item: any) => item.key}
          getItemCount={getItemCount}
          renderItem={({ item }) => item.component}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {Platform.OS === "web" && (
        <View
          style={{
            width: "20%",
            height: "100%",
            borderWidth: 1,
            borderColor: "silver",
          }}
        >
          <RightSide />
        </View>
      )}
    </View>
  );
};

export default HomeTab;
