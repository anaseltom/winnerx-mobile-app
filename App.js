//android sha1 development :56:C1:A2:0B:5A:2C:6C:B8:6C:02:D9:40:5A:D5:8F:AF:1E:87:6F:38
// https://paypage.sandbox.ngenius-payments.com/?code=8ea96c877dd44b41
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// // OnBoarding Screens
import First_On_Boarding from "./src/OnBoarding/OnBoardingFirst";
import TabView from "./src/component/TabView";
import ADD_new_address from "./src/Profile/ADD_new_address";
import Account_Details from "./src/Profile/Account_Details";

import OrderSummary from "./src/CartPages/OrderSummary";
import OrderDetail from "./src/CartPages/Orderdetail";
import delivery from "./src/CartPages/delivery";
import dev from "./src/HomePages/video";
import { Video } from "expo-av";
import onboarding1 from "./src/HomePages/onboarding";
import HomeSearch from "./src/HomePages/new_home";

import Prize from "./src/HomePages/detail1";
import Product from "./src/HomePages/detail2";
import onboarding2 from "./src/HomePages/onboard/onboarding2";
import video2 from "./src/HomePages/onboard/video2";
import Login from "./src/Authentication/Login";

import OtpWithEmail from "./src/Authentication/otpwithEmail";
import otp from "./src/Authentication/otp2";

import Success from "./src/Authentication/Succes";
import Signup from "./src/Authentication/Signup";

import Payment from "./src/CartPages/payment";
import Select_Payment from "./src/CartPages/selectPayment";
import Details from "./src/HomePages/details";
import New_Details from "./src/HomePages/newdetails";
import Dev from "./src/HomePages/video";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="First_On_Boarding" component={First_On_Boarding} /> */}
        <Stack.Screen name="on1" component={onboarding1} />
        <Stack.Screen name="on2" component={onboarding2} />
        <Stack.Screen name="vid" component={video2} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TabView" component={TabView} />
        <Stack.Screen name="delivery" component={delivery} />
        <Stack.Screen name="Screen" component={ADD_new_address} />
        <Stack.Screen name="account" component={Account_Details} />
        <Stack.Screen name="otp" component={otp} />
        <Stack.Screen name="OtpWithEmail" component={OtpWithEmail} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="dev" component={dev} />
<Stack.Screen name="Search" component={HomeSearch}/>
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="NewDetail" component={New_Details}/>
        <Stack.Screen name="prize" component={Prize} />
        <Stack.Screen name="product" component={Product} />
        <Stack.Screen name="otpp" component={otp} />
        <Stack.Screen name="Sign_up" component={Signup} />
        <Stack.Screen name="Success" component={Success} />
<Stack.Screen name="Payment" component={Payment}/>
<Stack.Screen name="Select_Payment" component={Select_Payment}/>
<Stack.Screen name="Div" component={Dev}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <First_On_Boarding/>
}
