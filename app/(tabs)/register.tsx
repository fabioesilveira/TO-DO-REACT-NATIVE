import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppProvider";

export default function RegisterScreen() {
    const [title, setTitle] = useState("");
    const { addTodo } = useApp();
    const router = useRouter();

    function handleAddTask() {
        if (!title.trim()) {
            Alert.alert("Missing task", "Please enter a task before saving.");
            return;
        }

        addTodo(title);
        setTitle("");
        router.push("/");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Task</Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter a task..."
                style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Save Task</Text>
            </TouchableOpacity>
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
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 16,
        fontSize: 18,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#25292e",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffd33d",
        fontSize: 16,
        fontWeight: "bold",
    },
});