import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },

    activeButton: {
        backgroundColor: "#25292e",
        borderColor: "#25292e",
    },

    text: {
        color: "#555",
        fontWeight: "700",
    },

    activeText: {
        color: "#ffd33d",
    },
});