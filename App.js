// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { CreatePostsScreen } from "./screens/CreatePostsScreen/CreatePostsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./screens/Home/Home";
import { MapScreen } from "./screens/MapScreen/MapScreen";
import { CameraScreen } from "./screens/СameraScreen/CamerScreen";
import { CommentsScreen } from "./screens/CommentsScreen/CommentsScreen";

import { onAuthStateChanged } from "firebase/auth";

import { Main } from "./screens/Main/Main";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { useNavigation } from "@react-navigation/native";


import { StyleSheet } from "react-native";
import { persistor, store } from "./redux/store";

const MainStack = createStackNavigator();

export default function App() {

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main/>
      </PersistGate>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  titlePostsScreen: {
    fontSize: 17,
  },
  headerPostsScreen: {
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
  },
});
