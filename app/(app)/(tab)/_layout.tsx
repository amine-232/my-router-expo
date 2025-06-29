import { router, Tabs } from "expo-router";
import {
  ColorValue,
  DimensionValue,
  Image,
  ImageSourcePropType,
  Platform,
  View,
  StatusBar,
  Dimensions,
  useWindowDimensions,
  FlatList,
  Pressable,
} from "react-native";

import HomeIcon from "../../../assets/home.png";
import ProfileIcon from "../../../assets/profile.png";
import SettingIcon from "../../../assets/setting.png";
import IconBtn from "../../Component/IconBtn";
import MessageIcon from "../../../assets/message.png";
import LogoIcon from "../../../assets/logo.png";
import VideosIcon from "../../../assets/video.png";

import { useState } from "react";

const IconTab = ({
  icon,
  color,
  focused,
}: {
  icon: any;
  color: ColorValue;
  focused: boolean;
}) => {
  const { width, height } = useWindowDimensions();
  return (
    <Image
      source={icon as ImageSourcePropType}
      style={{
        width: 25,
        height: 25,
        marginVertical: "auto",
        marginHorizontal: "auto",
        ...Platform.select({ web: { width: 35, height: 35 } }),
      }}
      tintColor={color as ColorValue}
      resizeMode={"contain"}
    />
  );
};
const CustomeNav = () => {
  const { width, height } = useWindowDimensions();
  const [state, setState] = useState<string>("/");
  const TabMap = [
    { name: "/", icon: HomeIcon },
    { name: "profile", icon: ProfileIcon },
    { name: "settings", icon: SettingIcon },
    { name: "videos", icon: VideosIcon },
  ];

  return (
    <View
      style={{
        width: "100%",
        padding: 5,
        height: "auto",
        borderColor: "silver",
        backgroundColor: "#fff",
        ...Platform.select({ android: { height: 40 } }),
      }}
    >
      <FlatList
        data={TabMap}
        numColumns={4}
        extraData={({ item, index }: { item: any; index: number }) => item}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{ width: width / TabMap.length, height: "auto" }}
              onPress={() => {
                setState(item.name);
                router.push(item.name);
              }}
            >
              <IconTab
                icon={item.icon}
                color={state === item.name ? "#1f52ff" : "silver"}
                focused={false}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};
const AndroidBar = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        flexDirection: "column",
        ...Platform.select({ android: { height: 40 } }),
      }}
    >
      <StatusBar hidden={false} />

      <View
        style={{
          width: "100%",
          height: "auto",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            borderWidth: 1,
            marginHorizontal: 10,
            borderColor: "silver",
          }}
        >
          <Image
            source={LogoIcon as ImageSourcePropType}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
            }}
            tintColor={"black"}
            resizeMode={"contain"}
          />
        </View>
        <View
          style={{
            width: "auto",
            height: "auto",
            marginHorizontal: 10,
          }}
        >
          <IconBtn
            icon={MessageIcon}
            size={25}
            onPress={() => router.push("Messages")}
          />
        </View>
      </View>
    </View>
  );
};

const TabsStack = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: "top",
        tabBarActiveTintColor: "#1f52ff",
        tabBarStyle: {
          height: 0,
          width: 0,
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
};

const TabsNav = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        flexDirection: "column",
        ...Platform.select({
          android: {
            width: "100%",
            height: height - 40,
            flexDirection: "column",
            marginVertical: "auto",
          },
        }),
      }}
    >
      {Platform.OS === "android" ? <AndroidBar /> : null}
      <CustomeNav />

      <View
        style={{
          flex: 1,
          ...Platform.select({
            android: { width: "100%", height: height - 80 },
          }),
        }}
      >
        <TabsStack />
      </View>
    </View>
  );
};

export default TabsNav;
