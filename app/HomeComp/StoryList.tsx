import {
  View,
  Text,
  Pressable,
  FlatList,
  Platform,
  ImageSourcePropType,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "@/Context/ctx";
import IconBotton from "../Component/IconBotton";
import AddIcon from "@/assets/images/addIcon.png";
import { router } from "expo-router";

const StoryList = () => {
  const { storyList } = useContext(AuthContext);

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
        ...Platform.select({
          android: { width: "100%" },
        }),
      }}
    >
      {!storyList ? (
        <View
          style={{
            width: Platform.OS === "android" ? 100 : 120,
            height: "auto",
            flexDirection: "column",
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              width: 120,
              height: 160,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "silver",

              ...Platform.select({
                android: {
                  width: 100,
                  height: 140,
                  borderRadius: 30,
                  marginHorizontal: 5,
                },
              }),
            }}
          >
            <IconBotton
              style={{
                marginHorizontal: "auto",
                marginVertical: "auto",
              }}
              icon={AddIcon as ImageSourcePropType}
              color={"black"}
              size={45}
              onPress={() => {
                router.push("createStroy");
              }}
            />
          </View>
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            add story
          </Text>
        </View>
      ) : (
        <FlatList
          data={storyList}
          extraData={({ item, index }: { item: any; index: number }) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => {
            return (
              <View
                style={{ width: "auto", height: "auto", flexDirection: "row" }}
              >
                {item.index === 0 ? (
                  <View
                    style={{
                      width: Platform.OS === "android" ? 100 : 120,
                      height: "auto",
                      flexDirection: "column",
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}
                  >
                    <View
                      style={{
                        width: 120,
                        height: 160,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "silver",

                        ...Platform.select({
                          android: {
                            width: 100,
                            height: 140,
                            borderRadius: 30,
                            marginHorizontal: 5,
                          },
                        }),
                      }}
                    >
                      <IconBotton
                        style={{
                          marginHorizontal: "auto",
                          marginVertical: "auto",
                        }}
                        icon={AddIcon as ImageSourcePropType}
                        color={"black"}
                        size={45}
                        onPress={() => {}}
                      />
                    </View>
                    <Text style={{ textAlign: "center", marginVertical: 10 }}>
                      add story
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
                      width: 120,
                      height: 160,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "silver",

                      ...Platform.select({
                        android: {
                          width: 100,
                          height: 140,
                          borderRadius: 30,
                          marginHorizontal: 5,
                        },
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

export default StoryList;
