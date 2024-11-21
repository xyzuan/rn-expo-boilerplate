import { Control, Controller, RegisterOptions } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/commons/utils";
import { Label } from "../ui/label";
import { View } from "react-native";

const TextInputRHF = ({
  control,
  name,
  className,
  rules,
  ...props
}: {
  control: Control;
  name: string;
  className?: string;
  rules?: RegisterOptions;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, onBlur } }) => (
        <View className={cn("w-full", className)}>
          <Label nativeID={name}>{name}</Label>
          <Input
            className="mt-3"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            {...props}
          />
        </View>
      )}
    />
  );
};

export default TextInputRHF;
