import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import IconBtn from "../Component/IconBtn";

import AddIcon from "../../assets/addIcon.png";

const PageCard = () => {
  return (
    <Pressable
      style={{
        width: "90%",
        height: "auto",
        marginHorizontal: "auto",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          padding: 5,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "silver",
          flexDirection: "column",
          justifyContent: "space-around",
          marginVertical: 5,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: 100,
            borderRadius: 5,
            borderColor: "silver",
            marginHorizontal: "auto",
            borderWidth: 1,
            marginVertical: 20,
            zIndex: 0,

          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: "silver",
              position: "absolute",
              bottom: -25,
              left: 20,
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          ></View>
        </View>

        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          Page Name
        </Text>
      </View>
    </Pressable>
  );
};
const LeftSide = () => {
  return (
    <View style={{ width: "100%", height: "100%", flexDirection: "column", backgroundColor: "black",
 }}>
      <View
        style={{
          width: "90%",
          height: "90%",
          borderWidth: 1,
          borderColor: "silver",
          marginHorizontal: "auto",
          marginVertical: "auto",
          borderRadius: 10,
          overflow:"hidden",
          backgroundColor: "#F2F2F2"
        }}
      >
        <FlatList
          data={[{}, {}, {}, {}, {}, {}, {}, {}]}
          extraData={({ item, index }: { item: any; index: number }) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <PageCard />;
          }}
        />
      </View>
    </View>
  );
};

export default LeftSide;
