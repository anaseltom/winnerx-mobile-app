import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import WishList from "./wishList";

const Stack = createNativeStackNavigator();

export default function WishListIndex() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="WishList" component={WishList} />
{/* <Stack.Screen name="TabView" component={TabView} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <First_On_Boarding/>
}