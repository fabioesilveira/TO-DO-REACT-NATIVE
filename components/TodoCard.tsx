import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { Todo } from "../types/Todo";

type TodoCardProps = {
    todo: Todo;
    onPress: () => void;
    onToggle: () => void;
};

export default function TodoCard({ todo, onPress, onToggle }: TodoCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <TouchableOpacity onPress={onToggle} style={styles.checkButton}>
                <Ionicons
                    name={todo.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={26}
                    color={todo.completed ? "#22c55e" : "#999"}
                />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        todo.completed && styles.completedTitle,
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },

        elevation: 3,
    },

    checkButton: {
        padding: 2,
    },

    content: {
        flex: 1,
    },

    title: {
        fontSize: 18,
        color: "#111",
    },

    completedTitle: {
        color: "#888",
        textDecorationLine: "line-through",
    },
});