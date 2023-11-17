import React, {useState} from "react";
import { View, Text, Button, Alert , TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  initiateCardPayment,
  initiateSamsungPay,
  initiateApplePay,
} from '@network-international/react-native-ngenius';

export default function Payment() {
const token =()=>{
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

const create_Order=(access_token)=>{

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${access_token}`);
myHeaders.append("Content-Type", "application/vnd.ni-payment.v2+json");
myHeaders.append("Accept", "application/vnd.ni-payment.v2+json");
var raw = JSON.stringify({
    "action": "AUTH",
    "amount": {
        "currencyCode": "AED",
        "value": parseInt(amount) * 100
    },
    "emailAddress": "govindsingh@gmail.com",
"merchantOrderReference":"my-order",
"billingAddress":{
"firstName":"Govind",
"lastName":"Singh",
"address1":"abc",
 "city":"Dubai",
        "state":"Dubai",
        "countryCode":"USA"
},
"merchantAttributes":{
"skipConfirmationPage":true,
"skip3DS":true
}
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch("https://api-gateway.ngenius-payments.com/transactions/outlets/be2c5834-6dbb-4516-9890-18731e00d83d/orders", requestOptions)

}

const Pay= async()=>{
console.log("Pay work")
 token().then(response => response.json())
    .then(result => {
// console.log(result.access_token)
create_Order(result.access_token)
.then(response => response.json())
    .then(async(order) => {
console.log(order)

 try {

     await initiateCardPayment(order);
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
const [amount, setAmount] = useState(5)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{textAlign:"center", marginTop:20}}>Enter Payment in AED</Text>
<TextInput
style={{height:40, width:200, borderWidth:1, borderRadius:1, margin:20, padding:10,alignSelf:"center" }}
value ={amount}
keyboardType={"numeric"}
placeholder="Enter Payment "
onChangeText={(text)=>setAmount(text)}

/>
<Button title="Payment" onPress={Pay}/>
    </SafeAreaView>
  );
}