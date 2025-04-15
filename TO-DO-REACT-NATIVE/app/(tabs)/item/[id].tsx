import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ItemScreen() {
    
   const params = useLocalSearchParams()
   console.log(params)
    
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}