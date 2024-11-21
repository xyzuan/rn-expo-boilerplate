import { atomWithMutation } from "jotai-tanstack-query";

const signInAtom = atomWithMutation(() => ({
  mutationKey: ["auth", "login"],
  mutationFn: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch(`https://api-dev.xyzuan.my.id/v2/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const setCookie = res.headers.get("set-cookie");
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.body}`);
    }
    return { setCookie, data };
  },
}));

export { signInAtom };
