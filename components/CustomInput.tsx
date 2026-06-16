import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "@/constants/colors";

type CustomInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
};

const CustomInput = forwardRef<TextInput, CustomInputProps>(
    ({ value, onChangeText, placeholder }, ref) => {
        return (
            <TextInput
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.input}
            />
        );
    }
);

export default CustomInput;

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },
});