import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Loading from '@/app/components/loading';

export default function ItemDetail() {

    type List = {
        id: string;
        title: string;
    };

    const { id } = useLocalSearchParams();
    const [list, setList] = useState<List | null>(null)

    useEffect(() => {
        async function fetchApi() {
            const req = await axios.get(`https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList/${id}`)
            const res = req.data
            setList(res)
        }
        if (typeof id === 'string') {
            fetchApi();
        }
    }, [id])

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
                list === null ?
                    <Loading /> :
                    <View style={styles.container}>
                        <Text style={styles.title}>Task Selected</Text>
                        <Text>Number: {list.id}</Text>
                        <Text>Taks: {list.title}</Text>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    },
});