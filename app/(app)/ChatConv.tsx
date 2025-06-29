import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Dimensions,
  VirtualizedList,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/ctx";
import IconBtn from "../Component/IconBtn";
import SendIcon from "../../assets/sendIcon.png";
import BackICon from "../../assets/back.png";

import { StatusBar } from "expo-status-bar";

const CustomBar = () => {
  return (
    <View
      style={{
        width: "100%",
        height: Dimensions.get("window").height * 0.08,
        backgroundColor: "#fff",
        flexDirection: "row",
        zIndex: 4,
      }}
    >
      <View style={{ width: "auto", height: "auto", flexDirection: "row" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "black",
            marginVertical: "auto",
            marginHorizontal: 5,
          }}
        ></View>
      </View>

      <View
        style={{
          width: "auto",
          height: "auto",
          marginVertical: "auto",
          marginHorizontal: "auto",
        }}
      >
        <Text>user name</Text>
      </View>
      <View
        style={{
          width: "auto",
          height: "auto",
          marginVertical: "auto",
          marginHorizontal: 5,
        }}
      >
        <IconBtn
          icon={BackICon}
          size={30}
          onPress={() => {
            router.back();
          }}
        />
      </View>
    </View>
  );
};
const SendBox = ({
  sendMsg,
  isTyping,
  setIsTyping,
}: {
  isTyping: boolean;
  setIsTyping: (e: boolean) => void;
  sendMsg: (msg: string, date: string) => void;
}) => {
  const [Messages, setMessages] = useState<string>("");
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "silver",
        backgroundColor: "#fff",
      }}
    >
      <TextInput
        value={Messages || ""}
        multiline
        numberOfLines={3}
        keyboardType={"default"}
        onFocus={() => {
          setIsTyping(true);
        }}
        onBlur={() => {
          setIsTyping(false);
        }}
        onChangeText={(e) => {
          setMessages(e);
        }}
        style={{
          width: "80%",
          height: "100%",
          padding: 5,
          borderWidth: 1,
          borderColor: "silver",
        }}
      />
      <View
        style={{
          width: "auto",
          height: "auto",
          marginHorizontal: "auto",
          marginVertical: "auto",
        }}
      >
        <IconBtn
          icon={SendIcon}
          size={40}
          onPress={() => {
            if (Messages !== "") {
              sendMsg(Messages, new Date().toLocaleDateString());
              console.log("send Icon pressed", Messages);
              setMessages("");
            }
          }}
        />
      </View>
    </View>
  );
};

const ChatCard = ({ item }: { item: any }) => {
  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "silver",
        marginVertical: 10,
        marginHorizontal: "auto",
      }}
    >
      <Text>{item.msg}</Text>
      <Text>{item.date}</Text>
    </View>
  );
};

const RoomChat = ({
  selectConve,
  isTyping,
  setIsTyping,
}: {
  isTyping: boolean;
  setIsTyping: (e: boolean) => void;
  selectConve: any[];
}) => {
  const ListRef = useRef<any>(null);
  return (
    <View
      style={{
        height: isTyping
          ? Dimensions.get("window").height * 0.5
          : Dimensions.get("window").height * 0.82,
      }}
    >
      <FlatList
        ref={ListRef}
        data={selectConve}
        extraData={({ item, index }: { item: any; index: number }) => item}
        initialNumToRender={selectConve.length}
        onContentSizeChange={() => {
          ListRef?.current.scrollToEnd({ Animation: true });
        }}
        renderItem={({ item }) => {
          return <ChatCard item={item} />;
        }}
      />
    </View>
  );
};

const getItem = (data: any, index: number) => data[index];
const getItemCount = (data: any[]) => data.length;

const ChatConv = () => {
  const { selectConve, setSelectedConv } = useContext(AuthContext);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        zIndex: 0,
      }}
    >
      <StatusBar hidden={true} />

      <CustomBar />
      <RoomChat
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        selectConve={selectConve}
      />
      <View
        style={{
          width: "100%",
          // position: "absolute",
          height: Dimensions.get("window").height * 0.12,
        }}
      >
        <SendBox
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          sendMsg={(msg, date) => {
            setSelectedConv((prev: any[]) => [
              ...prev,
              { msg: msg, date: date },
            ]);
          }}
        />
      </View>
    </View>
  );
};

export default ChatConv;
