import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export default function RegisterScreen() {
    const [input, setInput] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Task</Text>

            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Enter a task..."
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 15,
        fontSize: 18,
    },
});