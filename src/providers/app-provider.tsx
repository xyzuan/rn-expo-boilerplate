import "../../global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { ThemeProvider as ReactThemeProvider } from "@react-navigation/native";
import { SplashScreen as ExpoSplashScreen } from "expo-router";
import { Toaster } from "sonner-native";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DARK_THEME, LIGHT_THEME } from "@/commons/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export { ErrorBoundary } from "expo-router";
import { authAtom } from "@/atoms/auth.atom";

ExpoSplashScreen.preventAutoHideAsync();

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const [{ isSessionReady }, updateAuth] = useAtom(authAtom);
  const queryClient = new QueryClient();

  useEffect(() => {
    const initSession = async () => updateAuth({ action: "refresh" });
    initSession();
  }, []);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      ExpoSplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!isSessionReady) return null;

  return (
    <ReactThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <GestureHandlerRootView className="flex-1">
        <QueryClientProvider client={queryClient}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          {children}
          <Toaster />
          <PortalHost />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ReactThemeProvider>
  );
};

export default AppProvider;
