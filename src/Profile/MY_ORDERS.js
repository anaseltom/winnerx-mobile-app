import React from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { FETCH_orders } from "../API/index_my_orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import Loader from "../component/Loader";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function MY_ORDERS({ language, navigation, id }) {
  const [loading, setLoading] = React.useState(true);
  const [persons, setpersons] = React.useState([]);
// cons [id, setId] = React.useState("")
const [trn, setTrn] = React.useState("")
  useEffect(() => {
(async()=>{
 const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      // setId(currentUser.id)
   await FETCH_orders(currentUser.id)
      .then((response) => response.json())
      .then((result) => {
        var Array = [];
        // console.log(result)
        result.orders.map((item) => {
          // result.order.order_items.map((item) => {
          Array.push({ ...item });
        });
        setpersons(result.orders);
        setLoading(false);
        // console.log(result.order.order_items);
      })
      .catch((error) => console.log("error", error));
})()
  }, []);
  return (
    <SafeAreaView>
      <View>
        {loading?<Loader loading={loading}/>: persons && persons.length>0?
        <FlatList
          data={persons}
extraData={persons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            var aa = "";
 item.order_items &&  item.order_items.map(async(item1, index)=>{
if(language === "EN"){
  if(item1.product.parent_name){
aa = aa  + item1.product.parent_name  +  " "
}
aa = aa  + item1.product.product_name + ", "
}else{
aa = aa + item1.product.product_name_ar + " , "

}
})
            return (
              <View style={styles.container}>
                {item.order_items &&
                item.order_items[0] &&
                item.order_items[0].product &&
                item.order_items[0].product ? (
                  <View style={styles.box}>
                    <View style={styles.row}>
                      <View style={styles.image1}>
                        <Image
                          source={{
                            uri:
                              item.order_items &&
                              item.order_items[0].product &&
                              item.order_items[0].product.image_url_main,
                          }}
                          style={styles.image1style}
                        />
                      </View>
                      <View style={styles.cont1}>
                        <View>
                          <Text style={{...styles.text7, }}>
                         
{aa}
                          </Text>
                        </View>
                        <View style={styles.line1}></View>
                        <View style={styles.text5}>
                          <Text style={styles.text5style}>
                            {item.total_price}{" "}
                            {
                              item.order_items[0].product.currency_code? item.order_items[0].product.currency_code:"AED"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.line2}></View>
                    <View style={{flexDirection:"row", justifyContent:"space-around", margin:10}}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("OrderDetail", {
                            item: {
                              ...(item.order_items &&
                                item.order_items[0].product &&
                                item.order_items[0].product),
                              count: 0,
                            },
                            id:item.id,
                            i1:item
                          })
                        }
                        style={styles.text6}
                      >
                        <Text style={styles.text6style}>
                          {language === "EN"
                            ? EN.view_orders_details
                            : AR.view_orders_details}
                        </Text>
                        {/* <View style={styles.view_detailes_line}></View> */}
                      </TouchableOpacity>

                      <View style={styles.button1}>
                        <TouchableOpacity>
                          <Text style={styles.button_text}>
                            {language === "EN"
                              ? EN.view_winner_page
                              : AR.view_winner_page}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
:<Text style={{textAlign:"center", marginTop:20}}>No order available</Text>}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  box: {
    // height: height * 0.35,
    width: width * 0.92,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 10,
  },
  box2: {
    // height: height * 0.35,
    width: width * 0.92,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },

  column: { flexDirection: "column" },
  row: { flexDirection: "row" },
  container: { backgroundColor: "white" },

  image1: { margin: 10, marginTop: 30, marginLeft: 20 },

  image1style: { width: width * 0.35, height: 100, resizeMode: "stretch" },
  cont1: { flexDirection: "column", marginTop: 10 },

  line1: {
    backgroundColor: "#cccccc",
    height: 1,
    width: width * 0.36,
    marginTop: 20,
    marginLeft: 25,
  },
  text5: { marginLeft: 20, marginTop: 10 },
  text5style: { fontSize: 20, fontWeight: "500", width: width * 0.45 },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    width: width * 0.82,
    marginTop: 15,
    marginLeft: 15,
  },
  text6: {  marginTop: 30, flex: 0.45, borderBottomWidth:1,  },
  text6style: { fontSize: 14, color: "#737373", textAlign: "center" },
  view_detailes_line: {
    backgroundColor: "black",
    height: 1,
    width: width * 0.35,
    marginTop: 0,
    marginLeft: 0,
  },
  button1: {
    height: 40,
    flex:0.45,
    // width: width * 0.4,
    borderRadius: 10,
    backgroundColor: "black",
    margin: 0,
    marginTop: 20,
    alignItems:"center",
    justifyContent:"center"
    // marginBottom: 20,
  },
  button_text: {
    color: "yellow",
    textAlign: "center",
    // marginTop: 14,
    fontSize: 12,
    fontWeight: "800",
  },
  image2: { margin: 10, marginTop: 30, marginLeft: 30 },
  image2style: { width: 120, height: 160, resizeMode: "cover" },
  cont2: { flexDirection: "column", marginTop: 20 },
  text7: {
    marginLeft: 20,
    fontSize: 14,
    width: width * 0.4,
    color: "#737373",
    textAlign: "left",
    
  },

  line3: {
    marginLeft: 20,
    fontSize: 14,
    width: width * 0.45,
    marginTop: 3,
    color: "#737373",
  },
  free: { marginLeft: 20, marginTop: 20 },
  freestyle: { fontSize: 20, fontWeight: "500" },
  button2: {
    height: height * 0.064,
    width: width * 0.4,
    borderRadius: 10,
    backgroundColor: "black",
    marginLeft: 20,
    marginTop: 20,
  },
  button2_text: {
    color: "yellow",
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
    fontWeight: "800",
  },
});
