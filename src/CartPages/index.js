import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../HomePages/details";

import Cart from "./Cart";
import OrderSummary from "./OrderSummary";

const Stack = createNativeStackNavigator();

export default function CartIndex() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Cart" component={Cart} />
{/* <Stack.Screen name = "details" component={Details}/> */}
{/* <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ */}
   {/* tabBarStyle: { display: "none" },
}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <First_On_Boarding/>
}