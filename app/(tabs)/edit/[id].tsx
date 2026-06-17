import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "@/context/AppProvider";
import ConfirmModal from "@/components/ConfirmModal";
import { formatFullDate } from "@/utils/formatDate";
import PrimaryButton from "@/components/PrimaryButton";
import CustomInput from "@/components/CustomInput";
import { COLORS } from "@/constants/colors";

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { todos, updateTodo } = useApp();
    const today = formatFullDate();

    const todo = todos.find((item) => item.id === id);
    const [title, setTitle] = useState("");
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
        }
    }, [todo]);

    function handleUpdateTask() {
        if (!id) return;

        if (!title.trim()) {
            Alert.alert("Missing task", "Please enter a task before saving.");
            return;
        }

        updateTodo(id, title);
        setSuccessModalVisible(true);
    }

    if (!todo) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Task not found</Text>

                <PrimaryButton
                    title="Back to Tasks"
                    onPress={() => router.push("/")}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>TO DO LIST</Text>

            <Text style={styles.date}>{today}</Text>

            <CustomInput
                value={title}
                onChangeText={setTitle}
                placeholder="Edit task..."
            />

            <PrimaryButton
                title="Update Task"
                onPress={handleUpdateTask}
            />

            <ConfirmModal
                visible={successModalVisible}
                title="Task updated!"
                message="Your changes were saved successfully."
                confirmText="OK"
                type="success"
                onConfirm={() => {
                    setSuccessModalVisible(false);
                    router.push("/");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },

    heading: {
        fontFamily: "LondrinaOutline_400Regular",
        fontSize: 60,
        textAlign: "center",
        letterSpacing: 2,
        color: COLORS.primary,
    },

    date: {
        textAlign: "center",
        color: COLORS.secondaryText,
        fontSize: 14,
        marginBottom: 45,
    },
});