import { Stack } from "expo-router";
import { View } from "react-native";

const BlogLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          header: () => <View className="h-12 bg-black" />,
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name="[blogSlug]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default BlogLayout;
