import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import TodoCard from "@/components/TodoCard";
import { useApp } from "@/context/AppProvider";

type FilterType = "all tasks" | "active" | "completed";

export default function Home() {
  const [filter, setFilter] = useState<FilterType>("all tasks");

  const { todos, toggleTodo, deleteTodo } = useApp();
  const router = useRouter();

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
      <Text style={styles.heading}>
        TO DO LIST
      </Text>

      <Text style={styles.date}>{today}</Text>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all tasks" && styles.activeFilter]}
          onPress={() => setFilter("all tasks")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all tasks" && styles.activeFilterText,
            ]}
          >
            All Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "active" && styles.activeFilter,
          ]}
          onPress={() => setFilter("active")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "active" && styles.activeFilterText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "completed" && styles.activeFilter,
          ]}
          onPress={() => setFilter("completed")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "completed" && styles.activeFilterText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.stats}>
        {totalTasks} tasks • {completedTasks} completed • {activeTasks} active
      </Text>

      {filteredTodos.length === 0 ? (
        <Text style={styles.empty}>{getEmptyMessage()}</Text>
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
    marginBottom: 25,
  },

  stats: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    marginLeft: 5,
  },

  filters: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },

  activeFilter: {
    backgroundColor: "#25292e",
    borderColor: "#25292e",
  },

  filterText: {
    color: "#555",
    fontWeight: "700",
  },

  activeFilterText: {
    color: "#ffd33d",
  },

  empty: {
    color: "#666",
    fontSize: 18,
  },

  listContent: {
    paddingBottom: 20,
  },
});