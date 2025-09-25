import { View, Text, StyleSheet } from "react-native";

export default function SorteioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sorteio</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B0B0B", alignItems: "center", justifyContent: "center" },
  text: { color: "#f2f2f2", fontSize: 22, fontWeight: "700" },
});
