import { View, TextInput, StyleSheet, Text } from "react-native";
import { Controller } from "react-hook-form";

export const CustomInput = ({
  control,
  name,
  placeholder,
  setFocus,
  secureTextEntry,
  isLoginFocus,
  rules = {},
  errorColorText,
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <TextInput
            style={{
              ...styles.input,
              borderColor: isLoginFocus ? "#FF6C00" : "#E8E8E8",
              backgroundColor: isLoginFocus ? "white" : "#F6F6F6",
            }}
            value={value}
            placeholder={error ? error.message : placeholder}
            placeholderTextColor={error ? errorColorText : "#BDBDBD"}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
          />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 343,
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
});
