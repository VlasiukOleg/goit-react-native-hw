// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0A66C2",
//     color: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   color: {
//     color: "#fff",
//   },
// });

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.color}>My first React Native project!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <RegistrationScreen />
  );
}
