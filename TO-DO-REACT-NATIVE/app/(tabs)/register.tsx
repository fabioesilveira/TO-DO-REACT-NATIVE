import axios from "axios";
import { useState } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";


export default function RegisterScreen() {
    
    const [input, setInput] = useState("")

    async function fetchAPI () {
        const req = await axios.post("https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList", {
            title: input
        });

    }
    
    return (
        <View>
            <Text>HELLO</Text>

            <TextInput onChangeText={setInput} style={styles.input} placeholder="Digite algo..." />
            
            <Button title="Clique aqui" onPress={() => fetchAPI()} />
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
});