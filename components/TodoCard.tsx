import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Todo } from "../types/Todo";
import ConfirmModal from "./ConfirmModal";

type TodoCardProps = {
    todo: Todo;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function TodoCard({
    todo,
    onToggle,
    onEdit,
    onDelete,
}: TodoCardProps) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    function handleConfirmDelete() {
        onDelete();
        setDeleteModalVisible(false);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={onToggle} style={styles.checkButton}>
                    <Ionicons
                        name={todo.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={28}
                        color={todo.completed ? "#22c55e" : "#9ca3af"}
                    />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={[styles.title, todo.completed && styles.completedTitle]}>
                        {todo.title}
                    </Text>

                    <Text style={styles.date}>Created {formatDate(todo.createdAt)}</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={22}
                            color="#2563eb"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setDeleteModalVisible(true)}
                        style={styles.actionButton}
                    >
                        <Ionicons name="trash-outline" size={22} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>

            <ConfirmModal
                visible={deleteModalVisible}
                title="Delete task?"
                message="This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                onCancel={() => setDeleteModalVisible(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,

        borderWidth: 1,
        borderColor: "#e5e7eb",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
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
        fontSize: 17,
        fontWeight: "600",
        color: "#111827",
    },

    completedTitle: {
        color: "#9ca3af",
        textDecorationLine: "line-through",
    },

    date: {
        marginTop: 4,
        fontSize: 13,
        color: "#6b7280",
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    actionButton: {
        padding: 4,
    },
});