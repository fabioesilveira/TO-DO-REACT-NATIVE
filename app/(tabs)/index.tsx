import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import TodoCard from "@/components/TodoCard";
import { useApp } from "@/context/AppProvider";

export default function Home() {
  const { todos, toggleTodo, deleteTodo } = useApp();

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        My Tasks
      </Text>

      {todos.length === 0 ? (
        <Text style={styles.empty}>
          No tasks yet.
        </Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoCard
              todo={item}
              onPress={() => router.push(`/item/${item.id}`)}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          )}
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  empty: {
    color: "#666",
    fontSize: 18,
  },
});