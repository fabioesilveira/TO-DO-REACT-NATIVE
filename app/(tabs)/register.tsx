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

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

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
            <Text style={styles.heading}>
                TO DO LIST
            </Text>

            <Text style={styles.date}>{today}</Text>

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
        fontFamily: "LondrinaOutline_400Regular",
        fontSize: 58,
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