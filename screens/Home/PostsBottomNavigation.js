import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { StyleSheet } from "react-native";

import { LogOutBtn } from "./ButtonLogOut";
import { BackBtn } from "./BackBtn";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tabs = createBottomTabNavigator();

export const PostsTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 60, paddingHorizontal: 80 },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "grid-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = focused ? "add-outline" : "add-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person-outline" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: "#FF6C00",
      //   inactiveTintColor: "gray",
      // }}
    >
      <Tabs.Screen
        name="Home"
        component={PostsScreen}
        options={headerPostsOptions}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={headerСreatePostsOptions}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

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
  headerLeft: () => <BackBtn />,

  headerTitleAlign: "center",
  headerTitleStyle: styles.titlePostsScreen,
  headerStyle: styles.headerPostsScreen,
  headerLeftContainerStyle: { paddingLeft: 10 },
};
