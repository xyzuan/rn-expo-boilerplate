import { atom } from "jotai";
import {
  getFromSecureStorage,
  saveToSecureStorage,
} from "@/commons/utils/secureStorage";

const isSessionReady = atom<boolean>(false);
const sessionAtom = atom<string | null>(null);
const loadSessionAtom = atom(
  async () => {
    return await getFromSecureStorage("session");
  },
  async (_, set, session: string | null) => {
    set(sessionAtom, session);
    await saveToSecureStorage("session", session);
  }
);

const authAtom = atom(
  (get) => {
    return {
      isSessionReady: get(isSessionReady),
      session: get(sessionAtom),
    };
  },
  async (
    get,
    set,
    {
      action,
      value,
    }: { action: "signIn" | "signOut" | "refresh"; value?: string }
  ) => {
    if (action === "signIn" && value) {
      await set(loadSessionAtom, value);
    } else if (action === "signOut") {
      await set(loadSessionAtom, null);
    } else if (action === "refresh") {
      const session = await get(loadSessionAtom);
      if (session) set(sessionAtom, session);
      set(isSessionReady, true);
    }
  }
);

export { authAtom, sessionAtom, loadSessionAtom };
