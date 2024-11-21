import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import { atom, useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, P } from "@/components/ui/typography";
import { useAuth } from "@/providers/auth-provider";
import TextInputRHF from "@/components/rhf/text-input-rhf";
import { useForm } from "react-hook-form";
import { signInAtom } from "@/services/auth";

const LoginPage = () => {
  const { signIn } = useAuth();
  const [{ mutate, status, data, error }] = useAtom(signInAtom);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data: Record<string, string>) => {
    try {
      signIn();
      // mutate({ email: data?.email, password: data?.password });
      router.replace("/main");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View className="flex justify-center h-full flex-col gap-3 p-8">
        <View className="flex gap-3 max-w-60">
          <H1>NAUZYXHUB ゲートウェイ</H1>
          <P className="opacity-70">
            Enter your account credentials to enter eden area.
          </P>
        </View>
        <TextInputRHF
          className="mt-3"
          control={control}
          name="Email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          }}
        />
        <TextInputRHF className="mt-3" control={control} name="Password" />
        <Button
          className="mt-6"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Sign to Your Account</Text>
        </Button>
        <Text>{status}</Text>
        <Text>{data?.setCookie}</Text>
        <Text>{error?.toString()}</Text>
        {/* <Text>{data.toString()}</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
