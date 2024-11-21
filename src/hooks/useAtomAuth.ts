import { atom } from "jotai";
import * as SecureStore from "expo-secure-store";

const saveToSecureStorage = async (key: string, value: string | null) => {
  if (value !== null) {
    await SecureStore.setItemAsync(key, value);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

const getFromSecureStorage = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export const isLoadingAtom = atom(true);
export const sessionAtom = atom<string | null>(null);
export const loadSessionAtom = atom(
  async (get) => {
    const session = await getFromSecureStorage("session");
    get(isLoadingAtom);
    return session;
  },
  async (_, set, session: string | null) => {
    set(isLoadingAtom, true);
    await saveToSecureStorage("session", session);
    set(sessionAtom, session);
    set(isLoadingAtom, false);
  }
);

export const authAtom = atom(
  (get) => ({
    isLoading: get(isLoadingAtom),
    session: get(sessionAtom),
  }),
  async (
    get,
    set,
    { action, value }: { action: "signIn" | "signOut"; value?: string }
  ) => {
    if (action === "signIn" && value) {
      set(loadSessionAtom, value);
    } else if (action === "signOut") {
      set(loadSessionAtom, null);
    }
  }
);
