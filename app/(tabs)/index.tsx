import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import TodoCard from "@/components/TodoCard";
import { useApp } from "@/context/AppProvider";
import { formatFullDate } from "@/utils/formatDate";
import FilterButton from "@/components/FilterButton";
import TaskStats from "@/components/TaskStats";
import EmptyState from "@/components/EmptyState";
import { COLORS } from "@/constants/colors";

type FilterType = "all tasks" | "active" | "completed";

export default function Home() {
  const [filter, setFilter] = useState<FilterType>("all tasks");

  const { todos, toggleTodo, deleteTodo } = useApp();
  const today = formatFullDate();
  const router = useRouter();

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  function getEmptyMessage() {
    if (filter === "active") return "No active tasks.";
    if (filter === "completed") return "No completed tasks yet.";
    return "No tasks yet.";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TO DO LIST</Text>

      <Text style={styles.date}>{today}</Text>

      <View style={styles.filters}>
        <FilterButton
          label="All Tasks"
          isActive={filter === "all tasks"}
          onPress={() => setFilter("all tasks")}
        />

        <FilterButton
          label="Active"
          isActive={filter === "active"}
          onPress={() => setFilter("active")}
        />

        <FilterButton
          label="Completed"
          isActive={filter === "completed"}
          onPress={() => setFilter("completed")}
        />
      </View>

      <TaskStats
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        activeTasks={activeTasks}
      />

      {filteredTodos.length === 0 ? (
        <EmptyState message={getEmptyMessage()} />
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onEdit={() => router.push(`/item/${item.id}`)}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    marginBottom: 25,
  },

  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  listContent: {
    paddingBottom: 20,
  },
});