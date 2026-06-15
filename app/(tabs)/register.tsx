import { useState, useRef } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useApp } from "@/context/AppProvider";
import ConfirmModal from "@/components/ConfirmModal";
import type { TextInput as TextInputType } from "react-native";
import { formatFullDate } from "@/utils/formatDate";

export default function RegisterScreen() {
    const [title, setTitle] = useState("");
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const inputRef = useRef<TextInputType>(null);
    const { addTodo } = useApp();

    const today = formatFullDate();

    function handleAddTask() {
        if (!title.trim()) {
            Alert.alert("Missing task", "Please enter a task before saving.");
            return;
        }

        addTodo(title);
        setTitle("");
        setSuccessModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                TO DO LIST
            </Text>

            <Text style={styles.date}>{today}</Text>

            <TextInput
                ref={inputRef}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter a task..."
                style={styles.input}
                autoFocus
                returnKeyType="done"
            />

            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Save Task</Text>
            </TouchableOpacity>

            <ConfirmModal
                visible={successModalVisible}
                title="Task added!"
                message="Your task was saved successfully."
                confirmText="OK"
                type="success"
                onConfirm={() => {
                    setSuccessModalVisible(false);

                    setTimeout(() => {
                        inputRef.current?.focus();
                    }, 250);
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