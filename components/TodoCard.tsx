import { StyleSheet, Text, TouchableOpacity } from "react-native";
import type { Todo } from "../types/Todo";

type TodoCardProps = {
    todo: Todo;
    onPress: () => void;
};

export default function TodoCard({
    todo,
    onPress,
}: TodoCardProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.title}>
                {todo.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },

        elevation: 3,
    },

    title: {
        fontSize: 18,
    },
});