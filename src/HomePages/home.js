import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Share,
  RefreshControl,
  Alert,
  Modal,
FlatList
} from "react-native";
import { TabActions } from "@react-navigation/native";

import Loader from "../component/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageSlider from 'react-native-image-slider';
import { useScrollToTop } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'
// import { FlashList } from "@shopify/flash-list";
import { FETCH_DEAL, Dashboard, FETCH_ALL_DEAL } from "../API";

import { useEffect } from "react";
import {
  Entypo,
  AntDesign,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Snackbar, Button } from "react-native-paper";
// import { Video, AVPlaybackStatus } from "expo-av";
import Video from 'react-native-video';

import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../component/Banner";
import { EN } from "../../language/en";
import { AR } from "../../language/ar";
import { initiateSamsungPay } from "@network-international/react-native-ngenius";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const [mute, setmute] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackVisible1, setSnackVisible1] = useState(false);
  const [friendly, setFriendly] = useState([])
  const [language, setLanguage] = useState("EN");
  const [modalVisible, setModalVisible] = useState(false)
  const videoPlayer = React.useRef();

  const goFullScreen = () => {
    // if (videoPlayer.current) {
      // videoPlayer.current.presentFullscreenPlayer();
    // }
    // navigation.navigate("Div")
    setModalVisible(true)
  };
  const [loading, setLoading] = React.useState(true);
  const [persons, setpersons] = React.useState([]);
  const [cart, setCart] = useState([]);
  const [wishArray, setWishArray] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    (async () => {

      setLoading(true)
      // navigation.navigate("TabView", {screen:"Home"})
      fetch()
    })()
  }, []);
  const [Onboard, setOnboard] = useState([{
    "created_at": "2023-01-15T00:00:00.000Z",
    "id": 1,
    "is_image": "false",
    // "link": "https://firebasestor/age.googleapis.com/v0/b/winnerx-f9ad1.appspot.com/o/Laila%20xWinner_10_Cut.mp4?alt=media&token=a446e058-bb13-44e5-91a6-eaaa47d4afee",
    "modified_at": "2023-01-15T00:00:00.000Z",
    "title": "dashboard_video",
  }])
  const ref = React.useRef(null);

  useScrollToTop(ref);
  useEffect(() => {
    (async () => {
      // AsyncStorage.removeItem("@WishList")
      await fetch_friendly()
      // Dashboard().then((response) => response.json())
      //   .then((result) => {

      //     console.log(result.dashboards)

      //     setOnboard(result.dashboards)
      //   })
      //   .catch((e) => console.log(e))
    })()
  }, [])


  useEffect(() => {
    // (async () => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // setLoading(true)
      // await fetch_friendly()
      await fetch()

    });
    // })();
    return unsubscribe;
  }, []);


  const fetch_friendly = async() => {
   
    const cartData = await AsyncStorage.getItem("@Cart");
    var myArray = JSON.parse(cartData);
    setCart(myArray);

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

        // setpersons(Array);
        setFriendly(Array)
      });
    // setLoading(false)
  }
  const fetch = async () => {

    navigation.navigate("TabView", { screen: "Home" })

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
    FETCH_ALL_DEAL()
      .then((response) => response.json())
      .then((result) => {
        var Array = [];
        result.deals.map((item, index) => {
          var sold = 0
          var max = 0

          item.deal_products && item.deal_products.map((it) => {

            sold = sold + it.quantity_sold
            max = max + it.quantity_max
          })
          item.deal_products.map((ele, i) => {
            return {...ele, ...ele.product.count = 0};
         })
          Array.push({
            ...item,
            ...item.deal_products[0].product.count = 0,
            value2: "100",
            is_Favorite: false,
            sold: sold,
            max: max,
          });
          // console.log(item.deal_products[0].product.count,"this is count")
        });

        Array.map((item, index) => {
          if (myArray) {
            myArray && myArray.map((car) => {
              if (item.deal_products[0].product.id === car?.id) {
                // console.log("item.id");
                Array[index] = { ...item, ...item.deal_products[0].product.count = car.count };
              }
            });
          }
        });

        Array.map((item, index) => {
          if (WishData) {
            WishData.map((wd) => {
              if (item.deal_products[0].product.id === wd.id) {
                Array[index] = { ...item, is_Favorite: true };
              }
            });
          }
        });

        setpersons(Array);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));

  }
  const handleOnPress = (index) => {
    if (selectedItems.length) {
      return selectItems(index);
    }
  };
  const getSelected = (item) => selectedItems.includes(item);

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

  const getItem = (item) => {
    //Function for click on an item
    setSnackVisible(!snackVisible);
  };

  const ListItem = ({ item, index }) => {

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
                        {item.sold} {language === "EN" ? EN.sold : AR.sold} {item.max}
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
                      <View style={{ ...styles.image3 }}>
                        <View style={styles.out1}>
                          <Text style={styles.out1_text}>
                            {language === "EN" ? EN.buy : AR.buy}
                          </Text>
                        </View>
                        <FastImage
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
                        <FastImage
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
                    <View style={{...styles.counter, display: item.deal_products.length > 1 ? "none" : "flex" }}>
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
                          setmute(true)
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
                        <Text style={{ ...styles.button_text, fontSize: 10, textAlign:"left" }}>
                          {parseInt(item.deal_products[0]?.product?.unit_price)} {item.deal_products[0]?.product?.currency_code}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", display: item.deal_products.length > 1 ? "none" : "flex" }}>
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
                                          count: item.deal_products[0].product.count + 1,
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
                                    // alert("add false")
                                  }
                                 await AsyncStorage.setItem(
                                    "@Cart",
                                    JSON.stringify(rd)
                                  );
                                  setCart(rd);
                                  
                                } else {
                                  arr[index1] = { ...arr[index1] };
                                }
                              });
                              setpersons(arr);
                             // alert(arr[index].deal_products[0].product.count)
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
                              if(loading == false){
                              let arr = [...persons];
                              setLoading(true);
                              
                              arr.map(async (item1, index1) => {
                                if (index == index1) {
                                  // alert(item1.deal_products[0].product.count)
                                 
                                  //  const myArray =  await AsyncStorage.getItem('@Cart')
                                  //   if (myArray !== null) {
                                  //     // We have data!!
                                  //     console.log(JSON.parse(myArray)[0].categoryName);
                                  //   }
                                  var ddd = cart;
                                  var rd = [];
                                  var add = false;
                                  console.log([cart[0].count])
                                  ddd &&
                                    ddd.map((element, index) => {
                                      if (element.id === item.deal_products[0].product.id) {
                                        // alert(element.count+"element count")
                                        var aa = {
                                          ...element,
                                          count: item.deal_products[0].product.count + 1,
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
                                  arr[index] = {
                                    ...arr[index],
                                    ...arr[index].deal_products[0].product.count = item1.deal_products[0].product.count + 1,
                                  };
                                } else {
                                  arr[index1] = { ...arr[index1] };
                                }
                              });
                            
                              setpersons(arr);
                              getItem(item);
                              navigation.navigate("TabView", { screen: "Home" })

                              setLoading(false);
                            }
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* <Text style={styles.headertxt}>
            winner<Text style={{ color: "gold", fontSize: 30 }}>X</Text>
          </Text> */}
          <Image
            source={require("./../../assets/logo_winnerx.png")}
            style={{ ...styles.headertxt }}
          />
          <Text
            style={styles.headertxt1}
            // onPress={() => navigation.navigate("Payment")}
            onPress={() => navigation.navigate("Search")}

          >
            <EvilIcons name="search" size={24} color="gold" />
          </Text>
        </View>
      </View>
      <ScrollView ref={ref} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={{}}>
          <View
            style={{
              justifyContent: "center",
              height: height * 0.5,
              width: width,
              backgroundColor: "white",
            }}
          >
            {/* <ImageSlider
                          loopBothSides
                          // autoPlayWithInterval={3000}
                          images={Onboard}
                          customSlide={({ index, item, style, width }) => (
                            // It's important to put style here because it's got offset inside
                            <View
                              key={index}
                              style={[style,]}
                            >
                              {item.is_image== "true" ?
                              <Image
                                source={{ uri: item.link }}
                                style={{ height: "100%", width: "100%",resizeMode:"stretch" }}
                              ></Image>
                             
                                : */}
            {/* <View  style={{ height: "100%", width: "100%",}}> */}
            <Video
              ref={(ref) => (videoPlayer.current = ref)}
              style={styles.video}
              // source={{ uri: Onboard[0].link }}
              source={require("../../assets/video.mp4")}
              // source={{uri:"https://firebasestorage.googleapis.com/v0/b/winnerx-f9ad1.appspot.com/o/Laila%20xWinner_10_Cut.mp4?alt=media&token=a446e058-bb13-44e5-91a6-eaaa47d4afee"}}
              // source={{uri:"https://firebasestorage.googleapis.com/v0/b/winnerx-f9ad1.appspot.com/o/Laila%20xWinner_10_Cut.mp4?alt=media&token=a446e058-bb13-44e5-91a6-eaaa47d4afee"}}
              // useNativeControls={false}
              resizeMode={"stretch"}
              // isLooping={false}
              // shouldPlay = {true}
              repeat={true}
              muted={mute}
              
            ></Video>
        
            <View style={{ flexDirection: "row", alignSelf: "flex-end" ,}}>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: height * 0.4,
                }}
              >
                <TouchableOpacity onPress={() => setmute(!mute)}>
                  {mute ? (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        backgroundColor: "grey",
                        alignItems: "center",
                        borderRadius: 40,
                      }}
                    >
                      <View style={{ marginTop: 6 }}>
                        <Ionicons
                          name="volume-mute-sharp"
                          size={20}
                          color="white"
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        backgroundColor: "grey",
                        alignItems: "center",
                        borderRadius: 40,
                      }}
                    >
                      <View style={{ marginTop: 6 }}>
                        <Ionicons
                          name="volume-medium-sharp"
                          size={20}
                          color="white"
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: height * 0.4,
                  marginEnd: 20,
                }}
              >
                <TouchableOpacity
                  // onPress={() => (navigation.navigate("dev"), setmute(true))}
                  onPress={() => goFullScreen()}
                >
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      backgroundColor: "grey",
                      alignItems: "center",
                      borderRadius: 40,
                    }}
                  >
                    <View style={{ marginTop: 6 }}>
                      <Entypo
                        name="resize-full-screen"
                        size={20}
                        color="white"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>


            {/* <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: height * 0.4,
                }}
              >
                <TouchableOpacity onPress={() => setmute(!mute)}>
                  {mute ? (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        backgroundColor: "grey",
                        alignItems: "center",
                        borderRadius: 40,
                      }}
                    >
                      <View style={{ marginTop: 6 }}>
                        <Ionicons
                          name="volume-mute-sharp"
                          size={20}
                          color="white"
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        backgroundColor: "grey",
                        alignItems: "center",
                        borderRadius: 40,
                      }}
                    >
                      <View style={{ marginTop: 6 }}>
                        <Ionicons
                          name="volume-medium-sharp"
                          size={20}
                          color="white"
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: height * 0.4,
                  marginEnd: 20,
                }}
              >
                <TouchableOpacity
                  // onPress={() => (navigation.navigate("dev"), setmute(true))}
                  onPress={() => goFullScreen()}
                >
                  <View
                    style={{
                      height: 35,
                      width: 35,
                      backgroundColor: "grey",
                      alignItems: "center",
                      borderRadius: 40,
                    }}
                  >
                    <View style={{ marginTop: 6 }}>
                      <Entypo
                        name="resize-full-screen"
                        size={20}
                        color="white"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
          <View style={{ marginStart: 20 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "800",
                color: "#666666",
                marginTop: 60,
                textAlign: "left",
              }}
            >
              {language === "EN" ? EN.hot_deals : AR.hot_deals}
            </Text>
          </View>

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
          <View>
            <Banner
              Data={friendly}
              navigation={navigation}
              language={language}
            />
          </View>
          {/* </Pressable> */}
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
              Item added to wishlist
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         setModalVisible(!modalVisible);
        }}>
        <Video
              ref={(ref) => (videoPlayer.current = ref)}
              style={styles.video}
              // source={{ uri: Onboard[0].link }}
              source={require("../../assets/video.mp4")}
              // source={{uri:"https://firebasestorage.googleapis.com/v0/b/winnerx-f9ad1.appspot.com/o/Laila%20xWinner_10_Cut.mp4?alt=media&token=a446e058-bb13-44e5-91a6-eaaa47d4afee"}}
              // source={{uri:"https://firebasestorage.googleapis.com/v0/b/winnerx-f9ad1.appspot.com/o/Laila%20xWinner_10_Cut.mp4?alt=media&token=a446e058-bb13-44e5-91a6-eaaa47d4afee"}}
              // useNativeControls={false}
              resizeMode={"stretch"}
              
              // isLooping={false}
              // shouldPlay = {true}
              repeat={true}
              muted={false}
              fullscreen={true}
              
            ></Video>
<TouchableOpacity onPress={()=>setModalVisible(false)} style={{position:'absolute', top:10,
        left:10, backgroundColor:"black", height:35, width:40, borderRadius:5, alignItems:"center", justifyContent:"center"}}>
         <Ionicons name="ios-arrow-back" size={24} color="gold" />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    height: 65,
    backgroundColor: "#262626",

    justifyContent: "center",
    marginTop: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    flex: 0.4,
    // marginTop: 15,
    // backgroundColor:'red',
    height: '100%',
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15
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
    // alignItems: "stretch",
    bottom: 0,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    right: 0,
    height: "100%",
    width: "100%"
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
    width: width * 0.22,
    marginBottom: 0,
    justifyContent:'center'
  },
  price: {
    // height: height * 0.05,
    width: width * 0.15,
    // borderRadius: 0,
    // backgroundColor: "red",

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
    // lineHeight: 40,
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
