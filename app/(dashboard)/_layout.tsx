import { Tabs } from "expo-router";
import {
  BookText,
  Coffee,
  HomeIcon,
  Info,
  MessageCircle,
  Rss,
  User,
} from "@/components/ui/icons";
import { NAV_THEME } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomNav from "@/components/ui/bottom-nav";

export default function DashboardLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <BottomNav
          focusColor={
            isDarkColorScheme ? NAV_THEME.dark.primary : NAV_THEME.light.primary
          }
          primaryColor={
            isDarkColorScheme ? NAV_THEME.dark.card : NAV_THEME.light.card
          }
          {...props}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="resume"
        options={{
          title: "Resume",
          tabBarIcon: ({ color }) => <BookText size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          title: "Project",
          tabBarIcon: ({ color }) => <Coffee size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ color }) => <Rss size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <MessageCircle size={18} color={color} />,
        }}
      />
    </Tabs>
  );
}
