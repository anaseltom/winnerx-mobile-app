import React,{useState, useEffect} from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Feather,
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
FontAwesome5
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AR } from "../../language/ar";
import { EN } from "../../language/en";
import WishListIndex from "../WishListPages/wishList";
import CartIndex from "../CartPages/Cart";
import ProfileIndex from "../Profile/Profile";
import home from "../HomePages/home";
import Profile from '../Profile/Profile';

const Tab = createBottomTabNavigator();

export default function TabView() {
const [language, setLanguage] = useState("EN")
const [badge,setBadge] = useState(0)
useEffect(() => {
    (async () => {
const lang = await AsyncStorage.getItem("@Language")
// const cartData = await AsyncStorage.getItem("@Cart")
// var myArray = JSON.parse(cartData);
// setBadge(myArray.length)
setLanguage(lang)
    })()
},[])
useEffect(() => {
  (async () => {
    const cartData = await AsyncStorage.getItem("@Cart")
    var myArray = JSON.parse(cartData);
    var n = 0
    if(myArray){
   myArray && myArray.map((item)=>{
n = n + item.count

   })
  }
    setBadge(n)
  })()
})
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, tabBarActiveTintColor:"black",
//  unmountOnBlur: true 
}}>
      <Tab.Screen
        name="Home"
        component={home}
        options={{
          tabBarLabel: language === "EN"?EN.home:AR.home,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Entypo name="home" size={24} color={color} />
            ) : (
              <Feather name="home" size={24} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishListIndex}
        options={{
          tabBarLabel: language === "EN"?EN.wishlist:AR.wishlist,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <AntDesign name="heart" size={24} color={color} />
            ) : (
              <AntDesign name="hearto" size={24} color={color} />
            ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartIndex}
        options={{
          tabBarBadge:badge,

          tabBarLabel: language === "EN"?EN.cart:AR.cart,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <FontAwesome name="shopping-bag" size={24} color={color} />
            ) : (
              <SimpleLineIcons name="handbag" size={24} color={color} />
            ),
            // tabBarBadge: 3,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: language === "EN"?EN.profile:AR.profile,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ) : (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
