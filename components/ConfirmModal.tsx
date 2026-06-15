import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type ConfirmModalProps = {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: "success" | "danger";
    onCancel?: () => void;
    onConfirm: () => void;
};

export default function ConfirmModal({
    visible,
    title,
    message,
    confirmText = "OK",
    cancelText = "Cancel",
    type = "success",
    onCancel,
    onConfirm,
}: ConfirmModalProps) {
    const isDanger = type === "danger";

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.actions}>
                        {onCancel && (
                            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                                <Text style={styles.cancelText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.confirmButton, isDanger && styles.dangerButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    card: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 22,
    },

    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#25292e",
        marginBottom: 8,
        textAlign: "center",
    },

    message: {
        fontSize: 15,
        color: "#666",
        lineHeight: 22,
        marginBottom: 15,
        textAlign: "center",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },

    cancelButton: {
        paddingVertical: 11,
        paddingHorizontal: 18,
        borderRadius: 12,
        backgroundColor: "#f3f4f6",
    },

    confirmButton: {
        paddingVertical: 11,
        paddingHorizontal: 18,
        borderRadius: 12,
        backgroundColor: "#25292e",
    },

    dangerButton: {
        backgroundColor: "#ef4444",
    },

    cancelText: {
        fontWeight: "700",
        color: "#555",
    },

    confirmText: {
        fontWeight: "800",
        color: "#ffd33d",
    },
});