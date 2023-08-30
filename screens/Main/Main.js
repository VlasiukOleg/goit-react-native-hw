import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { RegistrationScreen } from "../RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../LoginScreen/LoginScreen";
import { HomeScreen } from "../Home/Home";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { MapScreen } from "../MapScreen/MapScreen";
import { CameraScreen } from "../СameraScreen/CamerScreen";
import { CommentsScreen } from "../CommentsScreen/CommentsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { refreshUser } from "../../redux/auth/operations";

import { useSelector } from "react-redux";
import { getIsLoggedIn, getIsRefreshing } from "../../redux/auth/selectors";

export const Main = () => {

    const MainStack = createStackNavigator();
    const isLoggedIn = useSelector(getIsLoggedIn);

    console.log("isLoggedIn", isLoggedIn);


    const initialRoute = isLoggedIn ? "HomeScreen" : "Login";

    console.log("initialRoute", initialRoute);

    return (
        <NavigationContainer>
          <MainStack.Navigator initialRouteName={initialRoute}>
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
              // options={headerPostsOptions}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="CreatePostsScreen"
              component={CreatePostsScreen}
            />
            <MainStack.Screen name="MapScreen" component={MapScreen} />
            <MainStack.Screen name="CameraScreen" component={CameraScreen} />
            <MainStack.Screen name="CommentsScreen" component={CommentsScreen} />
          </MainStack.Navigator>
        </NavigationContainer>
    )
}