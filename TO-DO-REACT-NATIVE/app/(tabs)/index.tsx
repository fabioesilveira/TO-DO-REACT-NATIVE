import { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

const todoList = [
  { id: "1", task: "Buy groceries", completed: false },
  { id: "2", task: "Walk the dog", completed: true },
  { id: "3", task: "Finish React project", completed: false },
  { id: "4", task: "Call mom", completed: true },
  { id: "5", task: "Read 20 pages of a book", completed: false },
  { id: "6", task: "Clean the kitchen", completed: false },
  { id: "7", task: "Pay electricity bill", completed: true },
  { id: "8", task: "Practice coding challenges", completed: false },
  { id: "9", task: "Meditate for 10 minutes", completed: false },
  { id: "10", task: "Update LinkedIn profile", completed: true }
];

export default function Index() {

  const [list, setList] = useState(todoList)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.text}>{item.id}-</Text>
            <Text style={styles.text}>{item.task}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 25
  }
})
