import {
  View,
  Text,
  FlatList,
  Pressable,
  Platform,
  ImageSourcePropType,
} from "react-native";
import React, { useContext } from "react";
import IconBotton from "../Component/IconBotton";
import AddIcon from "@/assets/images/addIcon.png";
import { AuthContext } from "@/Context/ctx";
import { router } from "expo-router";
const LiveList = () => {
  const { liveList } = useContext(AuthContext);

  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        padding: 5,
        backgroundColor: "#fff",
        marginHorizontal: "auto",
        marginVertical: 10,
        borderRadius: 10,
        ...Platform.select({ android: { width: "100%" } }),
      }}
    >
      {!liveList ? (
        <View
          style={{
            width: 80,
            height: 80,
            marginVertical: "auto",
            flexDirection: "column",
          }}
        >
          <IconBotton
            style={{
              marginHorizontal: "auto",
            }}
            icon={AddIcon as ImageSourcePropType}
            color={"black"}
            size={45}
            onPress={() => {router.push("goLive")}}
          />
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            go Live
          </Text>
        </View>
      ) : (
        <FlatList
          data={liveList}
          extraData={({ item, index }: { item: any; index: number }) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => {
            return (
              <View
                style={{
                  width: "auto",
                  height: "auto",
                  flexDirection: "row",
                }}
              >
                {item.index === 0 ? (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      marginVertical: "auto",
                      flexDirection: "column",
                    }}
                  >
                    <IconBotton
                      style={{
                        marginHorizontal: "auto",
                      }}
                      icon={AddIcon as ImageSourcePropType}
                      color={"black"}
                      size={45}
                      onPress={() => {}}
                    />
                    <Text style={{ textAlign: "center", marginVertical: 10 }}>
                      go Live
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{
                    width: "auto",
                    height: "auto",
                    marginHorizontal: 10,
                    marginVertical: 5,
                    flexDirection: "column",
                  }}
                >
                  <Pressable
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      borderWidth: 3,
                      borderColor: "silver",
                      marginHorizontal: "auto",
                      ...Platform.select({
                        android: { width: 60, height: 60, borderRadius: 30 },
                      }),
                    }}
                  ></Pressable>
                  <Text style={{ textAlign: "center", marginTop: 2.5 }}>
                    name
                  </Text>
                  <Text style={{ textAlign: "center", marginBottom: 2.5 }}>
                    surname
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default LiveList;
