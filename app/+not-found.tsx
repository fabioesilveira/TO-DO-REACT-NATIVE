import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>

      <Text style={styles.message}>
        This screen does not exist.
      </Text>

      <Link href="/" style={styles.button}>
        Back to Tasks
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontFamily: "LondrinaOutline_400Regular",
    fontSize: 64,
    color: COLORS.accent,
    marginBottom: 8,
  },

  message: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 24,
  },

  button: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.accent,
    textDecorationLine: "none",
  },
});