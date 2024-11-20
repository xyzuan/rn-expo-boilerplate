import BlogCard from "@/components/blog/blog-card";
import { blogAtom } from "@/services/blog";
import { useAtom } from "jotai";
import { View, Text, ScrollView } from "react-native";
import { TabbedHeaderPager } from "react-native-sticky-parallax-header";

const BlogPage = () => {
  const [{ data, isPending }] = useAtom(blogAtom);

  return (
    <TabbedHeaderPager
      rememberTabScrollPosition
      tabsContainerBackgroundColor={"#000"}
      backgroundColor={"#000"}
      tabsContainerStyle={{ paddingBottom: 18 }}
      tabTextActiveStyle={{ color: "#000" }}
      tabTextContainerActiveStyle={{ backgroundColor: "#fff" }}
      parallaxHeight={320}
      headerHeight={90}
      title={"My blogs, \nReady for a quiz?"}
      tabs={[
        { title: "Web" },
        { title: "Mobile" },
        { title: "Android Development" },
        { title: "DevOps" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView className="bg-primary-foreground rounded-t-3xl">
        {isPending && <Text>Loading...</Text>}
        {data && (
          <View className="flex flex-col gap-3 pb-24 p-6">
            {data.map((item) => (
              <BlogCard key={item.id} data={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </TabbedHeaderPager>
  );
};

export default BlogPage;
