// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   ScrollView,SafeAreaView
// } from "react-native";
// import {
//     Entypo,
//     Feather,
//     AntDesign,
//     SimpleLineIcons,
//     Ionicons,
//     FontAwesome,
//     FontAwesome5,
//   } from "@expo/vector-icons";


// const height = Dimensions.get("window").height;
// const width = Dimensions.get("window").width;
// const persons = [
//     {
//         id: "1",
//         icon1: "https://img.icons8.com/ios/512/home-page.png",
//         icon2:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZmcvFdruLqhwTifiillNI0vJ-hYtvJZ1qGpdhYDaTbVBGd_ipb6qalSxmPgup2B0_C8&usqp=CAU",
//         text1: "HOME",
//         text2: "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
//         text3: "EDIT ADDRESSES",title:"DEFAULT ADDRESS"
//       },
//   {
//     id: "2",title:"SAVED ADDRESS",
//     icon1: "https://img.icons8.com/ios/512/home-page.png",
//     icon2:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZmcvFdruLqhwTifiillNI0vJ-hYtvJZ1qGpdhYDaTbVBGd_ipb6qalSxmPgup2B0_C8&usqp=CAU",
//     text1: "HOME",
//     text2: "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
//     text3: "EDIT ADDRESSES",
//   },
//   {
//     id: "3",
   
//     icon1: "https://img.icons8.com/material-outlined/512/monitor.png",
//     text2: "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
//     text3: "EDIT ADDRESSES",
//     text1: "WORK",
//     icon2:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZmcvFdruLqhwTifiillNI0vJ-hYtvJZ1qGpdhYDaTbVBGd_ipb6qalSxmPgup2B0_C8&usqp=CAU",
    
//   },
//   {
//     id: "4",
   
//     icon1: "https://img.icons8.com/ios/512/marker-o.png",
//     text2: "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
//     text3: "EDIT ADDRESSES",
//     text1: "OTHER",
//     icon2:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZmcvFdruLqhwTifiillNI0vJ-hYtvJZ1qGpdhYDaTbVBGd_ipb6qalSxmPgup2B0_C8&usqp=CAU",
    
//   },
 
// ];

// export default function delivery() {
//   const navigation = useNavigation()
 
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.headertxt1}
//          onPress={() => navigation.goBack()} 
//         ><Ionicons name="ios-arrow-back" size={24} color="black" /></TouchableOpacity>
//         <Text style={styles.headertxt2}>Select Address for delivery</Text>
//       </View>
//     <ScrollView style={{}}>
//       <View style={{ backgroundColor: "white",  }}>
//         <View style={styles.container}>
         
//           <FlatList
//             data={persons}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View>
//                 <View styles={{}}>
//                     <Text style={styles.title}>{item.title}</Text>
//                   </View>
//                 <View style={{ flexDirection: "row" }}>
//                   <View styles={{}}>
//                     <Image
//                       style={styles.img1}
//                       source={{
//                         uri: item.icon1,
//                       }}
//                     />
//                   </View>
//                   <View styles={{}}>
//                     <Text style={styles.home}>{item.text1}</Text>
//                   </View>
//                   <View styles={styles.img2_v}>
//                     <View
//                       style={styles.img2}
                      
//                     ><AntDesign name="checkcircle" size={24} color="black" /></View>
//                   </View>
//                 </View>
//                 <View style={styles.edit}>
//                   <Text style={styles.adress}>{item.text2}</Text>
//                 </View>
//                 <View style={styles.edit}>
//                   <Text style={styles.edit_text}>{item.text3}</Text>
//                 </View>
//               </View>
//             )}
//           />

//           <View style={styles.line}></View>
//         </View>
//       </View>
//     </ScrollView>
//     <View style={{ ...styles.bottomLastView }}>
//         <View style={{ flex: 0.5 }}>
//           <Text style={{ ...styles.textleft, fontSize: 12 }}>Grand Total (Incl all taxes)</Text>
//           <Text style={styles.bottontxt}>840 AED</Text>
//         </View>
//         <View style={{ flex: 0.5 }}>
//           <TouchableOpacity onPress={() => navigation.navigate("OrderSummary")}
//             style={styles.button1}>
//             <Text style={styles.bottontxt1}>Checkout Now</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//     bottomLastView: {
//         backgroundColor: "white",
//         padding: 20,
//         marginTop: 15,
//         flexDirection: "row",
//         alignItems: "center",
//         elevation: 10
    
//       },
//     header: {
//         height: 55,
//         backgroundColor: "white",
//         alignItems: "center"
//        ,marginBottom:2,marginTop:25,flexDirection:"row"
//       },
//       headertxt1: {
//         color: "black",
//         fontWeight: "bold",
//         fontSize: 16,marginStart:30
//       },

//       headertxt2: {
//         color: "black",
//         fontWeight: "bold",
//         fontSize: 14,marginStart:"15%"
//       },
//   container: {
//     flex: 1,
//     height: "100%",
//   },
//   edit_text: { fontSize: 15, color: "#8c8c8c" },
//   img2_v: {
//     fontSize: 19,
//     marginTop: 30,
//     fontWeight: "500",
//     marginLeft: 5,
//   },
//   line: {
//     backgroundColor: "#cccccc",
//     height: 1,
//     width: width * 0.96,
//     marginTop: 30,
//   },
//   edit: { marginLeft: "18%" },
//   adress: { fontSize: 15, color: "black", width: "70%", marginBottom: 10 },
//   img2: {  marginTop: 30, marginLeft: "70%" },
//   img1: { height: 22, width: 22, margin: 20, marginTop: 30 },
//   img1_v: { height: 15, width: 15 },
//   text1: { fontSize: 20, margin: 25 },
//   home: {
//     fontSize: 19,
//     marginTop: 30,
//     fontWeight: "500",
//     marginLeft: 5,
//   },
//   title: {
//     fontSize: 15,
//     marginTop: 30,
//     fontWeight: "500",
//     marginLeft: 15,color: "#8c8c8c"
//   },
//   button: {
//     height: 40,
//     width: 100,
//     backgroundColor: "#e6e6e6",
//     borderRadius: 10,
//     marginTop: 20,
//     marginLeft: 20,
//   },
//   button_text: {
//     fontSize: 14,
//     color: "black",
//     textAlign: "center",
//     fontWeight: "500",
//     marginTop: 10,
//   },
//   plus:{fontSize:25,marginStart:12,marginEnd:5}
// });
import React from "react";
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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const persons = [
  {
    id: "1",
    name: "Emporio Armani Watch Silver | WIN Apple Mac-Book Pro ",
    price: "250 AED",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "2",
    name: "Win An Iphone 11 Pro Black | free With Emporio Armani Watch",
    price: "FREE",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "3",
    name: "Win An Iphone 11 Pro Black | free With Emporio Armani Watch",
    price: "FREE",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "4",
    name: "Win An Iphone 11 Pro Black | free With Emporio Armani Watch",
    price: "FREE",
    image:
      "data:image/jpeg;base64,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",
  },
];

export default function dev() {
  return (
    <View>
      <ScrollView   
      >
        <View>
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
        
          item.price === "FREE" ?   (
            
            <View style={styles.container}>
              <View style={styles.box2}>
                <View style={styles.row}>
                  <View style={styles.image2}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image2style}
                    />
                  </View>
                  <View style={styles.cont2}>
                    <View>
                      <Text style={styles.text7}>{item.name} </Text>
                    </View>
                    <View style={styles.line3}></View>
                    <View style={styles.free}>
                      <Text style={styles.freestyle}>{item.price}</Text>
                    </View>
                    <View style={styles.button2}>
                      <TouchableOpacity>
                        <Text style={styles.button2_text}>
                          View Winner Page
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ):(
            <View style={styles.container}>
              <View style={styles.box}>
                <View style={styles.row}>
                  <View style={styles.image1}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image1style}
                    />
                  </View>
                  <View style={styles.cont1}>
                    <View>
                      <Text style={styles.text7}>{item.name} </Text>
                    </View>
                    <View style={styles.line1}></View>
                    <View style={styles.text5}>
                      <Text style={styles.text5style}>{item.price}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.line2}></View>
                <View style={styles.row}>
                  
                    <View style={styles.text6}>
                      <Text style={styles.text6style}>View Orders Details</Text>
                      <View style={styles.view_detailes_line}></View>
                    </View>
                 
                  <View style={styles.button1}>
                    <TouchableOpacity>
                      <Text style={styles.button_text}>View Winner Page</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )
        }
      />
      </View>
      </ScrollView>
    </View>
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
    borderRadius: 10,  backgroundColor: "white",
    
    flexDirection: "row",
    
  },

  column: { flexDirection: "column" },
  row: { flexDirection: "row" },
  container: { backgroundColor: "white",  },

  image1: { margin: 10, marginTop: 30, marginLeft: 20 },

  image1style: { width: 140, height: 100, resizeMode: "cover" },
  cont1: { flexDirection: "column", marginTop: 10 },
  
  
  
  line1: {
    backgroundColor: "#cccccc",
    height: 1,
    width: width * 0.36,
    marginTop: 20,
    marginLeft: 25,
  },
  text5: { marginLeft: 20, marginTop: 10 },
  text5style: { fontSize: 20, fontWeight: "500",width:width*0.45 },
  line2: {
    backgroundColor: "#cccccc",
    height: 1,
    width: width * 0.82,
    marginTop: 15,
    marginLeft: 15,
  },
  text6: { marginStart: 25, marginTop: 30 ,flex:0.94},
  text6style: { fontSize: 15, color: "#737373" },
  view_detailes_line: {
    backgroundColor: "black",
    height: 1,
    width: width * 0.35,
    marginTop: 0,
    marginLeft: 0,
  },
  button1: {
    height: height*0.064,
    width: width*0.4,
    borderRadius: 10,
    backgroundColor: "black",
    margin: 0,
    marginTop: 20,marginBottom:20
  },
  button_text: {
    color: "yellow",
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
    fontWeight: "800",
  },
  image2: { margin: 10, marginTop: 30, marginLeft: 30 },
  image2style: { width: 120, height: 160 ,resizeMode:"cover"},
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
  button2: {
    height: height*0.064,
    width: width*0.4,
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
