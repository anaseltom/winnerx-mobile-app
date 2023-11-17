
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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Dev({navigation}) {
    const video = React.useRef(null);
    const [mute, setmute] = useState(false);
  return (
    <View>
         <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            >
          <View style={styles.headertxt}>
          <Ionicons name="ios-arrow-back" size={24} color="white" />
          </View>
          </TouchableOpacity>
          
        </View>
      </View>
      <ScrollView   
      >
        <View>
        <View
            style={{
              justifyContent: "center",
              height: height,
              width: width,
              backgroundColor: "white",
            }}
          >
            <Video
              ref={video}
              style={styles.video}
              source={require("../../assets/LailaxWinner_10_Cut.mp4")}
              // useNativeControls={true}
              resizeMode={"stretch"}
              isLooping={true}
              shouldPlay
              isMuted={mute}
            ></Video>
             <View style={{flexDirection:"row",alignSelf:"flex-end"}}>
           
            <View
              style={{
                
                marginTop: height * 0.85,
               marginEnd:20
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
           </View>
           
          </View>
      </View>
      </ScrollView>
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
        right: 0,flex:1
      },
});
