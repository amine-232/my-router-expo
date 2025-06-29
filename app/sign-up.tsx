import {
  View,
  Text,
  Pressable,
  ColorValue,
  Platform,
  FlatList,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { router } from "expo-router";
import InputField from "./Component/InputField";
import { auth, db } from "../firebaseconfig";

type UserData = {
  name: string;
  surname: string;
  email: string;
};

type ItemList = {
  name: string;
  value: string;
  isPass: boolean;
  setValue: (e: string) => void;
};

const PressBox = ({
  title,
  onPress,
  backgroundColor,
  color,
}: {
  title: string;
  onPress: () => void;
  backgroundColor?: ColorValue;
  color?: ColorValue;
}) => {
  return (
    <Pressable
      style={{
        width: "auto",
        height: "auto",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "silver",
        backgroundColor: backgroundColor ? backgroundColor : undefined,
      }}
      onPress={onPress}
    >
      <Text style={{ color: color ? color : "black" }}>{title}</Text>
    </Pressable>
  );
};
const SignUp = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    surname: "",
    email: "",
  });

  const [password, setPassword] = useState<string>("");

  useEffect(() => {}, [userData, password]);

  const MapInputs = [
    {
      name: "name",
      value: userData.name,
      isPass: false,

      setValue: (e: string) => {
        setUserData({ ...userData, name: e });
      },
    },
    {
      name: "surname",
      value: userData.surname,
      isPass: false,

      setValue: (e: string) => {
        setUserData({ ...userData, surname: e });
      },
    },
    {
      name: "email",
      value: userData.email,
      isPass: false,

      setValue: (e: string) => {
        setUserData({ ...userData, email: e });
      },
    },
    {
      name: "password",
      value: password,
      isPass: true,
      setValue: (e: string) => {
        setPassword(e);
      },
    },
  ];
  console.log("userData", password, userData);

  const SignUpUser = async (email: string, password: string) => {
    if (email && password) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (credentials) => {
          if (credentials.user) {
            const user = credentials.user;
            const userId = user.uid;
            if (userId) {
              await db
                .collection("users")
                .doc(userId)
                .set({ ...userData, userId })
                .then(() => {
                  console.log("firebase data was added");
                })
                .catch((e) => {
                  console.log("error", e);
                });
            }
          }
        });
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "50%",
          height: "auto",
          flexDirection: "column",
          marginHorizontal: "auto",
          marginVertical: "auto",
          padding: 5,
          borderWidth: 1,
          borderColor: "silver",
          borderRadius: 5,
          ...Platform.select({ android: { width: "90%" } }),
        }}
      >
        <FlatList
          data={MapInputs}
          extraData={({ item, index }: { item: ItemList; index: number }) =>
            item
          }
          renderItem={({ item }) => {
            return (
              <InputField
                placeholder={`enter you ${item.name}`}
                value={item.value}
                pass={item.isPass}
                addStyle={{
                  marginVertical: 10,
                  width: "80%",
                  marginHorizontal: "auto",
                }}
                setValue={item.setValue}
              />
            );
          }}
        />

        <View
          style={{
            width: "100%",
            height: "auto",
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <PressBox
            title="Sign Up"
            onPress={() => {
              if (
                userData.name !== "" &&
                userData.surname !== "" &&
                userData.email !== "" &&
                password !== ""
              )
                SignUpUser(userData.email, password);
            }}
          />

          <PressBox
            title="getBack"
            onPress={() => {
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.back();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUp;
