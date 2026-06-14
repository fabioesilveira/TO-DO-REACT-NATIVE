import {
    Alert,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { Todo } from "../types/Todo";

type TodoCardProps = {
    todo: Todo;
    onPress: () => void;
    onToggle: () => void;
    onDelete: () => void;
};

export default function TodoCard({
    todo,
    onPress,
    onToggle,
    onDelete,
}: TodoCardProps) {
    function confirmDelete() {
        if (Platform.OS === "web") {
            const confirmed = window.confirm(
                "Are you sure you want to delete this task?"
            );

            if (confirmed) {
                onDelete();
            }

            return;
        }

        Alert.alert("Delete task", "Are you sure you want to delete this task?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: onDelete,
            },
        ]);
    }

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <TouchableOpacity
                onPress={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
                style={styles.checkButton}
            >
                <Ionicons
                    name={todo.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={26}
                    color={todo.completed ? "#22c55e" : "#999"}
                />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={[styles.title, todo.completed && styles.completedTitle]}>
                    {todo.title}
                </Text>
            </View>

            <TouchableOpacity
                onPress={(e) => {
                    e.stopPropagation();
                    confirmDelete();
                }}
                style={styles.deleteButton}
            >
                <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
        </Pressable>
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

    deleteButton: {
        padding: 4,
    },
});