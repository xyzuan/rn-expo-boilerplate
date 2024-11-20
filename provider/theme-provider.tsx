import "../global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider as ReactThemeProvider } from "@react-navigation/native";
import { SplashScreen } from "expo-router";
import { Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "@/constants";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
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
      {children}
    </ReactThemeProvider>
  );
};

export default ThemeProvider;