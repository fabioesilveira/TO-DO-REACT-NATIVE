import { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "@/context/AppProvider";
import ConfirmModal from "@/components/ConfirmModal";
import { formatFullDate } from "@/utils/formatDate";

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

                <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
                    <Text style={styles.buttonText}>Back to Tasks</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>TO DO LIST</Text>

            <Text style={styles.date}>{today}</Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Edit task..."
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
                <Text style={styles.buttonText}>Update Task</Text>
            </TouchableOpacity>

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
        backgroundColor: "#f3f4f6",
    },
    heading: {
        fontFamily: "LondrinaOutline_400Regular",
        fontSize: 60,
        textAlign: "center",
        letterSpacing: 2,
    },

    date: {
        textAlign: "center",
        color: "#777",
        fontSize: 14,
        marginBottom: 45,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#25292e",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffd33d",
        fontSize: 16,
        fontWeight: "bold",
    },
});