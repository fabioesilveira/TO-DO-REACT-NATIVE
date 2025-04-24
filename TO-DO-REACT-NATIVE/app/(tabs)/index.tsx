import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Loading from "../components/loading";

type List = {
  id: string;
  title: string;
};

export default function Index() {

  const [list, setList] = useState<List[]>([])
  const router = useRouter();

  useEffect(() => {
    async function fetchAPI() {
      const req = await axios.get("https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList")
      const res = req.data
      setList(res)
    }

    fetchAPI();
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>Edit app/index.tsx to edit this screen.</Text>

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