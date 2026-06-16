import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Todo } from "../types/Todo";
import ConfirmModal from "./ConfirmModal";
import { formatDate } from "@/utils/formatDate";
import { COLORS } from "@/constants/colors";

type TodoCardProps = {
    todo: Todo;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

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
                        color={todo.completed ? COLORS.success : COLORS.mutedText}
                    />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={[styles.title, todo.completed && styles.completedTitle]}>
                        {todo.title}
                    </Text>

                    <Text style={styles.date}>
                        Created {formatDate(todo.createdAt)}
                    </Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                        <MaterialCommunityIcons
                            name="square-edit-outline"
                            size={22}
                            color={COLORS.blue}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setDeleteModalVisible(true)}
                        style={styles.actionButton}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={22}
                            color={COLORS.danger}
                        />
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
        backgroundColor: COLORS.white,
        padding: 16,
        marginBottom: 12,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,

        borderWidth: 1,
        borderColor: COLORS.border,

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
        color: COLORS.text,
    },

    completedTitle: {
        color: COLORS.mutedText,
        textDecorationLine: "line-through",
    },

    date: {
        marginTop: 4,
        fontSize: 13,
        color: COLORS.secondaryText,
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