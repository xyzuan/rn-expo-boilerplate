import { BlogItem } from "@/commons/types/blog";
import { useQuery } from "@tanstack/react-query";
import { atomWithQuery } from "jotai-tanstack-query";

const blogAtom = atomWithQuery((get) => ({
  queryKey: ["blog"],
  queryFn: async (): Promise<BlogItem[]> => {
    const res = await fetch(`https://api.xyzuan.my.id/v2/blog/`).then((res) =>
      res.json()
    );
    return res.data;
  },
}));

const blogBySlug = (slug: string) =>
  useQuery({
    queryKey: ["blog", slug],
    queryFn: async (): Promise<BlogItem> => {
      const res = await fetch(
        `https://api-dev.xyzuan.my.id/v2/blog/${slug}`
      ).then((res) => res.json());
      return res.data;
    },
  });

export { blogAtom, blogBySlug };
