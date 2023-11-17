import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Linking,
TextInput,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  ImageBackground,
Share
} from "react-native";
import { TabActions } from "@react-navigation/native";

import Loader from "../component/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FETCH_DEAL } from "../API";

import { useEffect } from "react";
import {
  Entypo,
  Feather,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  Octicons,
  FontAwesome,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Snackbar, Button } from "react-native-paper";
import { Video, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../component/Banner";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const HomeSearch = ({ navigation }) => {
  const [mute, setmute] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackVisible1, setSnackVisible1] = useState(false);

  const [language, setLanguage] = useState("EN");
  const videoPlayer = React.useRef();

  const goFullScreen = () => {
    if (videoPlayer.current) {
      videoPlayer.current.presentFullscreenPlayer();
    }
  };
  const [loading, setLoading] = React.useState(true);
  const [persons, setpersons] = React.useState([]);
const [initial, setInitial] = React.useState([])
  const [cart, setCart] = useState([]);
  const [wishArray, setWishArray] = useState([]);
const [searchTxt, setSearchTxt]  = useState("")
  useEffect(() => {
    // (async () => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const Wish = await AsyncStorage.getItem("@WishList");
      const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);
      var WishData = JSON.parse(Wish);
      if (WishData) {
        setWishArray(WishData);
        // console.log(WishData.length);
      }
      const cartData = await AsyncStorage.getItem("@Cart");
      var myArray = JSON.parse(cartData);
      setCart(myArray);

      // console.log(myArray.length)
      FETCH_DEAL()
        .then((response) => response.json())
        .then((result) => {
          var Array = [];
          // if (myArray) {
          result.products.map((item, index) => {
            // if (index < 7) {
              Array.push({
                ...item,
                count: 0,
                value2: "100",
                is_Favorite: false,
              });
            // }
          });
          Array.map((item, index) => {
            if (myArray) {
              myArray.map((car) => {
                if (item.id === car?.id) {
                  // console.log("item.id");
                  Array[index] = { ...item, count: car.count };
                }
              });
            }
          });

          Array.map((item, index) => {
            if (WishData) {
              WishData.map((wd) => {
                if (item.id === wd.id) {
                  Array[index] = { ...item, is_Favorite: true };
                }
              });
            }
          });

          setpersons(Array);
setInitial(Array)
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
    });
    // })();
    return unsubscribe;
  }, []);

  const handleOnPress = (index) => {
    if (selectedItems.length) {
      return selectItems(index);
    }
  };
const searchText = (e) => {
setSearchTxt(e)
    let text = e.toLowerCase()
    let trucks = initial
    let filteredName = trucks.filter((item) => {
      return item.product_name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      // this.setState({
      //   data: initial
      // })
setpersons(initial)
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      // this.setState({
      //   noData: true
      // })
setpersons([])
    } else if (Array.isArray(filteredName)) {
      // this.setState({
      //   noData: false,
      //   data: filteredName
      // })
setpersons(filteredName)
    }
  }
  const getSelected = (item) => selectedItems.includes(item);
  const deSelectItems = () => setSelectedItems([]);

  const selectItems = (item) => {
    if (selectedItems.includes(item)) {
      const newListItems = selectedItems.filter(
        (listItem) => listItem !== item
      );
      //  AsyncStorage.setItem("data", JSON.stringify(...newListItems));
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item]);
    var a = [];
    a.push(...selectedItems, item);
    AsyncStorage.setItem("data", JSON.stringify(a));
  };
  // useEffect(() => {
  // return async () => {
  //   await AsyncStorage.setItem("data", JSON.stringify(selectedItems));
  // }
  // }, [])
  // console.log(selectedItems);
  // const saveData = async () => {
  //   try {
  //     await AsyncStorage.setItem("data", JSON.stringify(selectedItems));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const favoritePostClick1 = async (p_id) => {
    setLoading(true);
    var FoodDetails = persons;
    var Wish = wishArray;
    for (var i = 0; i < FoodDetails.length; i++) {
      if (FoodDetails[i].id == p_id) {
        var newArray1 = [];

        for (var i = 0; i < FoodDetails.length; i++) {
          if (FoodDetails[i].id == p_id) {
            newArray1.push({
              ...FoodDetails[i],
              is_Favorite: !FoodDetails[i].is_Favorite,
            });
            if (FoodDetails[i].is_Favorite == false) {
              Wish.push({
                ...FoodDetails[i],
                is_Favorite: true,
              });
setSnackVisible1(!snackVisible1);
              console.log(Wish.length);
              // WishData && WishData.map((item)=>{
              // if(item.id === FoodDetails[i].id){
              // WishData
              // }
              // })

              //         const usersCollection =  firestore().collection('allusers').doc(this.state.uid).collection("Favorites")
              // usersCollection.doc(FoodId).set({...FoodDetails[i]})
            } else {
              var Array = [];
              Wish &&
                Wish.map((item) => {
                  if (item.id === FoodDetails[i].id) {
                  } else {
                    Array.push(item);
                  }
                });
              console.log(Array.length);
              Wish = Array;
              // const usersCollection =  firestore().collection('allusers').doc(this.state.uid).collection("Favorites")
              // usersCollection.doc(FoodId).delete()
            }
          } else {
            newArray1.push({
              ...FoodDetails[i],
              is_Favorite: FoodDetails[i].is_Favorite,
            });
          }
        }
        FoodDetails = newArray1;
        // setWishArray(Wish)
        await AsyncStorage.setItem("@WishList", JSON.stringify(Wish));
        setWishArray(Wish);
        setpersons(FoodDetails);
        setLoading(false);
      }
    }
  };

  //   const handleOnPress = (index) => {
  //     if (selectedItems.length) {
  //       return selectItems(index);
  //     }
  //   };

  //   const getSelected = (item) => selectedItems.includes(item.id);
  //   const deSelectItems = () => setSelectedItems([]);

  //   const selectItems = (item) => {
  // setLoading(true)
  //     if (selectedItems.includes(item.id)) {
  //       const newListItems = selectedItems.filter(
  //         (listItem) => listItem !== item.id
  //       );
  // setLoading(false)
  //       return setSelectedItems([...newListItems]);
  //     }
  //     setSelectedItems([...selectedItems, item.id]);
  // setLoading(false)
  //   };

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
  const getItem = (item) => {
    //Function for click on an item
    setSnackVisible(!snackVisible);
  };

  const ListItem = ({ item, selected, onPress, onLongPress, index }) => (
    <View style={{}}>
{item.deal_products[0].quantity_max > item.deal_products[0].quantity_sold ?
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
                    <View style={{ flex: 0.9, marginStart: "0%" }}>
                      <Text
                        style={{
                          marginStart: 0,
                          fontSize: 15,
                          marginVertical: 5,
                          textAlign: "left",
                        }}
                      >
                        {item.deal_products && item.deal_products[0].quantity_sold}
                        {language === "EN" ? EN.sold : AR.sold}
                        {item.deal_products && item.deal_products[0].quantity_max}
                        {/* {item.unitsInStock} sold out of {item.units_in_stock} */}
                      </Text>
                      <View
                        style={{
                          height: 4,
                          width: 100,
                          backgroundColor: "#737373",
                          borderRadius: 40,
                        }}
                      >
                        <View
                          style={{
                            height: 4,
                            width:item.deal_products[0].quantity_sold * 100/item.deal_products[0].quantity_max,
                            backgroundColor: "black",
                            borderRadius: 40,
                          }}
                        ></View>
                      </View>
                    </View>
                    <View style={{ flex: 0.15, display:"none" }}>
                      <TouchableOpacity onPress={()=>onShare(`https://www.winnerx.com/product-details/${item.id}`)}>
                        <View style={{ marginTop: 0, marginLeft: 0 }}>
                          <Ionicons
                            name="ios-share-social-sharp"
                            size={24}
                            color="black"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.18, display:"none" }}>
                      <TouchableOpacity
                        // onPress={onPress}
                        // onLongPress={onLongPress}
                        // onPress={onPress}
                        onPress={() => favoritePostClick1(item.id, index)}
                        style={{}}
                      >
                        <View style={{ marginTop: 1, marginLeft: 0 }}>
                          <Text>
                            {item.is_Favorite ? (
                              <AntDesign
                                name="heart"
                                size={20}
                                color={"black"}
                              />
                            ) : (
                              <AntDesign
                                name="hearto"
                                size={20}
                                color={"white"}
                              />
                            )}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                      <View style={styles.image3}>
                        <View style={styles.out1}>
                          <Text style={styles.out1_text}>
                            {language === "EN" ? EN.buy : AR.buy}
                          </Text>
                        </View>
                        <Image
                          source={{ uri: item.image_url_main }}
                          style={{ ...styles.image3style }}
                        />
                        {/* <View style={styles.out1}>
                          <Text style={styles.out3_text}>
                            {language === "EN"
                              ? item.product_name
                              : item.product_name_ar}
                          </Text>
                        </View> */}
                      </View>
                      {item.deal_products &&
                      item.deal_products[0] ? (
                        <View style={styles.image2}>
                          <View style={styles.out1}>
                            <Text style={{ ...styles.out1_text, fontSize: 40 }}>
                              {language === "EN" ? EN.win : AR.win}
                            </Text>
                          </View>
                          <Image
                            source={{
                              uri: item.deal_products[0].deal.image_url_main,
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
                      ) : null}
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
                          ? item.product_name
                          : item.product_name_ar}
                      </Text>
                      {/* </View> */}
                      {/* <View style={styles.out1}> */}
 {item.deal_products &&
                      item.deal_products[0] ?
                      <Text style={styles.out3_text}>
                        {language === "EN"
                          ? item.deal_products[0].deal.name
                          : item.deal_products[0].deal.name_ar}
                      </Text>:<Text></Text>}
                    </View>
                    {item.count>0?  <View style={styles.counter}>
                    <Text style={styles.counter2_text}>{item.count>0?item.count:null}</Text>
       </View>:null}
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        marginBottom: "10%",
                        height: 40,
                        backgroundColor: "black",
                        width: "100%",
                        // marginTop: 20,
                        alignItems: "center",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={styles.button1}
                        onPress={() =>
                          navigation.navigate("details", { item: item })
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
                        <Text style={styles.price_text}>
                          {parseInt(item.unit_price)} {item.currency_code}
                        </Text>
                      </View>

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
                          display: item.count === 0 ? "none" : "flex",
                        }}
                        onPress={() => {
                          if (item.count > 0) {
                            let arr = [...persons];
                            //  {rowData.conter == 1?
                            arr.map((item, index1) => {
                              if (index == index1) {
                                arr[index] = {
                                  ...arr[index],
                                  count: item.count - 1,
                                };

                                var ddd = cart;
                                var rd = [];
                                var add = false;
                                ddd &&
                                  ddd.some((element) => {
                                    if (element.id === item.id) {
                                      if (element.count > 1) {
                                        var aa = {
                                          ...element,
                                          count: element.count - 1,
                                        };

                                        rd.push(aa);
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
                                setCart(rd)
                              } else {
                                arr[index1] = { ...arr[index1] };
                              }
                            });

                            setpersons(arr);
                          }
                        }}
                      >
                        <Text style={styles.counter_text}>-</Text>
                      </TouchableOpacity>
                      {item.count !== 0 ? (
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
                                  count: item1.count + 1,
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
                                    if (element.id === item.id) {
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
                          display: item.count === 0 ? "none" : "flex",
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
                                  count: item1.count + 1,
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
                                    if (element.id === item.id) {
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
                            setLoading(false);
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.counter_text}>+</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      {/* <View style={styles.button3}></View> */}
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {/* </ImageBackground> */}
            </View>
          </View>
        
      </View>:null}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row",  }}>
        <TextInput
style={{width:"75%", height:50, backgroundColor:"white", borderRadius:10, marginLeft:10, paddingHorizontal:10}}
value={searchTxt}
onChangeText={(text)=>searchText(text)}
/>
          <Text
            style={{color:"white",alignSelf:"center", width:"20%", textAlign:'center'}}
            onPress={() => navigation.goBack()}
// onPress={()=>navigation.navigate("Payment")}
          >
Cancel
            {/* <EvilIcons name="search" size={24} color="gold" /> */}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{}}>
         
          <FlatList
            data={persons}
            extraData={persons}
            scrollEnabled={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <ListItem
                // onPress={() => {
                //   // handleOnPress(item);
                //   selectItems(item);
                // }}
                // selected={getSelected(item)}
                // item={item}
                // index={index}
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
        </View>
      </ScrollView>
      <Loader loading={loading} />
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
              {language === "EN"
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

  <Snackbar
        visible={snackVisible1}
        onDismiss={() => setSnackVisible1(false)}
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
              <Ionicons name="md-lock-closed-sharp" size={24} color="black" />
              {/* {language === "EN"
                ? EN.item_ready_in_cart
                : AR.item_ready_in_cart} */}
Item Added WishList Successfully
            </Text>
          </View>
          {/* <View style={{ marginStart: 60 }}>
            <Text
              style={{ fontSize: 15 }}
              onPress={() => {
                const jumpToAction = TabActions.jumpTo("WishList");
                navigation.dispatch(jumpToAction);
              }}
            >
              {language === "EN" ? EN.check_out_now : AR.check_out_now}
            </Text>
            <View */}
              {/* style={{ height: 2, width: 100, backgroundColor: "black" }}
            ></View> */}
          {/* </View> */}
          {/* <Ionicons name="ios-chevron-forward" size={24} color="black" /> */}
        </View>
      </Snackbar>
    
    </SafeAreaView>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  header: {
    height: 65,
    backgroundColor: "#262626",

    justifyContent: "center",
    marginTop: 0,
  },
  headertxt: {
    // color: "white",
    // fontWeight: "bold",
    // fontSize: 20,
    // flex: 1.8,
    // marginStart: 15,
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  headertxt1: {
    color: "white",
    fontWeight: "bold",
    flex: 0.25,
    marginTop: 15,
  },
  // video: {
  //     alignSelf: 'center',
  //     width:width,
  //     height: height*0.5,borderBottomLeftRadius:10,borderBottomRightRadius:10
  //   },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    right: 0,
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
  height:"100%",
  alignItems:'center',
  justifyContent:'center',
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
    marginEnd: 50,
  },
  tapbutton: {
    height: 35,
    width: width * 0.05,
    // borderRadius: 0,
    // backgroundColor: "black",

    // marginTop: 20,
    // marginStart: "0%",
    // marginBottom: 0,
  },
  tapbutton2: {
    height: height * 0.05,
    width: width * 0.02,
    borderRadius: 0,
    backgroundColor: "black",

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
    // marginRight:50
  },
  image2: { marginTop: "0%", marginStart: "10%" },
  image2style: {
    width: width * 0.4,
    height: height * 0.2,
    resizeMode: "cover",
    // backgroundColor:"red"
  },
  image3: { alignSelf: "center", marginStart: "10%" },
  image3style: {
    width: width * 0.3,
    height: height * 0.18,
    resizeMode: "cover",
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
