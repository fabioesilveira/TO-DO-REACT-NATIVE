import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";

type PrimaryButtonProps = {
    title: string;
    onPress: () => void;
};

export default function PrimaryButton({
    title,
    onPress,
}: PrimaryButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: COLORS.accent,
        fontSize: 16,
        fontWeight: "bold",
    },
});