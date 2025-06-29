import { View, Text, Switch, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseconfig";

const TextBox = ({ title }: { title: string }) => {
  return (
    <View style={{ width: "auto", height: "auto", marginHorizontal: 20 }}>
      <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
    </View>
  );
};

const SwitchBox = ({
  value,
  setValue,
  title,
}: {
  title: string;
  value: boolean;
  setValue: (e: boolean) => void;
}) => {
  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: "auto",
      }}
    >
      <View
        style={{
          width: "60%",
          height: "auto",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <TextBox title={title} />
      </View>

      <View
        style={{
          width: "40%",
          height: "auto",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            width: "auto",
            height: "auto",
            marginHorizontal: "auto",
          }}
        >
          <Switch onValueChange={setValue} value={value} />
        </View>
      </View>
    </View>
  );
};

const settings = () => {
  const [ModeSet, setModeSet] = useState<boolean>(false);

  useEffect(() => {}, [ModeSet]);

  const SettingMap = [
    {
      name: ModeSet ? "unvisable" : "visable",
      setValue: (e: boolean) => {
        setModeSet(e);
      },
    },
  ];

  const SignOut = async () => {
    await auth
      .signOut()
      .then(() => {
        console.log("user sign out");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  return (
    <View
      style={{
        width: "90%",
        height: "auto",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "silver",
        marginHorizontal: "auto",
        marginVertical: 10,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          width: "90%",
          height: "auto",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "silver",
          marginHorizontal: "auto",
          marginVertical: 10,
          flexDirection: "column",
        }}
      >

        <FlatList
          data={SettingMap}
          extraData={({ item, index }: { item: any; index: number }) => item}
          renderItem={({ item }) => {
            return (
              <SwitchBox
                value={ModeSet}
                setValue={item.setValue}
                title={item.name}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "auto",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            width: "auto",
            height: "auto",
            paddingHorizontal: 20,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: "silver",
            borderRadius: 5,
            backgroundColor: "#1F52FF",
          }}
          onPress={() => {
            SignOut();
          }}
        >
          <Text style={{ color: "#fff" }}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default settings;
