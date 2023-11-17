import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  ImageBackground,
Share
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { useEffect } from "react";
import {
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Snackbar, Button } from "react-native-paper";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

import { SafeAreaView } from "react-native-safe-area-context";

const WishList = ({ navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [snackVisible, setSnackVisible] = useState(false);
const [cart, setCart] = useState([])
  const [persons, setpersons] = React.useState([]);
const [language, setLanguage] = useState("EN")
const [loading, setLoading] = useState(false)
  useEffect(() => {
    // (async()=>{
  const unsubscribe = navigation.addListener('focus', async() => {
      // The screen is focused
      // Call any action
    
const lang = await AsyncStorage.getItem("@Language")
setLanguage(lang)
    const savedUser = await AsyncStorage.getItem("@WishList");
    // console.log("length",savedUser)
    
    const dd=JSON.parse(savedUser)
const arr = await AsyncStorage.getItem("@Cart");
const myCart=JSON.parse(arr)
setCart(myCart)
 var Array = [];
      if (myCart) {
          dd &&  dd.map((item, index) => {

              var add = false;

              myCart.map((element, index) => {
                var aa = false;
if(add ===false){
                if (element.id === item.id) {
                  add = true;
                 return Array.push({
                    ...item,
                    count: element.count,
                    
                  });
                }
}
              });
              if (add === false) {
                Array.push({
                  ...item
                });
              
}
            });
            // setpersons(Array);
            // setLoading(false);
            // mArray[0].productName===result.products[0].productName?getSelected(item):null
            // console.log(result.products[0].productName);
          } else {
          dd && dd.map((item, index) => {

              Array.push({
                ...item,
                count: 0,
                value2: "100",
                is_Favorite: false,
              });

            });
            // setpersons(Array);
            // setLoading(false);
          }
    setpersons(Array)
    

   })

return unsubscribe;
  }, [navigation]);

const onShare = async (url) => {
    try {
      const result = await Share.share({
        message:
          url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const handleOnPress = (index) => {
    if (selectedItems.length) {
      return selectItems(index);
    }
  };

  const getSelected = (item) => selectedItems.includes(item.id);
  const deSelectItems = () => setSelectedItems([]);

  const selectItems = (item) => {
    if (selectedItems.includes(item.id)) {
      const newListItems = selectedItems.filter(
        (listItem) => listItem !== item.id
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.id]);
  };
  const getItem = (item) => {
    //Function for click on an item
    setSnackVisible(!snackVisible);
  };
const removeItem =async(e,index)=>{
 let filteredArray = persons.filter(item => item.id !== e.id)
    setpersons(filteredArray);
 await AsyncStorage.setItem("@WishList", JSON.stringify(filteredArray));
       

}

  const ListItem1 = ({ item, index }) => {

    return (
      <View style={{}}>
        <View style={{}}>
          <View style={styles.container}>
            <View style={{}}>
              <View>
                <ImageBackground
                  source={require("../../assets/product.jpeg")}
                  resizeMode="stretch"
                  style={styles.box2}
                >
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={{ flex: 0.9, marginStart: "7%" }}>
                      <Text
                        style={{
                          marginStart: 0,
                          fontSize: 15,
                          marginVertical: 5,
                          textAlign: "left",
                        }}
                      >
                        {item.sold}
                        {language === "EN" ? EN.sold : AR.sold}
                        {item.max}
                        {/* {item.deal_products && item.deal_products[0] && item.deal_products[0].quantity_max} */}
                      </Text>
                      <View
                        style={{
                          height: 4,
                          width: 100,
                          backgroundColor: "#737373",
                          borderRadius: 40,
                        }}
                      >
                        {item.deal_products.length > 0 ?
                          <View
                            style={{
                              height: 4,
                              width: item.deal_products.length > 0 ? (item.sold * 100 / item.max) : 0,
                              backgroundColor: "black",
                              borderRadius: 40,
                            }}
                          ></View> : null}
                      </View>
                    </View>
                    <View style={{ flex: 0.15 }}>
                      <TouchableOpacity onPress={() => onShare(`https://www.winnerx.com/product-details/${item.id}`)}>
                        <View style={{ marginTop: 0, marginLeft: 0 }}>
                          <Ionicons
                            name="ios-share-social-sharp"
                            size={24}
                            color="black"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.18 }}>
                      <TouchableOpacity
                        // onPress={onPress}
                        // onLongPress={onLongPress}
                        // onPress={onPress}
                        onPress={() =>removeItem(item,index)}
                        style={{}}
                      >
                        <View style={{ marginTop: 1, marginLeft: 0 }}>
                          <Text>
                            {/* {item.is_Favorite ? ( */}
                              <AntDesign
                                name="heart"
                                size={20}
                                color={"black"}
                              />
                            {/* ) : (
                              <AntDesign
                                name="hearto"
                                size={20}
                                color={"white"}
                              />
                            )} */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                      <View style={{ ...styles.image3 }}>
                        <View style={styles.out1}>
                          <Text style={styles.out1_text}>
                            {language === "EN" ? EN.buy : AR.buy}
                          </Text>
                        </View>
                        <Image
                          source={{ uri: item.deal_products[0]?.product?.image_url_main }}
                          style={{ ...styles.image3style, }}
                        />
                        {/* <View style={styles.out1}>
                          <Text style={styles.out3_text}>
                            {language === "EN"
                              ? item.product_name
                              : item.product_name_ar}
                          </Text>
                        </View> */}
                      </View>
                      <View style={styles.image2}>
                        <View style={styles.out1}>
                          <Text style={{ ...styles.out1_text, fontSize: 50 }}>
                            {language === "EN" ? EN.win : AR.win}
                          </Text>
                        </View>
                        <Image
                          source={{
                            uri: item.image_url_main,
                          }}
                          style={styles.image2style}
                        />
                        {/* <View style={styles.out1}>
                            <Text style={styles.out3_text}>
                              {language === "EN"
                                ? item.deal_products[0].deal.name
                                : item.deal_products[0].deal.name_ar}
                            </Text>
                          </View> */}
                      </View>

                    </View>

                    {/* <View style={styles.out1}> */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginBottom: 10,
                      }}
                    >
                      <Text style={styles.out3_text}>
                        {language === "EN"
                          ? item.deal_products[0]?.product?.product_name
                          : item.deal_products[0]?.product?.product_name_ar}
                      </Text>
                      {/* </View> */}
                      {/* <View style={styles.out1}> */}
                      <Text style={styles.out3_text}>
                        {language === "EN"
                          ? item.name
                          : item.name_ar}
                      </Text>
                    </View>
                    <View style={styles.counter}>
                      <Text style={styles.counter2_text}>{ item.deal_products[0].product.count > 0 ?  item.deal_products[0].product.count : null}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        marginBottom: "10%",
                        height: 40,
                        backgroundColor: "black",
                        width: width * 0.85,
                        // marginTop: 20,
                        alignItems: "center",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <TouchableOpacity
                        style={styles.button1}
                        onPress={() => {
                          // setmute(true)
                          navigation.navigate("NewDetail", { item: item })
                        }
                        }
                      >
                        <Text style={{ ...styles.button_text, fontSize: 9 }}>
                          {/* View Details */}
                          {language === "EN"
                            ? EN.view_product
                            : AR.view_product}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.tapbutton}>
                        <Text style={{ color: "white", marginTop: 8 }}>|</Text>
                      </View>
                      <View
                        style={{
                          ...styles.price,
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* <View style={{ flexDirection: "row" , alignItems:"center"}}> */}
                        <Text style={{ ...styles.button_text, fontSize: 9 }}>
                          {parseInt(item.deal_products[0]?.product?.unit_price)} {item.deal_products[0]?.product?.currency_code}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", display: item.deal_products.length > 1 ? "none" : "flex", display:"none" }}>
                        <View style={styles.tapbutton}>
                          <Text
                            style={{
                              color: "white",
                              marginTop: 8,
                              marginStart: 6,
                            }}
                          >
                            |
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={{
                            ...styles.tapbutton,
                            display:  item.deal_products[0].product.count === 0 ? "none" : "flex",
                          }}
                          onPress={() => {
                            if ( item.deal_products[0].product.count > 0) {
                              let arr = [...persons];
                              arr.map((item, index1) => {
                                if (index == index1) {
                                  arr[index] = {
                                    ...arr[index],
                                    ...arr[index].deal_products[0].product.count =  item.deal_products[0].product.count - 1,
                                  };

                                  var ddd = cart;
                                  console.log(cart)
                                  var rd = [];
                                  var add = false;
                                  ddd &&
                                    ddd.some((element) => {
                                      if (element.id ===  item.deal_products[0].product.id) {
                                        if (element.count > 1) {
                                          var aa = {
                                            ...element,
                                            count: element.count - 1,
                                          };

                                          rd.push(aa);
                                        } else {
                                        }
                                        add = true;
                                      } else {
                                        rd.push(element);
                                      }
                                    });
                                  if (add === false) {
                                    rd.push(arr[index]);
                                  }
                                  AsyncStorage.setItem(
                                    "@Cart",
                                    JSON.stringify(rd)
                                  );
                                  setCart(rd);
                                } else {
                                  arr[index1] = { ...arr[index1] };
                                }
                              });

                              setpersons(arr);
                              navigation.navigate("TabView", { screen: "Home" })

                            }
                          }}
                        >
                          <Text style={styles.counter_text}>-</Text>
                        </TouchableOpacity>
                        { item.deal_products[0].product.count !== 0 ? (
                          <View style={styles.add_to_cart}>
                            <Text style={styles.cart_text}>
                              {language === "EN"
                                ? EN.add_to_cart
                                : AR.add_to_cart}
                            </Text>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.add_to_cart}
                            onPress={() => {
                              let arr = [...persons];
                              setLoading(true);
                              //  {rowData.conter == 1?
                              arr.map(async (item1, index1) => {
                                if (index == index1) {
                                  arr[index] = {
                                    ...arr[index],
                                    ...arr[index].deal_products[0].product.count = item1.deal_products[0].product.count + 1,
                                  };
                                  //  const myArray =  await AsyncStorage.getItem('@Cart')
                                  //   if (myArray !== null) {
                                  //     // We have data!!
                                  //     console.log(JSON.parse(myArray)[0].categoryName);
                                  //   }
                                  var ddd = cart;
                                  var rd = [];
                                  var add = false;
                                  ddd &&
                                    ddd.map((element, index) => {
                                      if (element.id ===  item.deal_products[0].product.id) {
                                        var aa = {
                                          ...element,
                                          count: element.count + 1,
                                        };
                                        add = true;
                                        rd.push(aa);
                                      } else {
                                        rd.push(element);
                                        // add = true;
                                      }
                                    });
                                  if (add === false) {
                                    rd.push(arr[index].deal_products[0].product);
                                  }
                                  AsyncStorage.setItem(
                                    "@Cart",
                                    JSON.stringify(rd)
                                  );
                                  setCart(rd);
                                } else {
                                  arr[index1] = { ...arr[index1] };
                                }
                              });
                              setpersons(arr);
                              getItem(item);
                              navigation.navigate("TabView", { screen: "Home" })

                              setLoading(false);
                            }}
                          >
                            <Text style={styles.cart_text}>
                              {language === "EN"
                                ? EN.add_to_cart
                                : AR.add_to_cart}
                            </Text>
                          </TouchableOpacity>
                        )}
                        <View
                          style={{
                            ...styles.tapbutton,
                            display:  item.deal_products[0].product.count === 0 ? "none" : "flex",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              let arr = [...persons];
                              setLoading(true);
                              //  {rowData.conter == 1?
                              arr.map(async (item1, index1) => {
                                if (index == index1) {
                                  arr[index] = {
                                    ...arr[index],
                                    ...arr[index].deal_products[0].product.count = item1.deal_products[0].product.count + 1,
                                  };
                                  //  const myArray =  await AsyncStorage.getItem('@Cart')
                                  //   if (myArray !== null) {
                                  //     // We have data!!
                                  //     console.log(JSON.parse(myArray)[0].categoryName);
                                  //   }
                                  var ddd = cart;
                                  var rd = [];
                                  var add = false;
                                  ddd &&
                                    ddd.map((element, index) => {
                                      if (element.id === item.deal_products[0].product.id) {
                                        var aa = {
                                          ...element,
                                          count: element.count + 1,
                                        };
                                        add = true;
                                        rd.push(aa);
                                      } else {
                                        rd.push(element);
                                        // add = true;
                                      }
                                    });
                                  if (add === false) {
                                    rd.push(arr[index]);
                                  }
                                  AsyncStorage.setItem(
                                    "@Cart",
                                    JSON.stringify(rd)
                                  );
                                  setCart(rd);
                                } else {
                                  arr[index1] = { ...arr[index1] };
                                }
                              });

                              setpersons(arr);
                              getItem(item);
                              navigation.navigate("TabView", { screen: "Home" })

                              setLoading(false);
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.counter_text}>+</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* <View style={styles.button3}></View> */}
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {/* </ImageBackground> */}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
          <Text style={styles.headertxt} >
            {language === "EN"?EN.wishlist:AR.wishlist}
          </Text>
          
      </View>
      <ScrollView>
{persons && persons.length>0 ?
        <View style={{}}>
        
          
          <Pressable onPress={deSelectItems} style={{}}>
            <FlatList
              data={persons}
              extraData={persons}
              scrollEnabled={false}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <ListItem1
                  onPress={() => {
                    handleOnPress(item);
                    selectItems(item);
                  }}
                  selected={getSelected(item)}
                  item={item}
                  index={index}
                />
              )}
            />
          </Pressable>
        </View>
:<View>
<Text style={{textAlign:"center", marginTop:70, fontWeight:"bold", fontSize:16, marginBottom:30}}>{language ==="EN" ? EN.empty_wishlist:AR.empty_wishlist}</Text>
{/* <TouchableOpacity
            onPress={() => navigation.navigate("delivery",{total:`${itemtotal + deliveryCharg + tax -coupon} ${currency}`})}
            style={styles.button1}
          >
            <Text style={styles.bottontxt1}>Start Shopping</Text>
          </TouchableOpacity> */}
</View>}
      </ScrollView>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        style={{ backgroundColor: "gold" }}
        wrapperStyle={{ top:50 }}
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
           {language==="EN"?EN.item_ready_in_cart:AR.item_ready_in_cart} </Text>
          </View>
          <View style={{ marginStart: 30 }}>
            <Text style={{ fontSize: 15 }}>{language==="EN"?EN.check_out_now:AR.check_out_now}</Text>
            <View
              style={{ height: 2, width: 100, backgroundColor: "black" }}
            ></View>
          </View>
          {/* <Ionicons name="ios-chevron-forward" size={24} color="black" /> */}
        </View>
      </Snackbar>
    </SafeAreaView>
  );
};

export default WishList;

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
  out2_text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 4,
    width: "80%",
    color: "white",
  },
  out1_text: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 6,
    width: "80%",
    color: "black",
    marginStart: 1,
    lineHeight: 42,
  },
  out3_text: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 6,
    width: "40%",
    color: "black",
    // marginStart: ,
  },
  shareimage: {
    height: 20,
    width: 20,
    marginTop: 10,
    resizeMode: "stretch",
    marginStart: 20,
  },
  heartimage: {
    height: 20,
    width: 20,
    marginTop: 10,
    resizeMode: "cover",
    marginStart: 20,
  },
  button3_text: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    margin: 9,
    marginStart: 16,
  },
  button4_text: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    marginTop: 8,
    marginStart: 10,
  },
  box2: {
    // height: height * 0.35,
    width: width * 0.96,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  out2: {
    height: 80,
    width: "40%",
    backgroundColor: "#e6c300",
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    marginTop: "20%",
  },
  box3: {
    height: height * 0.22,
    width: width * 0.42,
    marginLeft: -10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 80,
    backgroundColor: "yellow",

    flexDirection: "row",
  },
  out1: {
    marginTop: "20%",
    flex: 1,

    // marginStart: "10%",
  },

  column: { flexDirection: "column" },
  row: { flexDirection: "row" },
  container: { backgroundColor: "white" },

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
  text6: { marginStart: 25, marginTop: 30, flex: 0.94 },
  text6style: { fontSize: 15, color: "#737373" },
  view_detailes_line: {
    backgroundColor: "black",
    height: 1,
    width: width * 0.35,
    marginTop: 0,
    marginLeft: 0,
  },
  button1: {
    // height: height * 0.05,
    width: width * 0.23,
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    //     borderTopLeftRadius: 10,
    // borderBottomLeftRadius:10,
    // backgroundColor: "red",
    // margin: 0,
    // marginTop: 20,

    marginBottom: 0,
  },
  add_to_cart: {
    // height: height * 0.05,
    width: width * 0.2,
    // borderRadius: 0,
    // backgroundColor: "black",
    // margin: 0,
    // marginTop: 20,

    marginBottom: 0,
  },
  price: {
    // height: height * 0.05,
    width: width * 0.15,
    // borderRadius: 0,
    // backgroundColor: "black",

    // marginTop: 20,

    marginBottom: 0,
  },
  counter: {
    height: height * 0.03,
    width: width * 0.1,
    borderRadius: 6,
    // backgroundColor: "black",
    alignSelf: "flex-end",
    marginTop: 20,
    marginEnd: 25,
  },
  tapbutton: {
    height: 35,
    width: width * 0.05,
    // borderRadius: 0,
    // backgroundColor: "red",

    // marginTop: 20,
    // marginStart: "0%",
    // marginBottom: 0,
  },
  tapbutton2: {
    height: height * 0.05,
    width: width * 0.02,
    borderRadius: 0,
    // backgroundColor: "red",

    marginTop: 20,
    marginStart: "0%",
    marginBottom: 0,
  },
  button2: {
    height: height * 0.05,
    width: width * 0.03,
    borderRadius: 0,
    backgroundColor: "black",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    margin: 0,
    marginTop: 20,

    marginBottom: 0,
  },
  button3: {
    height: height * 0.05,
    width: width * 0.02,
    borderRadius: 0,
    backgroundColor: "black",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,

    marginTop: 20,

    marginBottom: 0,
  },

  button_text: {
    color: "white",
    textAlign: "center",
    // marginTop: 10,
    marginStart: 7,
    fontSize: 13,
    fontWeight: "800",
  },
  price_text: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    marginStart: 0,
    fontSize: 12,
    fontWeight: "800",
  },
  price_text2: {
    color: "white",
    textAlign: "center",
    marginTop: 13,
    marginStart: 4,
    fontSize: 10,
    fontWeight: "800",
  },
  cart_text: {
    color: "gold",
    textAlign: "center",
    // marginTop: 10,
    // marginStart: 7,
    fontSize: 10,
    lineHeight: 40,
    fontWeight: "800",
  },
  counter_text: {
    color: "gold",
    textAlign: "center",
    // marginTop: 9,
    fontSize: 14,
    // marginStart: 0,
    fontWeight: "800",
    lineHeight: 35,
    width: 22,
  },
  counter2_text: {
    color: "black",
    textAlign: "center",
    marginTop: 1,
    fontSize: 14,
    fontWeight: "800",
  },
  image2: { marginTop: "0%", marginStart: "10%" },
  image2style: {
    width: width * 0.45,
    height: height * 0.25,
    resizeMode: "stretch",
    // backgroundColor:"red"
  },
  image3: { alignSelf: "center", marginStart: "10%" },
  image3style: {
    width: width * 0.3,
    height: height * 0.25,
    resizeMode: "contain",
    // backgroundColor:"red"
  },
  cont2: { flexDirection: "column", marginTop: 20 },
  text7: {
    marginLeft: 20,
    fontSize: 14,
    width: width * 0.42,
    color: "#737373",
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

});
