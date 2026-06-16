import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useApp } from "@/context/AppProvider";
import ConfirmModal from "@/components/ConfirmModal";
import { formatFullDate } from "@/utils/formatDate";
import PrimaryButton from "@/components/PrimaryButton";
import CustomInput from "@/components/CustomInput";
import { COLORS } from "@/constants/colors";

export default function RegisterScreen() {
    const [title, setTitle] = useState("");
    const [successModalVisible, setSuccessModalVisible] = useState(false);
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
            <Text style={styles.heading}>TO DO LIST</Text>

            <Text style={styles.date}>{today}</Text>

            <CustomInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter a task..."
            />

            <PrimaryButton
                title="Save Task"
                onPress={handleAddTask}
            />

            <ConfirmModal
                visible={successModalVisible}
                title="Task added!"
                message="Your task was saved successfully."
                confirmText="OK"
                type="success"
                onConfirm={() => {
                    setSuccessModalVisible(false);
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