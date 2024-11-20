import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import { Link } from "expo-router";
import { View } from "react-native";

const MainPage = () => {
  return (
    <View className="flex justify-center items-center h-full px-8">
      <Card>
        <CardHeader>
          <P>Hello, this is xyzuan React Native Boilerplate</P>
        </CardHeader>
        <CardContent>
          <Link href="/about" asChild>
            <Button variant="default">
              <P>Go to About Page</P>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </View>
  );
};

export default MainPage;
