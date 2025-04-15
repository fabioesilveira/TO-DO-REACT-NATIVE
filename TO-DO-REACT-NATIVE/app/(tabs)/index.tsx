import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Loading from "../components/loading";

type List = {
  id: string;
  title: string;
};

export default function Index() {

  const [list, setList] = useState<List[]>([])

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
              <View style={styles.container}>
                <Text style={styles.text}>{item.id}-</Text>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            )}
          />
      }

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
