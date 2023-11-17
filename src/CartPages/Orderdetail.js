import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from "expo-linear-gradient";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FETCH_ORDER, TRACK_SHIPMENT, FETCH_ORDER_DEAL } from "../API";
import Loader from "../component/Loader";
import moment from "moment";

export default function OrderDetail({ navigation, route }) {
  const [language, setLanguage] = useState("EN")
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(route.params.item);
  const [id, setId] = useState(route.params.id);
  const [i1, setI1] = useState(route.params.i1)
  const [status, setStatus] = useState("")
  const [data, setData] = useState()
  const [ordered, setOrdered] = useState({})
  const [provessed, setProcessed] = useState({})
  const [shipping, setShipping] = useState({})
  const [delivered, setDelivered] = useState({})
  const [deal, setDeal] = useState([])
  useEffect(() => {
    (async () => {
      const lang = await AsyncStorage.getItem("@Language");
      FETCH_ORDER(route.params.id, id).then((response) => response.json())
        .then((result) => {
          if (result.status == 200) {
            setData(result.order)
            setLoading(false)
            // console.log(result)
            console.log(result?.order?.id)
            var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "order_id": result.order.id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://new.api.winnerx.com/api/v1/deal_entries/fetch-all", requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result)
    // console.log(result.date_end)
    setDeal(result.deal_entries)
  })
  .catch(error => console.log('error', error));
            // FETCH_ORDER_DEAL(result.order.id)
            // .then((result) => {
            //   console.log(result)
            //   setDeal(result.deal_entries)
            // })
            // .catch((e)=>console.log(e))
          } else {
            setLoading(false)
            alert(result.msg)
            navigation.goBack()

          }
        })
        .catch((e) => {
          setLoading(false)
          console.log(e)
          alert(e.msg)
        })


      TRACK_SHIPMENT(i1.tracking_no).then(response => response.json())
        .then(result => {
          result.data.events.map((item)=>{
            if(item.type == "softdata_upload"){
              setOrdered(item)
              // console.log(moment(item.event_time).format('LLLL'))
            }
            if(item.type == "pickup_completed"){
              setProcessed(item)
              console.log(moment(item.event_time).format('LLLL'))
            }
            if(item.type == "outfordelivery"){
              setShipping(item)
              console.log(moment(item.event_time).format('LLLL'))
            }
            if(item.type == "delivered"){
              setDelivered(item)
              // console.log(moment(item.event_time).format('LLLL'))
            }
            // console.log(moment(item.event_time).format('LLLL'))
          })
          setStatus(result.data)
          // setProduct(result.data)
        })
        .catch(error => console.log('error', error));



      
      setLanguage(lang);
      // setLanguage("EN")
    })()
  }, [])
  if (loading) {
    return <Loader loading={loading} />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 0.18,  height:"100%", alignItems:"center", justifyContent:"center", }}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headertxt}>{language === "EN" ? EN.order_summary : AR.order_summary}</Text>
        </View >
        <View style={{...styles.topview,}}>
          <View style={styles.firstView}>
            <Image
              source={{ uri: product.image_url_main }}
              style={styles.image1style}
            />
          </View>
          <View style={styles.secView}>
            <Text style={styles.text1}>
             {product.parent_name? language =="EN"? product.parent_name:product.parent_name_ar+" ":""} {language === "EN" ? product.product_name : product.product_name_ar}
          {deal && deal[0]? language == "EN"?` || ${EN.win} ${deal[0].deal.name}`:` || ${AR.win} ${deal[0].deal.name_ar}`:""}    {/* || {language==="EN"?product.description:product.description_ar} */}
            </Text>
            {product.color?
            <Text style={styles.text1}>
            Color: { product.color}
            {/* || {language==="EN"?product.description:product.description_ar} */}
          </Text>:null}
          {product.size?

          <Text style={styles.text1}>
            Size: { product.size}
            {/* || {language==="EN"?product.description:product.description_ar} */}
          </Text>:null}
          </View>
        </View>
        <View style={{ ...styles.bottomView, marginTop: 15 }}>
          <ImageBackground source={require("./../../assets/trafee.png")} style={{ ...styles.orderview, }} resizeMode="cover"
          imageStyle={{borderRadius:5}}
          >
          {/* <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['#ff9900', "#ff9900", "#e68a00", '#ff9900']} style={{ ...styles.orderview, }}> */}
            {/* <AntDesign name="Trophy" size={80} color="yellow" /> */}
            <View style={{ flex: 0.32 }}></View>
            <View style={{ flex: 0.55, marginVertical:8, 
// display:deal && deal.length>0 ?"flex":"none" 
 }}>
              <Text style={{ ...styles.LocationMain, color: "black" }}>{language == "EN"? EN.declaired:AR.declaired} {moment(deal[0]&& deal[0].deal.date_end).format("DD MMMM YYYY")}</Text>
              <Text style={{ textAlign: 'left', marginTop: 10 }}>{deal && deal.length == 1 ?  <Text>{language =="EN"?EN.your_entry_code_is:AR.your_entry_code_is } {deal[0].entry_code}</Text>: <Text>{language == "EN"?EN.you_have:AR.you_have} {deal.length} {language == "EN" ? EN.entry_codes:AR.entry_codes}</Text>}</Text>
            </View>
            <View style={{ flex: 0.1 }}></View>
            {/* <AntDesign name="right" size={24} color="black" /> */}
            </ImageBackground>
          {/* </LinearGradient> */}
        </View>
        <View style={{ ...styles.statusview,  }}>
          <View >
            <View style={styles.rowview}>
              <View>

                <View style={{...styles.dot, backgroundColor: ordered.type?"black":"gray"}}></View>
                <Text style={styles.dash}>¦</Text>
                <Text style={styles.dash}>¦</Text>
                <Text style={styles.dash}>¦</Text>
              </View>
              <View>
                <Text style={{...styles.txt1,}}>{language === "EN" ? EN.ordered : AR.ordered}</Text>
                <Text style={styles.txt2}>{ordered.type ? moment(ordered.event_time).format('dddd, DD MMMM YYYY'):""}</Text>
              </View>
            </View>

            <View style={styles.rowview}>
              <View>

                <View style={{...styles.dot, backgroundColor: provessed.type?"black":"gray"}}></View>
                <Text style={styles.dash}>¦</Text>
                <Text style={styles.dash}>¦</Text>
                <Text style={styles.dash}>¦</Text>
              </View>
              <View>
                <Text style={{...styles.txt1, }}>{language === "EN" ? EN.processed : AR.processed}</Text>
                <Text style={styles.txt2}>{provessed.type?moment(provessed.event_time).format('dddd, DD MMMM YYYY'):""}</Text>
              </View>
            </View>

            <View style={styles.rowview}>
              <View>
                <View style={{ ...styles.dot, backgroundColor: shipping.type?"black":"gray" }}></View>

                <Text style={styles.dash}>¦</Text>
                <Text style={styles.dash}>¦</Text>
                <Text style={styles.dash}>¦</Text>
              </View>
              <View>
                <Text style={styles.txt1}>{language === "EN" ? EN.shipping : AR.shipping}</Text>
                <Text style={styles.txt2}>{shipping.type ? moment(shipping.event_time).format('dddd, DD MMMM YYYY'):""}</Text>
              </View>
            </View>

            <View style={styles.rowview}>
              <View>
                <View style={{ ...styles.dot, backgroundColor: delivered.type ?"black":"gray" }}></View>

              </View>
              <View>
                <Text style={styles.txt1}>{language === "EN" ? EN.delivered : AR.delivered}</Text>
                <Text style={styles.txt2}>{delivered.type? moment(delivered.event_time).format('dddd, DD MMMM YYYY'):""}</Text>
              </View>
            </View>
          </View>

        </View>
       
        <View style={{ ...styles.bottomView, }}>
          <View style={{...styles.orderview1, backgroundColor:"lightgray"}}>
            <Text style={{...styles.LocationMain, fontSize:14}}>{language === "EN" ? EN.order_ID : AR.order_ID} : WNRX-{data && data.order_no}-{status.creation_date}</Text>
            {/* <Text style={{ ...styles.LocationMain, textAlign: 'center', color: "black", fontWeight: "600" }}>{language=="EN"?EN.orderst:AR.orderst}: {status}</Text> */}

          </View>
        </View>
        <View style={{ ...styles.bottomView, marginTop: 15 }}>
          <Text style={styles.LocationMain}>{language === "EN" ? EN.shipping_address : AR.shipping_address}</Text>
          <Text style={{ ...styles.LocationMain, color: "black", marginTop: 10 }}>{data && data.shipping_address.first_name} {data && data.shipping_address.last_name}</Text>

          <Text style={styles.addresstxt}>{data && data.shipping_address.address}</Text>
          <Text style={styles.addresstxt}>{language === "EN" ? EN.phone_number : AR.phone_number}: {data && data.shipping_address.mobile_no}</Text>
        </View>
        <View style={{ ...styles.bottomView, marginTop: 15,  }}>
          <Text style={styles.LocationMain}>{language === "EN" ? EN.billing_details : AR.order_summary}</Text>
          <View style={styles.totalview}>
            <Text style={styles.textleft}>{language === "EN" ? EN.total : AR.total}</Text>
            <Text style={styles.textright}>  AED {data && data.total_price}</Text>
          </View>
          <View style={styles.totalview}>
            <Text style={styles.textleft}>{language === "EN" ? EN.delivery_charge : AR.delivery_charge}</Text>
            <Text style={styles.textright}> AED {data && data.shipping_fee}</Text>
          </View>
          <View style={{ ...styles.line2, marginTop: 0 }}></View>
          <View style={styles.totalview}>
            <Text onPress={() => console.log("hiii")} style={{ ...styles.textleft, borderBottomWidth: 1, borderBottomColor: "gray" }}>{language === "EN" ? EN.tax_and_charges : AR.tax_and_charges}</Text>
            <Text style={styles.textright}> AED {data && data.tax}</Text>
          </View>
          <View style={{ ...styles.line2, marginTop: 0 }}></View>
          <View style={styles.totalview}>
            <Text style={styles.textleft}>{language === "EN" ? EN.coupon_code : AR.coupon_code}</Text>
            <Text style={styles.textright}> AED {data && data.discount}</Text>
          </View>
          <View style={{ ...styles.line2, marginTop: 0 }}></View>

          <View style={{ ...styles.totalview }}>
            <Text style={{ ...styles.textleft, fontSize: 16, fontWeight: "bold", color: "black" }}>{language === "EN" ? EN.subtotal : AR.subtotal}</Text>
            <Text
              style={{ ...styles.textright, fontSize: 16, fontWeight: "bold", color: "black" }}
            >
              AED {data && data.total_price}
            </Text>
          </View>
        </View>

      
      </ScrollView>
      <View style={{ ...styles.bottomView, marginTop: 0, }}>
          <Text style={styles.LocationMain}>{language === "EN" ? EN.payment_method : AR.payment_method}</Text>
          <View style={styles.totalview}>
            <Text style={styles.textleft}>{data && data.payment_type}</Text>
            <Text style={styles.textright}>AED {data && data.total_price}</Text>
          </View>
        </View>
    </SafeAreaView>
  )
}




const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    // paddingHorizontal: 15,
    elevation: 5,
    marginBottom: 0.5
  },
  headertxt: {
    flex: 0.9, textAlign: "center", marginLeft: -30,
    fontWeight: "bold",
    fontSize: 18
  },
  topview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between"
  },
  firstView: {
    flex: 0.35,
  },
  secView: {
    flex: 0.60,
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
    color: "black",
    fontWeight: "bold",
    textAlign:"left"
  },
  statusview: {
    marginTop: 2,
    backgroundColor: 'white',
    // height: 300,
    paddingHorizontal: 40,
  },
  stxt: {

    fontWeight: "bold",
    fontSize: 13
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 8,
    backgroundColor: "black",
    marginRight: 10,
    // marginBottom:-20
  },
  dash: {
    marginTop: -4,
    color: "gray",
    marginLeft: 6,

  },
  rowview: {
    flexDirection: 'row',

  },
  txt1: {
    marginTop: -5,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: "left"
  },
  txt2: {
    color: "gray",
    fontSize: 16
  },
  bottomView: {
    backgroundColor: "white",
    padding: 20
  },
  orderview1: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 5,
    paddingVertical: 20,
    borderRadius: 15,
    backgroundColor: "#e6f7ff",
  },
  orderview: {
    alignItems: 'center',
    justifyContent: "center",
    // padding: 5,
    // Vertical: 20,
    
    borderRadius: 15,
    backgroundColor: "#e6f7ff",
    flexDirection: 'row', width: "100%", justifyContent: "space-between"
  },
  totalview: {
    flexDirection: "row",
    // width: width * 0.9,
    justifyContent: "space-between",
    // marginTop: 5,
    paddingVertical: 10

  },
  textleft: {
    color: "black",
    fontWeight: "600"
  },
  LocationMain: {
    color: "black",
    fontWeight: "bold",
    // fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: 16,
    color: 'gray',
    textAlign: "left"
    // marginTop: 5,
  },
  textright: {
    color: "black",
    fontWeight: "600"
  },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    // width: width * 0.36,
    marginTop: 10,
    // marginLeft: 25,
  },

  addresstxt: {
    fontWeight: "600",
    textAlign: "left"
  }
})