import { useLocalSearchParams } from "expo-router/build/hooks";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DetailsHeaderScrollView } from "react-native-sticky-parallax-header";
import Markdown from "react-native-markdown-display";
import { P } from "@/components/ui/typography";
import { blogBySlug } from "@/services/blog";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ChevronLeft, MenuIcon } from "@/components/ui/icons";
import { useNavigation } from "expo-router";

const DetailBlog = () => {
  const { blogSlug } = useLocalSearchParams<{ blogSlug: string }>();
  const { data, isPending, isError } = blogBySlug(blogSlug);
  const { isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  if (isPending) return <P>Loading...</P>;
  if (isError) return <P>Error occurred!</P>;

  return (
    <SafeAreaProvider>
      <DetailsHeaderScrollView
        leftTopIcon={() => (
          <ChevronLeft className="mt-10" size={24} color={"white"} />
        )}
        leftTopIconOnPress={goBack}
        rightTopIcon={() => (
          <MenuIcon className="mt-10" size={24} color={"#fff"} />
        )}
        contentIconNumber={10}
        hasBorderRadius
        image={{ uri: "https://avatars.githubusercontent.com/u/57469823?v=4" }}
        tag={"Developement"}
        title={data?.title}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 pb-24">
          <Markdown
            style={{
              text: {
                color: isDarkColorScheme ? "#fff" : "#000",
              },
            }}
          >
            {data?.content}
          </Markdown>
        </View>
      </DetailsHeaderScrollView>
    </SafeAreaProvider>
  );
};

export default DetailBlog;
