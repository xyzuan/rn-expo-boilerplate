import { SafeAreaView, View } from "react-native";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, P } from "@/components/ui/typography";
import TextInputRHF from "@/components/rhf/text-input-rhf";
import { useForm } from "react-hook-form";
import { signInAtom } from "@/services/auth";
import { router } from "expo-router";
import { authAtom } from "@/atoms/auth.atom";
import { toast } from "sonner-native";

const LoginPage = () => {
  const [{ mutateAsync: login }] = useAtom(signInAtom);
  const [_, updateAuth] = useAtom(authAtom);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data: Record<string, string>) => {
    try {
      toast.promise(
        login({ email: data?.email, password: data?.password }).then(
          async (res) => {
            if (res?.status === "200") {
              await updateAuth({ action: "signIn", value: res.token }).then(
                () => router.replace("/")
              );
            } else {
              throw new Error(res ? res.message : "Error signing in");
            }
          }
        ),
        {
          loading: "Signing in...",
          success: () => "Signed in successfully",
          error: (error) => String(error),
        }
      );
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
          label="Email Address"
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          }}
        />
        <TextInputRHF
          className="mt-3"
          control={control}
          label="Password"
          name="password"
        />
        <Button
          className="mt-6"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Sign to Your Account</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
