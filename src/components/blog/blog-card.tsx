import { BlogItem } from "@/commons/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { P } from "../ui/typography";

const BlogCard = ({ data }: { data: BlogItem }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <P>{data.description}</P>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
