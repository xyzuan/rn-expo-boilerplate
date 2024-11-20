import BlogCard from "@/components/blog/blog-card";
import Container from "@/components/ui/container";
import { blogAtom } from "@/services/blog";
import { useAtom } from "jotai";
import { View, Text, ScrollView } from "react-native";

const BlogPage = () => {
  const [{ data, isPending, isError }] = useAtom(blogAtom);

  return (
    <Container>
      <ScrollView scrollsToTop>
        {isPending && <Text>Loading...</Text>}
        {data && (
          <View className="flex gap-3 pb-24 px-6">
            {data.map((item) => (
              <BlogCard key={item.id} data={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default BlogPage;
