import { useAtom } from "jotai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H4, P } from "@/components/ui/typography";
import { router } from "expo-router";
import { View } from "react-native";
import { myProfileAtom } from "@/services/profile";
import { authAtom } from "@/atoms/auth.atom";

const ProfilePage = () => {
  const [{ data }] = useAtom(myProfileAtom);
  const [_, updateAuth] = useAtom(authAtom);

  const handleLogout = async () => {
    try {
      await updateAuth({ action: "signOut" }).then(() =>
        router.replace("/login")
      );
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex justify-center items-center h-full px-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-6 items-center">
          <Avatar className="w-20 h-20" alt="avatar">
            <AvatarImage
              source={{
                uri: "https://avatars.githubusercontent.com/u/57469823?v=4",
              }}
            />
            <AvatarFallback>
              <Text>JY</Text>
            </AvatarFallback>
          </Avatar>
          <View>
            <H4>{data?.name}</H4>
            <P>Software Engineer</P>
          </View>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">
            <Text>Visit Github</Text>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onPress={() => handleLogout()}
          >
            <Text>Log Out</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
};

export default ProfilePage;
