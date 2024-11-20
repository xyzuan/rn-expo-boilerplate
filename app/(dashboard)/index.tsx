import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "@/components/ui/icons";
import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ui/theme-toogle";

const MainPage = () => {
  const [progress, setProgress] = useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <Avatar alt="Rick Sanchez's Avatar" className="w-24 h-24">
            <AvatarImage
              source={{
                uri: "https://avatars.githubusercontent.com/u/57469823?v=4",
              }}
            />
            <AvatarFallback>
              <Text>RS</Text>
            </AvatarFallback>
          </Avatar>
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">Jody Yuantoro</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Software Engineer
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <View className="flex-row justify-around gap-3">
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Dimension</Text>
              <Text className="text-xl font-semibold">C-137</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Age</Text>
              <Text className="text-xl font-semibold">70</Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-muted-foreground">Species</Text>
              <Text className="text-xl font-semibold">Human</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <View className="flex-row items-center overflow-hidden">
            <Text className="text-sm text-muted-foreground">Productivity:</Text>
            <LayoutAnimationConfig skipEntering>
              <Animated.View
                key={progress}
                entering={FadeInUp}
                exiting={FadeOutDown}
                className="w-11 items-center"
              >
                <Text className="text-sm font-bold">{progress}%</Text>
              </Animated.View>
            </LayoutAnimationConfig>
          </View>
          <Progress value={progress} className="h-2" />
          <View />
          <View className="flex flex-row gap-6">
            <ThemeToggle />
            <Button
              className="shadow shadow-foreground/5"
              onPress={updateProgressValue}
            >
              <Text>Update Productivity</Text>
            </Button>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
};

export default MainPage;
