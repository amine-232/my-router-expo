import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { AuthContext } from "../../Context/ctx";
import Search from "../../assets/search.png";
import BackIcon from "../../assets/back.png";

import IconBtn from "../Component/IconBtn";
import { StatusBar } from "expo-status-bar";

const SearchInput = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        padding: 2,
        flexDirection: "row",
      }}
    >
      <TextInput
        style={{
          width: "90%",
          height: "auto",
          ...Platform.select({
            web: {
              outline: "none",
            },
          }),
        }}
      />
      <View style={{ width: "10%", height: "auto", marginVertical: "auto" }}>
        <IconBtn icon={Search} size={20} color={"black"} onPress={() => {}} />
      </View>
    </View>
  );
};
const ConvBox = ({
  item,
  setSelectedConv,
  selectConve,
}: {
  setSelectedConv: (e: any[] | false) => void;
  selectConve: any[] | false;
  item: any;
}) => {
  return (
    <Pressable
      style={{
        width: "100%",
        height: "auto",
      }}
      onPress={() => {
        if (selectConve !== false) {
          setSelectedConv(false);
        }

        setTimeout(() => {
          setSelectedConv(item.chat ? item.chat : []);
          router.push({
            pathname: "ChatConv",
          });
        }, 400);
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          padding: 10,
          borderWidth: 1,
          borderColor: "silver",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "silver",
            marginHorizontal: 10,
          }}
        ></View>
        <View>
          <Text style={{ fontWeight: "800" }}>
            {item.name} {item.surname}
          </Text>
        </View>
        <View
          style={{ marginHorizontal: 10, width: "auto", height: "auto" }}
        ></View>
      </View>
    </Pressable>
  );
};

const Messages = () => {
  const { selectConve, setSelectedConv, UserList } = useContext(AuthContext);

  const ConvesationList = [
    {
      name: "name",
      surname: "suname",
      profilePic:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      chat: [
        { msg: "hey", date: new Date().toLocaleDateString(), userId: "1" },
        { msg: "test", date: new Date().toLocaleDateString(), userId: "2" },
      ],
    },
    {
      name: "name",
      surname: "suname",
      profilePic:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      chat: [{ msg: "hey", date: new Date().toLocaleDateString() }],
    },
    {
      name: "name",
      surname: "suname",
      profilePic:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      chat: [{ msg: "hey", date: new Date().toLocaleDateString() }],
    },
  ];
  return (
    <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>
      <StatusBar hidden={true} />

      <View
        style={{
          width: "100%",
          height: "auto",
          padding: 5,
          backgroundColor: "black",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "auto", height: "auto", marginHorizontal: 10 }}>
          <IconBtn
            icon={BackIcon}
            size={30}
            color={"#fff"}
            onPress={() => {
              router.back();
            }}
          />
        </View>
      </View>
      <View style={{ width: "100%", height: "auto", marginVertical: 5 }}>
        <SearchInput />
      </View>
      <FlatList
        data={UserList}
        extraData={({ item, index }: { item: any; index: number }) => item}
        renderItem={({ item }) => {
          return (
            <ConvBox
              item={item}
              setSelectedConv={setSelectedConv}
              selectConve={selectConve}
            />
          );
        }}
      />
    </View>
  );
};

export default Messages;
