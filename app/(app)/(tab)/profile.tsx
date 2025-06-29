import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  FlatList,
  VirtualizedList,
  ImageSourcePropType,
  ColorValue,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/ctx";
import TopProfile from "../../Component/ProfileComp/TopProfile";
import ContactList from "../../Component/ProfileComp/ContactList";
import Album from "../../Component/ProfileComp/Album";
import ListITems from "../../Component/ProfileComp/ListITems";
import HistoryIcon from "../../../assets/history.png";
import EditIcon from "../../../assets/editUser.png";
import IconBtn from "../../Component/IconBtn";

const IconView = ({
  icon,
  size,
  color,
}: {
  icon: any;
  size: number;
  color: ColorValue;
}) => {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={icon as ImageSourcePropType}
        style={{ width: size, height: size }}
        tintColor={color}
        resizeMode={"contain"}
      />
    </View>
  );
};

const About = () => {
  return (
    <View
      style={{
        width: "90%",
        height: 400,
        borderWidth: 1,
        borderColor: "silver",
        marginHorizontal: "auto",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "auto",
          padding: 5,
          borderBottomWidth: 1,
          borderColor: "silver",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "auto", height: "auto", marginVertical: "auto" , marginHorizontal: 10}}>
          <IconView icon={HistoryIcon} size={25} color={"black"} />
        </View>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}>
          About Me
        </Text>

        <View style={{ width: "auto", height: "auto", marginVertical: "auto" , marginHorizontal: 10}}>
          <IconBtn icon={EditIcon} size={25} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

const TextBox = ({ title }: { title: string }) => {
  return (
    <Text
      style={{
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
      }}
    >
      {title}
    </Text>
  );
};

const TestText = () => {
  return (
    <View
      style={{
        width: "30%",
        alignSelf: "center",
        height: 100,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: "silver",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginHorizontal: Platform.OS === "android" ? 10 : "auto",
      }}
    >
      <Text style={{ textAlign: "center", marginTop: 35 }}>VideosCard</Text>
    </View>
  );
};
const getItem = (data: any[], index: number) => data[index];
const getItemCount = (data: any) => data.length;
const ProfileTab = () => {
  const { userData } = useContext(AuthContext);
  const ListItemAndroid = [
    { key: "ProfileTab", component: () => <TextBox title="ProfileTab" /> },
    {
      key: "TopProfile",
      component: () => userData !== false && <TopProfile userData={userData} />,
    },
    { key: "aboutMe", component: () => <About /> },

    {
      key: "Album",
      component: () => <Album />,
    },
    {
      key: "ContactList",
      component: () => <ContactList />,
    },
  ];
  // {
  //   key: "videos",
  //   component: () => (
  //     <ListITems
  //       numColumns={3}
  //       data={Array.from({ length: 100 }, () => ({}))}
  //       Component={(item: any) => <TestText />}
  //     />
  //   ),
  // },
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {Platform.OS === "android" ? (
          <VirtualizedList
            data={ListItemAndroid}
            initialNumToRender={1}
            getItem={getItem}
            getItemCount={getItemCount}
            renderItem={({ item }) => item.component()}
            extraData={({ item, index }: { item: any; index: number }) => item}
          />
        ) : (
          <View
            style={{ width: "100%", height: "99.9%", flexDirection: "column" }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextBox title="ProfileTab" />
              {userData !== false ? <TopProfile userData={userData} /> : null}
              <View
                style={{
                  width: "100%",
                  height: "auto",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Album />
                <ContactList />
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileTab;
