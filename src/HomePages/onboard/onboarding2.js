import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';

import SlideItem from './IntroSliderScreenView';
import Pagination from './useslider';
import { SafeAreaView } from 'react-native-safe-area-context';

const Slides= [
  {
    id: 1,
    img:require("../../../assets/On1.png"),
    title: 'shop from our products',
    description: 'with each products purchsed you are awarded a special coupon to a prize draw',
    price: 'Start shopping',
  },
  {
    id: 2,
    img:require("../../../assets/On2.png"),
    title: 'Get complimentary coupons',
    description: 'Select from our worldwide range from our products,from clothing to stationary',
    price: 'Start shopping',
  },
  {
    id: 3,
    img:require("../../../assets/on3.png"),
    title: 'win luxary prizes',
    description: 'once all products within campaign are sold, the lucky draw winner will be announced',
    price: 'Start shopping',
  },
  
];

const Onboarding2 = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView>
      <Pagination data={Slides} scrollX={scrollX} index={index} />
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {/* <Pagination data={Slides} scrollX={scrollX} index={index} /> */}
    </SafeAreaView>
  );
};

export default Onboarding2;

const styles = StyleSheet.create({});