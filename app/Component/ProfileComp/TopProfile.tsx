import { View, Text, Image, Platform, Pressable } from "react-native";
import React, { useState } from "react";
import { UserData } from "../../../types/type";
import pickImage  from "../VideoEditor/ImagePicker";

const TopProfile = ({ userData }: { userData: UserData }) => {
  const [profilePic, setProfilePic] = useState<any>({
    uri: "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  });
  const [coverPic, setCoverPic] = useState<any>({
    uri: "https://t4.ftcdn.net/jpg/05/68/27/11/360_F_568271133_abLuLCUggrEHb7QBjTBLkb2gVtiIlQQP.jpg",
  });
  return (
    <View style={{ width: "auto", height: "auto", flexDirection: "column" }}>
      <Pressable
        style={{
          width: "90%",
          height: Platform.OS === "android" ? 200 : 400,
          borderWidth: 1,
          borderColor: "silver",
          marginHorizontal: "auto",
          borderRadius: 10,
          overflow: "hidden",
          zIndex: 0,
        }}
        onPress={() => pickImage({setImage: setCoverPic})}
      >
        <Image
          source={{uri: coverPic.uri}}
          style={{ width: "100%", height: "100%" }}
          resizeMode={"stretch"}
        />
      </Pressable>
      <Pressable
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 3,
          borderColor: "#1F52FF",
          marginHorizontal: "auto",
          marginVertical: 10,
          position: "absolute",
          alignSelf: "center",
          bottom: Platform.OS === "android" ? 65 : 20,
          backgroundColor: "#fff",
          zIndex: 2,
          ...Platform.select({
            web: { width: 200, height: 200, borderRadius: 100 },
          }),
        }}
        onPress={() => pickImage({ setImage: setProfilePic })}
      >
        <Image
          source={{ uri: profilePic.uri }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            ...Platform.select({
              web: { borderRadius: 100 },
            }),
          }}
          resizeMode={"cover"}
        />
      </Pressable>
      <Text
        style={{
          textAlign: "center",
          fontSize: 17,
          fontWeight: "bold",
          marginTop: 100,
        }}
      >
        {userData.name} {userData.surname}
      </Text>
    </View>
  );
};

export default TopProfile;
