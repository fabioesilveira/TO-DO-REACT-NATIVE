import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Loading from "../../components/loading";
import { useApp } from "@/context/AppProvider";

export default function Index() {

  const { nome, list } = useApp()
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>{nome}</Text>
      {
        list.length === 0 ?
          <Loading /> :
          <FlatList
            data={list}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/item/${item.id}`)}
                style={styles.container}
              >
                <Text style={styles.text}>{item.id} - {item.title}</Text>
              </TouchableOpacity>
            )}
          />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 18
  }
});