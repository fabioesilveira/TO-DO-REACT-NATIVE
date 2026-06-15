import { StyleSheet, Text } from "react-native";

type TaskStatsProps = {
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
};

export default function TaskStats({
    totalTasks,
    completedTasks,
    activeTasks,
}: TaskStatsProps) {
    return (
        <Text style={styles.stats}>
            {totalTasks} tasks • {completedTasks} completed • {activeTasks} active
        </Text>
    );
}

const styles = StyleSheet.create({
    stats: {
        fontSize: 12,
        color: "#666",
        marginBottom: 10,
        marginLeft: 5,
    },
});