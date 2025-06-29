import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import IconBtn from "../Component/IconBtn";
import MoreIcon from "../../assets/more.png";

import LikeBold from "../../assets/likeBold.png";
import LikeOutlined from "../../assets/likeOutlined.png";
import ShareIcon from "../../assets/share.png";
import CommentIcon from "../../assets/comments.png";
import ProfileImg from "../Component/ProfileImg";

const TopPost = () => {
  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        marginHorizontal: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        backgroundColor: "#fff",
      }}
    >
      <ProfileImg
        uri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
        size={Platform.select({ android: 50, web: 80 })}
        borderWidth={2}
      />
      <View
        style={{
          width: "auto",
          height: "auto",
          flexDirection: "column",
          marginVertical: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>user Name</Text>
        <Text style={{ fontSize: 12, fontWeight: "200", textAlign: "center" }}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          marginVertical: "auto",
        }}
      >
        <IconBtn icon={MoreIcon} size={30} color={"black"} />
      </View>
    </View>
  );
};
const MidllePost = () => {
  return (
    <View
      style={{
        width: "90%",
        marginHorizontal: "auto",
        height: 400,
        borderRadius: 5,
        overflow: "hidden",
        ...Platform.select({ android: { width: "100%" } }),
      }}
    >
      <Image
        source={{
          uri: "https://wallpapercat.com/w/full/0/f/3/5815630-3840x2160-desktop-hd-4k-wallpaper-image.jpg" as string,
        }}
        style={{ width: "100%", height: "100%" }}
        resizeMode={"stretch"}
      />
    </View>
  );
};
const BottomPost = () => {
  const [likeState, setLikeState] = useState<boolean>(false);
  useEffect(() => {}, [likeState]);
  const MapItem = [
    {
      name: "like",
      icon: likeState ? LikeBold : LikeOutlined,
      onPress: () => {
        if (!likeState) {
          setLikeState(true);
        } else {
          setLikeState(false);
        }
      },
      color: "black",
    },
    { name: "comments", icon: CommentIcon, onPress: () => {}, color: "black" },
    { name: "share", icon: ShareIcon, onPress: () => {}, color: "black" },
  ];
  return (
    <View style={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <View
        style={{
          width: "90%",
          height: "auto",
          flexDirection: "row",
          marginHorizontal: "auto",
          backgroundColor: "#fff",
        }}
      >
        {MapItem.map((btn, index) => {
          return (
            <View
              style={{
                width: "33.33%",
                height: "auto",
                padding: 5,
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                backgroundColor: "#fff",
              }}
              key={index}
            >
              <IconBtn
                icon={btn.icon}
                color={btn.color}
                onPress={() => btn.onPress()}
                size={25}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const PostCard = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        marginHorizontal: "auto",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        ...Platform.select({ android: { width: "100%" } }),
      }}
    >
      <TopPost />
      <MidllePost />
      <BottomPost />
    </View>
  );
};
const PostList = () => {
  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        padding: 5,
        marginHorizontal: "auto",
        marginVertical: 10,
        ...Platform.select({ android: { width: "100%" } }),
      }}
    >
      <FlatList
        data={[{}, {}, {}, {}]}
        extraData={({ item, index }: { item: any; index: number }) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <PostCard item={item} />;
        }}
      />
    </View>
  );
};

export default PostList;
