import { P } from "@/components/ui/typography";
import { useAuth } from "@/providers/auth-provider";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

const RootIndex = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View>
        <P>Authenticating...</P>
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/login"} />;
  }

  return <Redirect href={"/main"} />;
};

export default RootIndex;
