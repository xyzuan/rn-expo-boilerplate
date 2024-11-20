import { Stack } from "expo-router";

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
          headerShown: false,
          title: "Blog",
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
