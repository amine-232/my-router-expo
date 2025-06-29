import {
  View,
  Text,
  Pressable,
  ColorValue,
  Platform,
  Image,
  ImageSourcePropType,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { router } from "expo-router";
import InputField from "./Component/InputField";
import { auth, db } from "../firebaseconfig";
import Button from "./Component/Button";
import LogoIcon from "../assets/logo.png";

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
const SignIn = () => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  useEffect(() => {}, [email, password]);

  console.log("userData", password, email);

  const SignInUser = async (email: string, password: string) => {
    if (email && password) {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((credentials) => {
          if (credentials.user) {
            const user = credentials.user;
            const userId = user.uid;

            if (userId) {
              console.log("login user", userId);
            }
          }
        });
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: Dimensions.get("window").height * 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f4f7",
        flexDirection: "column",
      }}
    >
      <StatusBar hidden={false} />
      <ScrollView style={{width: "100%"}}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 25,
            marginHorizontal: "auto",

            ...Platform.select({
              android: { marginTop: "25%", marginBottom: 20 },
              web: {
                marginVertical: 10,
              },
            }),
          }}
        >
          <Image
            source={LogoIcon as ImageSourcePropType}
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
            resizeMode="contain"
            tintColor={"black"}
          />
        </View>
        <View
          style={{
            width: "20%",
            height: "auto",
            flexDirection: "column",
            marginHorizontal: "auto",
            marginVertical: "auto",
            padding: 5,
            paddingVertical: 20,
            borderWidth: 1,
            borderColor: "silver",
            borderRadius: 5,
            backgroundColor: "#ffff",
            ...Platform.select({
              android: { width: "90%", height: "auto", marginVertical: 10 },
            }),
          }}
        >
          <InputField
            placeholder="enter you email"
            value={email}
            addStyle={{
              marginVertical: 20,
              width: "80%",
              marginHorizontal: "auto",
            }}
            setValue={(e) => {
              setEmail(e);
            }}
          />
          <InputField
            placeholder="enter you password"
            value={password}
            addStyle={{
              marginVertical: 20,
              width: "80%",
              marginHorizontal: "auto",
            }}
            pass={true}
            setValue={(e) => {
              setPassword(e);
            }}
          />

          <View
            style={{
              width: "90%",
              height: "auto",
              marginVertical: 10,
              justifyContent: "space-around",
              marginHorizontal: "auto",
            }}
          >
            <Button
              title="Sign in"
              onPress={() => {
                if (email !== "" && password !== "") {
                  SignInUser(email, password);
                }
              }}
            />

            {/* <Button
            title="Sign up"
            onPress={() => {
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.push("sign-up");
            }}
          /> */}

            <Text
              style={{
                color: "#3d77f3",
                textAlign: "center",
                marginVertical: 10,
              }}
              onPress={() => {
                console.log("Forgot password?");
              }}
            >
              Forgot password?
            </Text>

            <Text
              style={{
                color: "#3d77f3",
                textAlign: "center",
                marginVertical: 10,
              }}
              onPress={() => {
                router.push("sign-up");
              }}
            >
              don't have account yet?
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
