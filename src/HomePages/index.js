import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Home from "./home";
import new_home from "./new_home";
import home from "./home";
import dev from "./video";

const Stack = createNativeStackNavigator();

export default function HomeIndex() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={home} />
        
        
        {/* <Stack.Screen name="video" component={dev} /> */}
{/* <Stack.Screen name="TabView" component={TabView} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <First_On_Boarding/>
}