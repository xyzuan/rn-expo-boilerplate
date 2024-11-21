import { LoginResponse } from "@/commons/types/auth";
import { atomWithMutation } from "jotai-tanstack-query";

const signInAtom = atomWithMutation(() => ({
  mutationKey: ["auth", "login"],
  mutationFn: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    const res = await fetch(`https://api-dev.xyzuan.my.id/v2/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return res;
  },
}));

export { signInAtom };
