import "../../global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider as ReactThemeProvider } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "@rn-primitives/portal";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DARK_THEME, LIGHT_THEME } from "@/commons/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth-provider";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  const queryClient = new QueryClient();

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
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ReactThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          {children}
          <PortalHost />
        </QueryClientProvider>
      </AuthProvider>
    </ReactThemeProvider>
  );
};

export default ThemeProvider;
