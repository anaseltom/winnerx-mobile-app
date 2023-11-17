import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import { FETCH_COUPON_CODE } from "../API";
import { isApplePaySupported } from "@network-international/react-native-ngenius";

const width = Dimensions.get("window").width;

export default function Cart({ navigation }) {
  const [Array, setArray] = useState([]);
  const [itemtotal, setItemtotal] = useState(0)
  const [deliveryCharg, setDeliveryCharg] = useState(0)
  const [tax, setTax] = useState(0)
  const [coupon, setCoupon] = useState(0)
  const [language, setLanguage] = useState("EN")
  const [currency, setCurrency] = useState("")
  const [c_code, setC_code] = useState("")
  const [par, setPar] = useState(0)
  const [apply, setApply] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
setPar(0)
      const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);
      const cartData = await AsyncStorage.getItem("@Cart");
      var myArray = JSON.parse(cartData);
      setArray(myArray);
      var tt = 0
      myArray && myArray.map((item) => {
        tt = tt + parseInt(item.unit_price) * item.count
        setCurrency(item.currency_code)
      })
      var aa = parseInt(tt) * 0.05
      setTax(aa)
      setItemtotal(tt)

      // console.log(myArray);
    })
    return unsubscribe;
  }, [navigation]);

  const Check_Coupon = () => {
    if (c_code == "") {
      alert("Please enter coupon code")
    } else {
      setLoading(true)
      FETCH_COUPON_CODE(c_code)
        .then(response => response.json())
        .then(result => {
          if (result.status == 200) {
            // console.log(result)
            var par = result.coupons?.percentage
            console.log(par)
            setPar(par)
            var tt = (itemtotal + deliveryCharg + tax) * par / 100
            console.log(tt)
            setCoupon(tt)
            setApply(true)
          } else {
            alert(result.msg)
            console.log(result)
          }

          setLoading(false)
        })
        .catch(error => console.log('error', error));
    }
  }
  const deleteItem = async (e) => {
    let filteredArray = Array.filter(item => item.id !== e.id)
    setArray(filteredArray);
    await AsyncStorage.setItem("@Cart", JSON.stringify(filteredArray));
    var tt = 0
    filteredArray && filteredArray.map((item) => {
      tt = tt + parseInt(item.unit_price) * item.count
      setCurrency(item.currency_code)
    })
    setItemtotal(tt)

    var aa = parseInt(tt) * 0.05
    setTax(aa)
    var cc = (tt + deliveryCharg + aa) * par / 100
    setCoupon(cc)
    navigation.navigate("TabView", { screen: "Cart" })

  }
  if (!Array || Array.length === 0) {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headertxt}>{language === "EN" ? EN.cart : AR.cart}</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", marginTop: 70, fontWeight: "bold", fontSize: 16, marginBottom: 30 }}>{language === "EN" ? EN.empty_cart : AR.empty_cart}</Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("delivery",{total:`${itemtotal + deliveryCharg + tax -coupon} ${currency}`})}
            style={styles.button1}
          >
            <Text style={styles.bottontxt1}>Start Shopping</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>

    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>{language === "EN" ? EN.cart : AR.cart}</Text>
      </View>
      {/* <FlatList data={Array} extraData={Array} renderItem={RenderList} /> */}
      {Array ?
        <View style={{ flex: 1 }}>
          <ScrollView>
            {Array &&
              Array.map((item, index) => RenderList({ item, index, key: index }))}

            <View style={{ ...styles.locationView, display: "flex" }}>
              <TextInput
                value={c_code}
                onChangeText={(text) => setC_code(text)}
                style={{ color: "gray", fontWeight: "600", width: "50%", paddingHorizontal: 2 }}
                placeholder={language === "EN" ? EN.coupon_code : AR.coupon_code}
              />
              <TouchableOpacity onPress={() => {

                apply ? null : Check_Coupon()

              }} style={{ ...styles.button, width: 120, }}>
                <Text style={styles.bottontxt1}>{loading ? "......" : apply ? language=="EN"?EN.applied:AR.applied : language=="EN"?EN.apply:AR.apply}</Text>
              </TouchableOpacity>
              {/* <EvilIcons name="chevron-right" size={24} color="gray" /> */}
              {/* <Text style={{color:"gray", fontWeight:"600"}}>{">"}</Text> */}
            </View>
            <View style={{ ...styles.bottomView, marginTop: 15 }}>
              <Text style={{ ...styles.LocationMain, textAlign: "left" }}>{language === "EN" ? EN.billing_details : AR.billing_details}</Text>
              <View style={styles.totalview}>
                <Text style={styles.textleft}>{language === "EN" ? EN.total : AR.total}</Text>
                <Text style={styles.textright}>{itemtotal} {currency}</Text>
              </View>
              <View style={styles.totalview}>
                <Text style={styles.textleft} >{language === "EN" ? EN.delivery_charge : AR.delivery_charge}</Text>
                <Text style={styles.textright}>{deliveryCharg} {currency}</Text>
              </View>
              <View style={{ ...styles.line2, marginTop: 0 }}></View>
              <View style={styles.totalview}>
                <Text
                  onPress={() => console.log("hiii")}
                  style={{
                    ...styles.textleft,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                  }}
                >
                  {language === "EN" ? EN.tax_and_charges : AR.tax_and_charges}
                </Text>
                <Text style={styles.textright}> {tax} {currency}</Text>
              </View>
              <View style={{ ...styles.line2, marginTop: 0 }}></View>
              <View style={styles.totalview}>
                {/* <Text style={styles.textleft}>{language === "EN" ? EN.coupon_code : AR.coupon_code}</Text> */}
                <Text style={styles.textleft}>{language === "EN" ? EN.discount : AR.discount}</Text>

                <Text style={styles.textright}>{coupon} {currency}</Text>
              </View>
              <View style={{ ...styles.line2, marginTop: 0 }}></View>

              <View style={{ ...styles.totalview }}>
                <Text
                  style={{
                    ...styles.textleft,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {language === "EN" ? EN.subtotal : AR.subtotal}
                </Text>
                <Text
                  style={{
                    ...styles.textright,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >{itemtotal + deliveryCharg + tax - coupon} {currency}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={{ ...styles.bottomLastView }}>
            <View style={{ flex: 0.5 }}>
              <Text style={{ ...styles.textleft, fontSize: 12, textAlign: "left" }}>{language === "EN" ? EN.cart_total : AR.cart_total}
              </Text>
              <Text style={styles.bottontxt}>{itemtotal + deliveryCharg + tax - coupon} {currency}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("delivery", { total: `${itemtotal + deliveryCharg + tax - coupon}`, currency: currency, data: Array, per:par })}
                style={styles.button1}
              >
                <Text style={styles.bottontxt1}>{language === "EN" ? EN.proceed_to_checkout : AR.proceed_to_checkout}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> :
        <View>
          <Text style={{ textAlign: "center", marginTop: 70, fontWeight: "bold", fontSize: 16, marginBottom: 30 }}>{language === "EN" ? EN.empty_cart : AR.empty_cart}</Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("delivery",{total:`${itemtotal + deliveryCharg + tax -coupon} ${currency}`})}
            style={styles.button1}
          >
            <Text style={styles.bottontxt1}>Start Shopping</Text>
          </TouchableOpacity> */}
        </View>
      }
      {/* <RenderList /> */}
    </SafeAreaView>
  );

  function RenderList({ item, index }) {
    return (
      <View style={styles.box}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.firstView}>
            <Image
              source={{ uri: item.image_url_main }}
              style={styles.image1style}
            />
          </View>
          {/* {item.deal_products &&
            item.deal_products[0] ?
            <View style={styles.firstView}>
              <Image
                source={{ uri: item.deal_products[0].deal.image_url_main }}
                style={styles.image1style}
              />
            </View> : null} */}
          <View style={styles.secView}>
            <Text style={styles.text1}>
              { item.parent_name  ? language === "EN" ? item.parent_name:item.parent_name_ar : ""}{" "}
              {language === "EN" ? item.product_name : item.product_name_ar}{" "}

            </Text>
         
            <View style={styles.line1}></View>
            {/* <View style={styles.text5}> */}
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.text5style}>
                {item.unit_price} {item.currency_code}
              </Text>
              <TouchableOpacity onPress={() => deleteItem(item)} style={{ height: 50, width: 50, alignItems: "center", alignSelf: "center", justifyContent: 'center' }}>
                <AntDesign name="delete" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.line2}></View>
        <View style={styles.listbottomView}>
          <Text style={{ color: "gray", marginRight: 15, fontWeight: "300" }}>
            {language === "EN" ? EN.quantity : AR.quantity}
          </Text>
          <Text
            style={{ fontSize: 25, paddingHorizontal: 10 }}
            onPress={async () => {
              if (item.count > 1) {
                let arr = [...Array];
                //  {rowData.conter == 1?

                arr.map((item, index1) => {
                  index == index1
                    ? (arr[index] = { ...arr[index], count: item.count - 1 })
                    : (arr[index1] = { ...arr[index1] });
                });
                setArray(arr);
                setItemtotal(itemtotal - parseInt(item.unit_price))

                var aa = parseInt(itemtotal - parseInt(item.unit_price)) * 0.05
                setTax(aa)
                var tt = parseInt(itemtotal - parseInt(item.unit_price))
                var cc = (tt + deliveryCharg + aa) * par / 100
                setCoupon(cc)
                await AsyncStorage.setItem(
                  "@Cart",
                  JSON.stringify(arr)
                );
                navigation.navigate("TabView", { screen: "Cart" })

              } else if (item.count == 1) {
                // alert("wor")
                deleteItem(item)

              } else { }
            }}
          >
            -
          </Text>
          <Text style={{ marginHorizontal: 10 }}>{item.count}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              let arr = [...Array];
              //  {rowData.conter == 1?
              arr.map((item, index1) => {
                if (index == index1) {
                  arr[index] = { ...arr[index], count: item.count + 1 };
                } else {
                  arr[index1] = { ...arr[index1] };
                }
              });
              setArray(arr);
              setItemtotal(itemtotal + parseInt(item.unit_price))
              var aa = parseInt(itemtotal + parseInt(item.unit_price)) * 0.05
              setTax(aa)
              var cc = (parseInt(itemtotal + parseInt(item.unit_price)) + deliveryCharg + aa) * par / 100
              setCoupon(cc)
              await AsyncStorage.setItem(
                "@Cart",
                JSON.stringify(arr)
              );
              navigation.navigate("TabView", { screen: "Cart" })

            }}
          >
            <Text style={{ color: "gold", fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  headertxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  box: {
    width: width * 0.9,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    // flexDirection: "row",
  },
  firstView: {
    flex: 0.40,
  },
  secView: {
    flex: 0.65,
  },
  image1style: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },

  text1: {
    marginLeft: 20,
    fontSize: 14,
    // width: width * 0.45,
    color: "#737373",
  },

  text3: { fontSize: 14, fontWeight: "500", color: "black" },

  line1: {
    backgroundColor: "#cccccc",
    height: 1,
    // width: width * 0.36,
    marginTop: 10,
    marginLeft: 20,
  },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    // width: width * 0.36,
    marginTop: 10,
    // marginLeft: 25,
  },
  text5style: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 10,
  },
  button: {
    height: 30,
    width: 30,
    alignSelf: "center",
    // marginTop: 70,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    height: 40,
    width: "90%",
    alignSelf: "center",
    // marginTop: 70,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  listbottomView: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  bottomView: {
    // margin:15,
    backgroundColor: "white",
    padding: 20,
  },
  locationView: {
    height: 50,
    backgroundColor: "white",
    width: width,
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  locationimg: {
    height: 25,
    width: 25,
    marginRight: 5,
  },
  totalview: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-between",
    // marginTop: 5,
    paddingVertical: 10,
  },
  textleft: {
    color: "gray",
    fontWeight: "600",
  },
  LocationMain: {
    color: "black",
    fontWeight: "bold",
    // fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: 16,
    // marginTop: 5,
  },
  textright: {
    color: "gray",
    fontWeight: "600",
  },
  bottomLastView: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
  bottontxt: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bottontxt1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gold",
  },
});
