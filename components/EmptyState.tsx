import { StyleSheet, Text } from "react-native";

type EmptyStateProps = {
    message: string;
};

export default function EmptyState({
    message,
}: EmptyStateProps) {
    return (
        <Text style={styles.empty}>
            {message}
        </Text>
    );
}

const styles = StyleSheet.create({
    empty: {
        color: "#666",
        fontSize: 18,
        textAlign: "center",
        marginTop: 40,
    },
});