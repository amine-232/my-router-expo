import {
  use,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebaseconfig";
import { router } from "expo-router";
import { UserData } from "../types/type";
import { StatusBar } from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";

axios.defaults.baseURL = "http://192.168.1.8:3000";
// axios.defaults.baseURL = "http://192.168.142.16:3000";

export const AuthContext = createContext<any>(null);

// This hook can be used to access the user info.

export const SessionProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [UserList, setUSerList] = useState<any[] | null>(null);

  const [userData, setUserData] = useState<UserData | false>(false);
  const [selectConve, setSelectedConv] = useState<any[] | false>(false);
  const [liveList, setLiveList] = useState<false | any[]>(false);
  const [storyList, setStoryList] = useState<false | any[]>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        if (userData === false && user.uid) {
          GetUserData({ userId: user.uid });
        }
        // router.push("(app)");
        router.push("(app)");
      } else {
        setUser(false);
        setUserId(null);
        router.push("sign-in");
      }
    });
  }, [user, userData, userId]);

  useEffect(() => {
    if (userId !== null) {
      GetData({ userId: userId });
    }
  }, [userId, liveList, storyList]);
  const GetUserData = async ({ userId }: { userId: string }) => {
    await db
      .collection("users")
      .doc(String(userId))
      .get()
      .then((doc: any) => {
        console.log("userData has been downloaded", doc.data());
        setUserData({ ...doc.data() });
      });
  };

 const uploadAndProcess = async ({
  videoUri,
  musicUri,
  startTime,
  endTime,
  musicStartTime,
  musicEndTime,
  musicVolume,
}: {
  startTime: any;
  endTime: any;
  musicStartTime: any;
  musicEndTime: any;
  musicVolume: any;
  musicUri: string;
  videoUri: string;
}) => {
  console.log(
    videoUri,
    musicUri,
    startTime,
    endTime,
    musicStartTime,
    musicEndTime,
    musicVolume
  );

  const formData = new FormData();

  formData.append("video", {
    uri: videoUri,
    name: "input.mp4",
    type: "video/mp4",
  } as any);

  formData.append("audio", {
    uri: musicUri,
    name: "music.mp3",
    type: "audio/mpeg",
  } as any);

  formData.append("videoStartTime", startTime.toString());
  formData.append("videoEndTime", endTime.toString());
  formData.append("musicStartTime", musicStartTime.toString());
  formData.append("musicEndTime", musicEndTime.toString());
  formData.append("musicVolume", musicVolume.toString());

  try {
    const response = await axios.post("/process", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // Receive video as a blob
    });

    const blob = new Blob([response.data], { type: "video/mp4" });
    const fileReaderInstance = new FileReader();

    fileReaderInstance.onload = async () => {
      const base64data = fileReaderInstance.result?.toString().split(",")[1];
      const filePath = FileSystem.documentDirectory + "processed-video.mp4";

      await FileSystem.writeAsStringAsync(filePath, base64data || "", {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("Processed video saved at:", filePath);
      
      // ✅ Set new video URI
      // setVideoUri(filePath);
    };

    fileReaderInstance.readAsDataURL(blob);
  } catch (error) {
    console.error("Error processing video:", error);
  }
};


  const GetData = async ({ userId }: { userId: string }) => {
    // await axois.post("/Get/User", { userId: userId }).then((response) => {
    //   if (response.data) {
    //     setUSerList(response.data.data as any[]);
    //     console.log("data of users from back end", response.data);
    //   }
    // });
  };

  return (
    <AuthContext
      value={{
        user: user,
        userData: userData,
        selectConve: selectConve,
        setSelectedConv: setSelectedConv,
        UserList: UserList,
        liveList: liveList,
        storyList: storyList,
        uploadAndProcess: uploadAndProcess
      }}
    >
      <StatusBar hidden={true} />
      {children}
    </AuthContext>
  );
};
