import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";

type FilterButtonProps = {
    label: string;
    isActive: boolean;
    onPress: () => void;
};

export default function FilterButton({
    label,
    isActive,
    onPress,
}: FilterButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, isActive && styles.activeButton]}
            onPress={onPress}
        >
            <Text style={[styles.text, isActive && styles.activeText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
    },

    activeButton: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    text: {
        color: COLORS.secondaryText,
        fontWeight: "700",
    },

    activeText: {
        color: COLORS.accent,
    },
});