import { ReactNode } from "react";
import { SafeAreaView } from "react-native";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <SafeAreaView className="bg-primary-foreground">{children}</SafeAreaView>
  );
};

export default Container;
