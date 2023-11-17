import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Profile";
import ADD_new_address from "./ADD_new_address";
import Account_Details from "./Account_Details";
// import Login from "../Authentication/Login";
import otp from "../Authentication/otp2";
import OtpWithEmail from "../Authentication/otpwithEmail";

const Stack = createNativeStackNavigator();

export default function ProfileIndex() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Screen" component={ADD_new_address} />
        {/* <Stack.Screen name="account" component={Account_Details} />  */}


{/* <Stack.Screen name="otp" component={otp}/> */}
{/* <Stack.Screen name="OtpWithEmail" component={OtpWithEmail}/> */}

        {/* <Stack.Screen name="TabView" component={TabView} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <First_On_Boarding/>
}
