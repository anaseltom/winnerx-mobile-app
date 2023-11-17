// import React from "react";
// import {
//   FlatList,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Image,
//   View,Text
// } from "react-native";
// // import { AppText } from "../../../components";
// // import { SliderDataType } from "../../../constants";
// import style from "./style";

// // interface IntroSliderScreenViewProps {
// //   sliderData: Array<SliderDataType>;
// //   onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
// //   currentIndex: number;
// //   setFlatListRef: (ref: FlatList<SliderDataType> | null) => void;
// // }

// const IntroSliderScreenView = (props) => {
//   const { sliderData, setFlatListRef, onScroll } = props;

//   const renderItem = ({ item }) => {
//     return (
//       <View style={style.slideLayout} key={item.id}>
//         <Image
//           style={style.imageStyle}
//           resizeMode="cover"
//           source={{uri:item.image}}
//         />
//         <View style={style.textContent}>
//           <Text>{item.title}</Text>
//           {/* <AppText style={styles.titleTextStyle}>{item.title}</AppText> */}
//           {/* <AppText style={styles.contentStyle}>{item.text}</AppText> */}
//         </View>
//       </View>
//     );
//   };
//   return (
//     <FlatList
//       ref={(ref) => {
//         setFlatListRef(ref);
//       }}
//       data={sliderData}
//       horizontal
//       pagingEnabled
//       showsHorizontalScrollIndicator={false}
//       bounces={false}
//       renderItem={renderItem}
//       extraData={sliderData}
//       onScroll={onScroll}
//       initialNumToRender={sliderData ? sliderData.length : 0}
//     />
//   );
// };

// export default React.memo(IntroSliderScreenView);

import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item,index }) => {
  const translateYImage = new Animated.Value(40);
  const navigation = useNavigation()

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <ImageBackground
        // source={{ uri: item.img }}
        source={ item.img }
        resizeMode="stretch"
        style={[styles.image]}
      >
        <View style={styles.modalView2}>
          <View style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
          <View style={{height:13,borderRadius:30,width:13,marginStart:"40%",backgroundColor: item.id=="1"?"black":"#bfbfbf"}}></View>
          <View style={{height:13,borderRadius:30,width:13,marginStart:"5%",backgroundColor: item.id=="2"?"black":"#bfbfbf"}}></View>
          <View style={{height:13,borderRadius:30,width:13,marginStart:"5%",backgroundColor: item.id=="3"?"black":"#bfbfbf"}}></View>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.save}
            onPress={() => (navigation.navigate("vid"))}
            >
            {/* <View > */}
              <Text style={styles.save_text}>{item.price}</Text>
            {/* </View> */}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  save_text: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    color: "gold",
  },
  save: {
    height: height * 0.08,
    width: width * 0.85,
    backgroundColor: "black",
    borderRadius: 10,
    alignSelf: "center",
    // marginTop: 20,
position:'relative',
bottom:0
  },
  modalView2: {
    height: "40%",
    width: "95%",
    marginBottom: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    alignSelf: "center",
    borderTopRightRadius: 10,
    // marginTop: "120%",
position:'absolute',
bottom:0,
    elevation: 5,
  },
  container: {
    width,
    height,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 0.4,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 12,
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: "grey",
    width: "68%",
    textAlign: "center",
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
