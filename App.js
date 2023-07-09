// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import { RegistrationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { CreatePostsScreen } from "./screens/CreatePostsScreen/CreatePostsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./screens/Home/Home";
import { LogOutBtn } from "./screens/Home/ButtonLogOut";
import { StyleSheet } from "react-native";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={headerPostsOptions}
        />
        <MainStack.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={headerСreatePostsOptions}
        />
      </MainStack.Navigator>
    </NavigationContainer>
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

const headerPostsOptions = {
  title: "Публікації",
  headerLeft: () => null,
  headerRight: () => <LogOutBtn />,

  headerTitleAlign: "center",
  headerTitleStyle: styles.titlePostsScreen,
  headerStyle: styles.headerPostsScreen,
  headerRightContainerStyle: { paddingRight: 10 },
};

const headerСreatePostsOptions = {
  title: "Створити публікацію",
  // headerLeft: () => null,
  headerRight: () => <LogOutBtn />,

  headerTitleAlign: "center",
  headerTitleStyle: styles.titlePostsScreen,
  headerStyle: styles.headerPostsScreen,
  headerRightContainerStyle: { paddingRight: 10 },
};
