import { BlogItem } from "@/commons/types/blog";
import { Card } from "../ui/card";
import { P } from "../ui/typography";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { formatDate, formatExcerpt, getTags } from "@/commons/utils/helpers";
import {
  Calendar1Icon,
  EyeIcon,
  FlameIcon,
  MessageSquareIcon,
} from "lucide-react-native";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Text } from "../ui/text";
import { Avatar, AvatarImage } from "../ui/avatar";

const BlogCard = ({ data }: { data: BlogItem }) => {
  const title = data.title.slice(0, 70) + (data.title.length > 70 ? "..." : "");
  const description =
    data.description.slice(0, 100) +
    (data.description.length > 80 ? "..." : "");
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Link
      asChild
      href={{
        pathname: "/blog/[blogSlug]",
        params: { blogSlug: data.slug },
      }}
    >
      <Card className="group relative flex h-96 w-full flex-col rounded-2xl overflow-hidden">
        <View className="relative h-full duration-500 overflow-hidden">
          <Image
            style={{ width: "100%", height: "100%" }}
            source={data.img}
            placeholder={blurhash}
            contentFit="cover"
            contentPosition={"left center"}
            transition={1000}
          />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.8)"]} // Adjust the gradient colors
            style={{
              position: "absolute",
              inset: 0, // Cover the entire parent view
            }}
          />
        </View>
        <View className="absolute flex h-full flex-col justify-between space-y-4 p-5">
          <View className="flex flex-row flex-wrap gap-2">
            {data.tags &&
              data.tags.length > 0 &&
              getTags(data.tags).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="rounded-full px-0 py-0 border-white/20 text-xs backdrop-blur-2xl overflow-hidden"
                >
                  <BlurView className="px-2.5 py-1" intensity={10}>
                    <Text className="font-mono text-white">
                      {tag?.charAt(0).toUpperCase() + tag?.slice(1)}
                    </Text>
                  </BlurView>
                </Badge>
              ))}
          </View>

          <View className="flex flex-col justify-end">
            <View className="flex flex-col gap-3">
              <P className=" text-lg font-medium text-neutral-100 group-hover:underline group-hover:underline-offset-4 ">
                {title}
              </P>
              <View className="flex flex-row gap-1 text-neutral-400">
                <Calendar1Icon size={14} color={"#fff"} />
                <Text className="ml-0.5 text-xs text-white">
                  {formatDate(data.createdAt)}
                </Text>
              </View>
              {!!description && (
                <P className="text-sm leading-relaxed text-neutral-400">
                  {formatExcerpt(description)}
                </P>
              )}
            </View>
            <Separator className="my-3 opacity-15" />

            <View className="flex flex-row justify-between items-center">
              <Avatar alt="xyzuan" className="w-6 h-6">
                <AvatarImage
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/57469823?v=4",
                  }}
                />
              </Avatar>

              <View className={"flex flex-row justify-between gap-4 "}>
                <View className="flex flex-row items-center gap-1">
                  <EyeIcon size={14} color={"#fff"} />
                  <Text className="ml-0.5 text-xs text-white font-medium">
                    {data.viewCount.toLocaleString()}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <MessageSquareIcon size={14} color={"#fff"} />
                  <Text className="ml-0.5 text-xs text-white font-medium">
                    {data.commentsCount.toLocaleString()}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <FlameIcon size={14} color={"#fff"} />
                  <Text className="ml-0.5 text-xs text-white font-medium">
                    {data.reactionsCount.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </Link>
  );
};

export default BlogCard;
