import React, { useState } from "react";
import {
  Entypo,
  Feather,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
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
import { Video, AVPlaybackStatus } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Video2({ navigation }) {
  const video = React.useRef(null);
  const [mute, setmute] = useState(false);
  // let first_time = true;
  const value ="1"

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("isFirst", "1")
navigation.navigate("Login")
setmute(true)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      {/* <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headertxt}>
              <Ionicons name="ios-arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View> */}
     
        <View>
          <View
            style={{
              justifyContent: "center",
              height: height*1.1,
              width: width,
              backgroundColor: "white",
            }}
          >
            <Video
              ref={video}
              style={styles.video}
              source={require("../../../assets/LailaxWinner_10_Cut.mp4")}
              // source={require("../../../assets/sc.mp4")}
              // source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}} 
              useNativeControls={false}
              resizeMode={"stretch"}
              isLooping={false}
              shouldPlay
              isMuted={mute}
            ></Video>
            <View
              style={{
                alignSelf: "flex-end",

                marginEnd: 20,
              }}
            >
                <TouchableOpacity
                 onPress={() => saveData()}
                 style={{
                  height: 35,
                  width: 140,
                  backgroundColor: "white",
                  alignItems: "center",
                  borderRadius: 40,
                  flexDirection:'row',
                  justifyContent:"space-evenly"
                }}
                >
              
                   <Text
                      style={{ fontSize: 13, fontWeight: "600" }}
                    >
                      Skip intro
                    </Text>
                  <View
                    style={{
                      alignSelf: "center",
                      marginStart: 5,
                    }}
                  >
                    <Ionicons name="arrow-forward" size={22} color="black" />
                  </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: height * 1,
                marginEnd: 20,
                alignSelf: "flex-end",
              }}
            >
              {/* <TouchableOpacity onPress={() => setmute(!mute)}>
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
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 65,
    backgroundColor: "black",

    justifyContent: "center",
    marginTop: 0,
  },
  headertxt: {
    marginStart: 15,
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
    flex: 1,
  },
});
