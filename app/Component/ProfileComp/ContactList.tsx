import { View, Text, FlatList, Platform, Dimensions } from "react-native";
import React from "react";
import ListITems from "./ListITems";
const ContactCard = () => {
  return (
    <View
      style={{
        width: 150,
        height: 100,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        backgroundColor: "#fff",
        marginHorizontal: Platform.OS === "android" ? 10 : "auto",
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "silver",
          borderRadius: 30,
          width: 60,
          marginHorizontal: "auto",
          height: 60,
          marginVertical: 5,
        }}
      ></View>

      <Text style={{ textAlign: "center" }}>name surname</Text>
    </View>
  );
};

const ContactList = () => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.4,
        height: 400,
        padding: 5,
        borderWidth: 1,
        borderColor: "silver",
        borderRadius: 5,
        overflow: "hidden",
        marginHorizontal: Dimensions.get("window").width * 0.05,
        backgroundColor: "black",
        ...Platform.select({
          android: { width: "90%", height: "auto" },
          web: { marginVertical: 20 },
        }),
      }}
    >
      <ListITems
        numColumns={4}
        horizontal={Platform.OS === "android" ? true : false}
        data={[
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]}
        Component={() => {
          return <ContactCard />;
        }}
      />
    </View>
  );
};

export default ContactList;
