import { Card, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

const MainPage = () => {
  return (
    <View className="flex justify-center items-center h-full px-16">
      <Card>
        <CardHeader>
          <Text>Hello, this is xyzuan React Native Boilerplate</Text>
        </CardHeader>
      </Card>
    </View>
  );
};

export default MainPage;
