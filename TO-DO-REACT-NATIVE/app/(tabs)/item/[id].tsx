import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import Loading from '@/components/loading';

export default function ItemDetail() {

    type List = {
        id: string;
        title: string;
    };

    const { id } = useLocalSearchParams();
    const [list, setList] = useState<List | null>(null)
    const [notFound, setNotFound] = useState(false)
    const [updateTask, setUpdateTask] = useState("")
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        async function fetchApi() {
            try {
                const req = await axios.get(`https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList/${id}`)
                const res = req.data
                setList(res)
            } catch (error) {
                console.error("estou aqui", error)
                setNotFound(true)
            }
        }
        if (typeof id === 'string') {
            fetchApi();
        }
    }, [id])

    async function handleDelete() {
        const req = await axios.delete(`https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList/${id}`)
        const res = req.data
        console.log(res)

    }

    function handleEdit() {
        setEdit(true)
    }

    async function handleSubmit() {
        await axios.put(`https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList/${id}`, {
            title: updateTask
        })
    }

    if (notFound === true) {
        return <Text>This task no longer exists.</Text>
    }

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
                        <SimpleLineIcons onPress={handleEdit} name="pencil" size={24} color="black" />
                        <AntDesign onPress={handleDelete} name="closecircle" size={24} color="black" />
                    </View>
            }

            {
                edit === false ?
                    null :
                    <View>
                        <TextInput onChangeText={setUpdateTask} style={styles.input} placeholder="Digite algo..." />
                        <Button title="Clique aqui" onPress={handleSubmit} />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
});