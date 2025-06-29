import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false, title: "Messages" }}
      />
      <Stack.Screen
        name="details"
        options={{ headerShown: true, title: "Messages" }}
      />
      <Stack.Screen
        name="ChatConv"
        options={{ headerShown: false, title: "ChatConv" }}
      />
      <Stack.Screen
        name="createStroy"
        options={{ headerShown: false, title: "CreateStroy" }}
      />
      <Stack.Screen
        name="goLive"
        options={{ headerShown: false, title: "goLive" }}
      />
    </Stack>
  );
};

const LayoutApp = () => {
  return (
    <>
      <StatusBar hidden={false} />
      <Layout />
    </>
  );
};

export default LayoutApp;
