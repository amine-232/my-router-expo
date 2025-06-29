import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
const UserCard = () => {
  return (
    <Pressable
      style={{ width: "90%", height: "auto", marginHorizontal: "auto" }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          padding: 5,
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "silver",
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 2,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "silver",
          }}
        ></View>
        <Text>userName</Text>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "green",
          }}
        />
      </View>
    </Pressable>
  );
};
const RightSide = () => {
  return (
    <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>
      <View
        style={{
          width: "90%",
          height: "50%",
          borderWidth: 1,
          borderColor: "silver",
          marginHorizontal: "auto",
          marginVertical: 10,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <FlatList
          data={[{}, {}, {}, {}, {}, {}, {}, {}]}
          extraData={({ item, index }: { item: any; index: number }) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <UserCard />;
          }}
        />
      </View>
    </View>
  );
};

export default RightSide;
