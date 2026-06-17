import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.inactive,

        headerStyle: {
          backgroundColor: COLORS.primary,
        },

        headerShadowVisible: false,
        headerTintColor: COLORS.white,

        tabBarStyle: {
          backgroundColor: COLORS.primary,
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
        name="edit/[id]"
        options={{
          href: null,
          title: "",
        }}
      />
    </Tabs>
  );
}