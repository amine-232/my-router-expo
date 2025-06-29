import { Stack, Slot } from "expo-router";
import { AuthContext, SessionProvider } from "../Context/ctx";
import { useContext } from "react";

export const unstable_settings = {
  initialRouteName: "sign-in",
};

const AuthSack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootNavigation = () => {
  const { user } = useContext(AuthContext);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={user as any}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <AuthSack />
      </Stack.Protected>
    </Stack>
  );
};
export default function Layout() {
  return (
    <SessionProvider>
      <RootNavigation />
    </SessionProvider>
  );
}

Layout;
