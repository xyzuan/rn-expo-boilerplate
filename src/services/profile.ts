import { sessionAtom } from "@/atoms/auth.atom";
import { Profile } from "@/commons/types/profile";
import { atomWithQuery } from "jotai-tanstack-query";

const myProfileAtom = atomWithQuery((get) => ({
  queryKey: ["profile", get(sessionAtom)],
  queryFn: async ({ queryKey: [_, session] }): Promise<Profile> => {
    const res = await fetch(`https://api-dev.xyzuan.my.id/v2/me/`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }).then((res) => res.json());
    return res;
  },
}));

export { myProfileAtom };
