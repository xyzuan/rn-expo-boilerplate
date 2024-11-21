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

export { saveToSecureStorage, getFromSecureStorage };
