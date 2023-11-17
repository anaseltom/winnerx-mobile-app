import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform
} from "react-native";
import {
  Feather,
  AntDesign,
  Ionicons,
  Foundation
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initiateCardPayment,
  initiateSamsungPay,
  initiateApplePay,
  isApplePaySupported
} from '@network-international/react-native-ngenius';

import { CREATE_ORDER, FETCH_address } from "../API";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";


// import ApplePay, { MethodData, DetailsData } from "react-native-apple-payment";
// index.ios.js
// global.PaymentRequest = require('react-native-payments').PaymentRequest;



export default function Select_Payment({ route, navigation }) {
  const [select, setselect] = useState("COD");
  const [total, setTotal] = useState(0)
  const [currency, setCurrency] = useState("AED")
  const [language, setLanguage] = useState("EN")
  const [items, setitems] = useState([])
  const [id, setId] = useState("")
  const [address, setAddress] = useState({})

  var per = route.params?.per;
  // alert(per)
  React.useEffect(() => {
    (async () => {
      const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang)
      setTotal(route.params?.total)
      setCurrency(route.params?.currency)
      var add = route.params?.address
      var shipping_address = {
        "first_name": add.first_name,
        "last_name": add.last_name,
        "country": add.country,
        "country_code": "",
        "mobile_no": add.mobile_no,
        "city": add.city,
        "company": "",
        "address": add.address
      }
      // console.log(add)
      setAddress(shipping_address)
      setId(add.customer_id)

      var data = route.params?.data
      var itemData = []
      data && data.map((item) => {
        // console.log(item)
         // alert(item.color)
          var arrData = {
            "product_id": item.id,
            "deal_id": item.deal_products ? item.deal_products[0].deal_id : 0,
            "quantity": item.count,
            "price": parseFloat(item.unit_price),
          
          }
        
      
        itemData.push(arrData)
        // console.log(arrData)
      })

      setitems(itemData)

    })()
  }, [])

  const token = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/vnd.ni-identity.v1+json");
    myHeaders.append("Authorization", "Basic MjRkOTQzNWEtZTA2NS00Zjg1LWFkNWYtNzFkYTU2ZjA3MzMzOjZjZjAyYjQwLWU3OWMtNGEzYy04ZmRjLTBkZDlkYWNjM2U4NQ==");

    var raw = "";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch("https://api-gateway.ngenius-payments.com/identity/auth/access-token", requestOptions)
  }

  const create_Order = async (access_token) => {
    const savedUser = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(savedUser);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);
    myHeaders.append("Content-Type", "application/vnd.ni-payment.v2+json");
    myHeaders.append("Accept", "application/vnd.ni-payment.v2+json");
    var raw = JSON.stringify({
      "action": "AUTH",
      "amount": {
        "currencyCode": currency,
        "value": parseInt(total) * 100
      },
      "emailAddress": currentUser.email,
      // "merchantOrderReference": "my-orders",
      "billingAddress": {
        "firstName": address.first_name,
        "lastName": address.last_name,
        "address1": address.address,
        "city": address.city,
        "state": address.state,
        "countryCode": address.country
      },
      "shippingAddress": {
        "firstName": address.first_name,
        "lastName": address.last_name,
        "address1": address.address,
        "city": address.city,
        "state": address.state,
        "countryCode": address.country
      },
      // "merchantAttributes": {
      //   "skipConfirmationPage": true,
      //   "skip3DS": true
      // }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return fetch("https://api-gateway.ngenius-payments.com/transactions/outlets/be2c5834-6dbb-4516-9890-18731e00d83d/orders", requestOptions)

  }

  const Pay = async () => {
    console.log("Pay work")
    
    token().then(response => response.json())
      .then(result => {
        // console.log(result.access_token)
        create_Order(result.access_token)
          .then(response => response.json())
          .then(async (order) => {
            console.log(order)

            // createOrder("pay with cedit", "paid", "")

            try {

              await initiateCardPayment(order);
              createOrder("pay with cedit", "paid", order.reference)

              Alert.alert(
                'Success',
                'Payment was successful',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
            } catch (err) {
              console.log(err);
              Alert.alert(
                'Error',
                'Payment was not successful',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
            } finally {
              //   setCreatingOrder(false);
            }

            // console.log(result)

          })
          .catch(error => console.log('error', error));
        // return result

      }
      )
      .catch(error => console.log('error', error));

  }


 

  const Pay_BY_Apple = async () => {

    console.log("Pay work")
    token().then(response => response.json())
      .then(result => {
        // console.log(result.access_token)
        create_Order(result.access_token)
          .then(response => response.json())
          .then(async (order) => {
            console.log(order)

            const isApplePayEnabled = await isApplePaySupported();
            console.log(isApplePayEnabled)

            // createOrder("pay with cedit", "paid", "")

            try {
              const resp = await initiateApplePay(order, { // order is the order response after creating an order
                merchantIdentifier: 'merchant.com.winnerx', // Merchant ID created in Apple's portal
                countryCode: "AE", // Country code of the order Eg, AE
                merchantName: 'WinnerX', // name of the merchant to be shown in Apple Pay button
              });

              //  await initiateCardPayment(order);
              createOrder("pay with Apple", "paid", order.reference)

              Alert.alert(
                'Success',
                'Payment was successful',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
            } catch (err) {
              console.log(err.error);
              Alert.alert(
                'Error',
                'Payment was not successful',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
            } finally {
              //   setCreatingOrder(false);
            }

            // console.log(result)

          })
          .catch(error => console.log('error', error));
        // return result

      }
      )
      .catch(error => console.log('error', error));

  }




  const createOrder = async (type, status, ref) => {


    CREATE_ORDER(id, type, status, ref, items, address, per)
      .then(response => response.json())
      .then(result => {

        console.log(result)
        if (result.status === 200) {
          AsyncStorage.removeItem("@Cart").then(() =>
            navigation.navigate("OrderSummary", { address: address.address + address.country, name: address.first_name + " " + address.last_name, mobile: address.mobile_no })
          )
        }
      })
      .catch(error => console.log('error', error));

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headertxt1}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertxt2}>{language === "EN" ? EN.payment_type : AR.payment_type}</Text>
      </View>

      <View style={{ marginLeft: 40 }}>
        <TouchableOpacity onPress={() => setselect("COD")} style={{ flexDirection: "row", marginTop: 50 }}>
          {select === "COD" ?
            <AntDesign name="checkcircle" size={24} color="#803300" />
            :
            <AntDesign name="checkcircle" size={24} color="#cccccc" />
          }
          <Text style={{ marginLeft: 15 }}>{language === "EN" ? EN.cash_on_delivery : AR.cash_on_delivery}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setselect("Card")} style={{ flexDirection: "row", marginTop: 10 }}>
          {select === "Card" ?
            <AntDesign name="checkcircle" size={24} color="#803300" />
            :
            <AntDesign name="checkcircle" size={24} color="#cccccc" />
          }
          <Text style={{ marginLeft: 15 }}>{language === "EN" ? EN.pay_with_credit : AR.pay_with_credit}</Text>
        </TouchableOpacity>

        {Platform.OS === "android" ? null :
          <TouchableOpacity onPress={() => setselect("Apple")} style={{ flexDirection: "row", marginTop: 10 }}>
            {select === "Apple" ?
              <AntDesign name="checkcircle" size={24} color="#803300" />
              :
              <AntDesign name="checkcircle" size={24} color="#cccccc" />
            }
            <Text style={{ marginLeft: 15 }}>Pay with Apple Pay</Text>
          </TouchableOpacity>}

      </View>


      <View style={{ ...styles.bottomLastView }}>
        <View style={{ flex: 0.5 }}>
          <Text style={{ ...styles.textleft, fontSize: 12, textAlign: "left" }}>
            {language === "EN" ? EN.cart_total : AR.cart_total}
          </Text>
          <Text style={styles.bottontxt}>{total} {currency}</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity
            onPress={() => {
              if (select === "Apple") {
                // alert("Work in progress")
                Pay_BY_Apple()
              }
              else if (select === "COD") {
                // alert("COD")
                createOrder("cash on delivery", "unpaid", "")
              } else if (select === "Card") {
                Pay()
                // alert("Caer")
              }
            }}
            style={styles.button1}
          >
            <Text style={styles.bottontxt1}> {language === "EN" ? EN.procced_to_pay : AR.procced_to_pay}</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 2,
    // marginTop: 25,
    flexDirection: "row",
  },
  headertxt1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginStart: 30,
  },

  headertxt2: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginStart: "15%",
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
  bottomLastView: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
    position: "absolute",
    bottom: 0
  },

})