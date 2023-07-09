import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { StyleSheet } from "react-native";

const Tabs = createBottomTabNavigator();

export const PostsTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Home" component={PostsScreen} />
      <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};
