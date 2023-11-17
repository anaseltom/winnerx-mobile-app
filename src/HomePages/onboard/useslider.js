// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   FlatList,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// // import { RouteNames } from "../../navigation";

// const sliderData=[{
//     id:0,title:"aman",text:"jai ho",image:"https://o.remove.bg/downloads/47116ca4-937a-4061-8434-7eb1a21ef8a6/download__4_-removebg-preview.png"
// },{
//     id:1,title:"ayush",text:"jai ho",image:"https://o.remove.bg/downloads/47116ca4-937a-4061-8434-7eb1a21ef8a6/download__4_-removebg-preview.png"
// },{
//     id:2,title:"atul",text:"jai ho",image:"https://o.remove.bg/downloads/47116ca4-937a-4061-8434-7eb1a21ef8a6/download__4_-removebg-preview.png"
// },]

// export const useSlider = () => {
//   const navigation = useNavigation();
//   const [currentIndex, updateCurrentIndex] = useState(0);
//   const [isLastPage, updateLastPageFlag] = useState(false);
//   let flatListRef = useRef();
//   const indexRef = useRef(currentIndex);
//   indexRef.current = currentIndex;

//   useEffect(() => {
//     updateLastPageFlag(sliderData.length - 1 <= currentIndex);
//   }, [currentIndex]);

//   const nextPage = () => {
//     if (!isLastPage) {
//       flatListRef?.current?.scrollToIndex({
//         index: currentIndex + 1,
//         animated: true,
//       });
//       setTimeout(() => {
//         updateCurrentIndex(currentIndex + 1);
//       }, 500);
//     }
//   };

//   const attachOnScrollListener = useCallback(
//     (event) => {
//       const slideSize = event.nativeEvent.layoutMeasurement.width;
//       const index = event.nativeEvent.contentOffset.x / slideSize;
//       const roundIndex = Math.round(index);
//       const distance = Math.abs(roundIndex - index);
//       const isNoMansLand = distance > 0.4;
//       if (roundIndex !== indexRef.current && !isNoMansLand) {
//         updateCurrentIndex(roundIndex);
//       }
//     },
//     []
//   );

//   const attachFlatListRef = (ref) => {
//     flatListRef.current = ref;
//   };

//   const onPressSkipBtn = () => {
//     navigation.navigate(RouteNames.LoginScreen);
//   };

//   return {
//     flatListRef,
//     nextPage,
//     attachFlatListRef,
//     isLastPage,
//     currentIndex,
//     attachOnScrollListener,
//     onPressSkipBtn,
//   };
// };

import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#ccc', '#000', '#ccc'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
              // idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#000',
  },
});