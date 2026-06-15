import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarActiveTintColor: "#ffd33d",
        tabBarInactiveTintColor: "#8a8a8a",

        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",

        tabBarStyle: {
          backgroundColor: "#25292e",
          height: 65,
          borderTopWidth: 0,
          paddingTop: 8,
        },

        tabBarIconStyle: {
          marginTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "",
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <AntDesign
              name={focused ? "pluscircle" : "pluscircleo"}
              color={color}
              size={32}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="item/[id]"
        options={{
          href: null,
          title: "",
        }}
      />
    </Tabs>
  );
}