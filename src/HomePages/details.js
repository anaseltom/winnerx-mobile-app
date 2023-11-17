import React, { useState, useRoute } from "react";
import {
  Ionicons,
} from "@expo/vector-icons";
import Prize from "./detail1";
import Product from "./detail2";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ImageSlider from "react-native-image-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar, Button } from "react-native-paper";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import { FETCH_ALL_PRODUCT } from "../API";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Details({ navigation, route }) {
  const [com, setcom] = useState(false);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState(route.params.item);
const [language, setLanguage] = useState("EN")
const [count, setCount] = useState(0)
const [snackVisible, setSnackVisible] = useState(false);
const [size, setSize] = useState("S")
const [color, setColor]= useState("Red")
const [nproduct, setNProduct] = useState()

  React.useEffect(() => {
    // (async () => {
      // console.log(product)
      const unsubscribe = navigation.addListener("focus", async () => {
        FETCH_ALL_PRODUCT().then(response => response.json())
        .then(async(result) => {
          setNProduct(result.products)
          console.log(product)
          if (JSON.parse(product.variants)[1] && JSON.parse(product.variants)[1].values[0] !== "") {
            var dd = result.products.filter(data => data.product_name == size + " / " + color)
            var aa = product
          
            // setProduct({ ...product, ...product.deal_products[count].product = dd[0] })
            var pro = { ...product, ...product.count = 0, ...aa.id = dd[0].id, ...aa.parent_id = dd[0].parent_id, ...aa.parent_name = dd[0]?.parent_name, ...aa.product_name = dd[0].product_name, ...aa.parent_name_ar = dd[0].product_name_ar, ...aa.units_in_stock = dd[0].units_in_stock }
            const lang = await AsyncStorage.getItem("@Language");
            setLanguage(lang);
            const cartData = await AsyncStorage.getItem("@Cart");
            var myArray = JSON.parse(cartData);
            setCart(myArray);
            if (myArray) {
              myArray.map((item) => {
                if(item.id == product.id){
                  // setCount()
                  setProduct({...product, count:item.count})
      
                }else{
                  setProduct({...product, count:0})
                }
                
              });
            }else{
              setProduct({...product, count:0})
            }
          }else{
            (async()=>{
const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);
      const cartData = await AsyncStorage.getItem("@Cart");
      var myArray = JSON.parse(cartData);
      setCart(myArray);
      if (myArray) {
        myArray.map((item) => {
          if(item.id == product.id){
            // setCount()
            setProduct({...product, count:item.count})

          }else{
            setProduct({...product, count:0})
          }
          
        });
      }else{
        setProduct({...product, count:0})
      }
    })()
    }     
  })
  .catch(error => console.log('error', error));
  
    
      // console.log(product)
    })
    return unsubscribe
  }, []);

  const images = [product.image_url_main, product.image_url_other1, product.image_url_other2,];
  const images2 = [
    product.deal_products && product.deal_products[0]
      ? product.deal_products[0].deal.image_url_main
      : "",
    product.deal_products && product.deal_products[0]
      ? product.deal_products[0].deal.image_url_main
      : "",
    product.deal_products && product.deal_products[0]
      ? product.deal_products[0].deal.image_url_main
      : "",
  ];


  const changeCS = async (color, size) => {
    // alert(color + size)
    setCount(count)
    if (JSON.parse(product.variants)[1] && JSON.parse(product.variants)[1].values[0] !== "") {
      var dd = nproduct.filter(data => data.product_name == size + " / " + color)
      var aa = product
    
      // setProduct({ ...product, ...product.deal_products[count].product = dd[0] })
      var pr = { ...product, ...product.count = 0, ...aa.id = dd[0].id, ...aa.parent_id = dd[0].parent_id, ...aa.parent_name = dd[0]?.parent_name, ...aa.product_name = dd[0].product_name, ...aa.parent_name_ar = dd[0].product_name_ar, ...aa.units_in_stock = dd[0].units_in_stock }
    // setProduct(pr)
      // console.log(dd[0])

    }
   const cartData = await AsyncStorage.getItem("@Cart");
      var myArray = JSON.parse(cartData);
      setCart(myArray);
      if (myArray) {
        myArray.map((item) => {
          if(item.id == product.id){
            // setCount()
            setProduct({...product, count:item.count})

          }else{
            setProduct({...product, count:0})
          }
          
        });
      }else{
        setProduct({...product, count:0})
      }
    
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headertxt1}
          onPress={() =>     navigation.navigate("TabView",{screen:"Home"})
        }
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertxt2}>
          {language === "EN"?product.deal_products &&
            product.deal_products[0] &&
            product.deal_products[0].deal &&
            product.deal_products[0].deal.name:product.deal_products &&
            product.deal_products[0] &&
            product.deal_products[0].deal &&
            product.deal_products[0].deal.name_ar}
        </Text>
      </View>
      <ScrollView>
        <View style={{ marginTop: "0%" }}>
          {product.deal_products[0] ?
          <View style={{ flex: 0.9, marginHorizontal: "5%" }}>
            <Text style={{ marginStart: 0, fontSize: 15, marginTop: 5, textAlign:"left" }}>
            {product.deal_products && product.deal_products[0].quantity_sold}
                        {language === "EN" ? EN.sold : AR.sold}{" "}
                        {product.deal_products && product.deal_products[0].quantity_max}  </Text>
            <View
              style={{
                height: 5,
                // width: item.value2 * 1,
                width: 300,
                backgroundColor: "#737373",
                borderRadius: 40,
              }}
            >
              <View
                style={{
                  height: 5,
                  // width: item.value * 1,
                  width: product.deal_products[0].quantity_sold * 300/product.deal_products[0].quantity_max,
                  backgroundColor: "black",
                  borderRadius: 40,
                }}
              ></View>
            </View>
          </View>
:null}
          <View style={{ marginTop: 10 }}>
            <ImageSlider
              loopBothSides
              // autoPlayWithInterval={3000}
              images={com == "product detail" ? images : images2}
              customSlide={({ index, item, style, width }) => (
                // It's important to put style here because it's got offset inside
                <View key={index} style={[style, styles.customSlide]}>
                  <Image
                    source={{ uri: item }}
                    resizeMode="contain"
                    style={{
                      height: height * 0.45,
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 10,
                      marginBottom: "1%",
                    }}
                  ></Image>
                </View>
              )}
            />
          </View>
          <View>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              {product.deal_products &&
              product.deal_products[product.deal_products.length - 1] ? (
                <View style={{ marginStart: "3%" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setcom("prize detail");
                    }}
                    style={{
                      height: height * 0.07,
                      width: width * 0.43,
                      backgroundColor:
                        com == "prize detail" ? "gold" : "#e6e6e6",
                      borderRadius: 10,
                      elevation: 5,

justifyContent:"center",

                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "800",
                        textAlign: "center",
                        color: com == "prize detail" ? "black" : "grey",
                      }}
                    >
                     {language === "EN"?EN.prize_detail:AR.prize_detail}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={{ alignSelf: "center", marginStart: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    setcom("product detail");
                  }}
                  style={{
                    height: height * 0.07,
                    width: width * 0.43,
                    backgroundColor:
                      com == "product detail" ? "gold" : "#e6e6e6",
                    elevation: 5,
                    borderRadius: 10,
alignItems:"center",
justifyContent:"center",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "800",
                      textAlign: "center",
                      // marginTop: 18,
                      color: com == "product detail" ? "black" : "grey",
                    }}
                  >
                    {language === "EN"?EN.product_detail:AR.product_detail}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{}}>
              {com == "prize detail" ? (
                <Prize data={product} language={language} />
              ) : com == "product detail" ? (
                <Product data={product} language={language} setColor={setColor} setSize={setSize} changeCS={changeCS}/>
              ) : (
                setcom("product detail")
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ ...styles.bottomLastView }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 14,
              marginStart: "8%",
              marginVertical: "5%",
              fontWeight: "700",
textAlign:"left"
            }}
          >
            {product.parent_name ? language=="EN"? product.parent_name:product.parent_name_ar + " " : ""}

            {language === "EN"? product.product_name: product.product_name_ar}
          </Text>
          {/* <Text style={styles.bottontxt}>840 AED</Text> */}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View
            //   onPress={() => navigation.navigate("on2")}
            style={{
              height: height * 0.07,
              width: width * 0.35,
              backgroundColor: "white",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "gray",
              alignSelf: "center",
              marginTop: -5,
              justifyContent:'center'

            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                
              }}
            >
              <Text
                style={styles.save_text1}
                onPress={async () => {
                  var pro = cart;
                  var pp = [];
                  if (product.count > 0) {
                    if (product.count === 1) {
                      pro.map((item, index) => {
// removeObjectWithId(pro, product.id)
                        if (item.id === product.id) {
                        } else {
                          // pro[index] = {...pro[index], count:item.count - 1}
                          pp.push(item);
                        }
                      });
                    } else {
                      pro.map((item, index) => {
                        if (item.id === product.id) {
                          pp[index] = { ...pro[index], count: item.count - 1 };
                        }
                      });
                    }
                    await AsyncStorage.setItem("@Cart", JSON.stringify(pp));
if(product.count>0){
                    setProduct({ ...product, count: product.count - 1 });

                    setCart(pp);
}
                  }
                }}
              >
                -
              </Text>

              <Text style={{ ...styles.save_text1, fontSize: 14 }}>
                {" "}
                {product.count}
              </Text>

              <Text
                style={styles.save_text1}
                onPress={async () => {
                  var pro = cart? cart : []
                  var pp = product;
                  if (product.count === 0) {
                    pro.push({...product,count :1, color:color, size:size});
                  
                  } else {
                    pro.map((item, index) => {
                      if (item.id === product.id) {
                        pro[index] = { ...pro[index], count: item.count + 1, color:color, size:size };
                      }
                    });
                  }
                  await setCart(pro);
                  await AsyncStorage.setItem("@Cart", JSON.stringify(pro));
                  // setSnackVisible(true)
                  await setProduct({ ...product, count: product.count + 1 });
                  
                }}
              >
                +
              </Text>
            </View>
          </View>

          <View
            //   onPress={() => navigation.navigate("on2")}
            style={{
              height: height * 0.07,
              width: width * 0.55,
              backgroundColor: "black",
              borderRadius: 10,
              alignSelf: "center",
              alignItems:"center",
              justifyContent:"center",
              marginTop: -5,
              paddingLeft:2
            }}
          >
            <TouchableOpacity onPress={async () => {
                  var pro = cart? cart : []
                  if (product.count === 0) {
                    pro.push({...product,count :1});
                  
                  
                  await AsyncStorage.setItem("@Cart", JSON.stringify(pro));
                  setProduct({ ...product, count: 1, color:color, size });
                  setCart(pro);
                  // setSnackVisible(true)
                  }else{

                    alert(language =="EN"?EN.already:AR.already)
                  }
                }} style={{ flexDirection: "row",alignItems:'center',  height: height * 0.07, }}>
              <View style={{ flex: product.count == 0?0.5:1, marginLeft:3,alignSelf:"center" }}>
                {product.count>0?
                <Text  style={styles.save_text}>{product.count}{" "}{language=="EN"?EN.productadded:AR.productadded}</Text>
         
         :       <Text  style={styles.save_text}>{language === "EN"? EN.add_to_cart:AR.add_to_cart}</Text>
                }
                </View>
              <View style={{ flex: product.count == 0? 0.5:0, display:product.count == 0 ? "flex":"none" }}>
                <Text style={styles.save_text}>
                  {parseInt(product.unit_price)} {product.currency_code}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ flex: 0.5 }}>
          <TouchableOpacity onPress={() => navigation.navigate("delivery")}
            style={styles.button1}>
            <Text style={styles.bottontxt1}>Checkout Now</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        style={{ backgroundColor: "gold" }}
        wrapperStyle={{ top: 50 }}
        duration={150}
        action={{ label: "" }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "gold",
            width: "100%",
          }}
        >
          <View style={{ marginStart: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              <Ionicons name="md-lock-closed-sharp" size={24} color="black" />1
             {" "}{language === "EN"
                ? EN.item_ready_in_cart
                : AR.item_ready_in_cart}
            </Text>
          </View>
          <View style={{ marginStart: 60 }}>
            <Text
              style={{ fontSize: 15 }}
              onPress={() => {
                const jumpToAction = TabActions.jumpTo("Cart");
                navigation.dispatch(jumpToAction);
              }}
            >
              {language === "EN" ? EN.check_out_now : AR.check_out_now}
            </Text>
            <View
              style={{ height: 2, width: 100, backgroundColor: "black" }}
            ></View>
          </View>
          {/* <Ionicons name="ios-chevron-forward" size={24} color="black" /> */}
        </View>
      </Snackbar>

    </View>
  );
}
const styles = StyleSheet.create({
  customSlide: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  box: { height: height * 0.5, width: "80%", borderRadius: 20 },
  bottomLastView: {
    backgroundColor: "white",

    elevation: 20,
    height: "15%",
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
  bottontxt: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bottontxt1: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gold",
  },
  out1: {
    fontSize: 13,
    fontWeight: "500",
    width: "95%",
    textAlign: "center",
    marginTop: "20%",
    color: "grey",
  },
  save_text: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    // marginTop: 15,
    color: "gold",
  },
  save_text1: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    // marginTop: 15,
    color: "black",
    paddingHorizontal: 15,
    lineHeight: 20,
    alignSelf:"center"
  },
  save_text2: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 15,
    color: "black",
  },
  save: {
    height: height * 0.09,
    width: width * 0.85,
    backgroundColor: "grey",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  save3: {
    height: height * 0.06,
    width: width * 0.35,
    backgroundColor: "gold",
    borderRadius: 10,

    marginTop: 20,
  },
  input: {
    height: height * 0.09,
    width: width * 0.85,
    borderRadius: 6,
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
  },

  text1: {
    color: "black",
    marginTop: 10,
    fontSize: 28,
    fontWeight: "600",
    fontWeight: "800",
    width: "60%",
    textAlign: "center",
    marginBottom: "4%",
  },
  text2: {
    color: "black",
    marginTop: 0,
    fontSize: 13,
    fontWeight: "600",
    fontWeight: "300",
    width: "60%",
    textAlign: "center",
    marginBottom: "5%",
  },
  select: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 30,
  },

  header: {
    height: "10%",
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: 2,

    flexDirection: "row",
    elevation: 5,
  },
  headertxt1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    // marginStart: 30,
width:"15%",
    // marginTop: 15,
alignItems:"center",
// backgroundColor:"red",
height:"100%",
justifyContent:'center'

  },


  headertxt2: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
textAlign:"center",
width:"80%",
    marginStart: -25,
    // marginTop: 15,
  },
});
