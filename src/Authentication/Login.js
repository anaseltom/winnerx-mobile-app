import React, { useEffect ,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
  Dimensions,Button
} from "react-native";
import jwt_decode from "jwt-decode";
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  webClientId: Platform.OS === 'ios' ? "941515184855-ag5hffe2d9jf1pnjm2osq7sh055lt129.apps.googleusercontent.com":
    "941515184855-ucgh9m7vdpmruu0hh9je57482m3thqt1.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true,
  iosClientId:
    "941515184855-ag5hffe2d9jf1pnjm2osq7sh055lt129.apps.googleusercontent.com",
  androidClientId:
    "941515184855-ucgh9m7vdpmruu0hh9je57482m3thqt1.apps.googleusercontent.com",
  scopes: ["profile", "email"],
});
import {
  LoginButton,
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from "react-native-fbsdk-next";
import Loader from "../component/Loader";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignupWithGoogle, SigninWithGoogle, SendOtpWithEmail } from "../API";
import { AR } from "../../language/ar";
import { EN } from "../../language/en";
import { LoginWithMobile, SendPhoneOtp } from "../API";


const Height = Dimensions.get('window').height
export default function Login({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState("+971");
  const [flag, setFlag] = React.useState("🇦🇪");
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState("EN");
  const [country, setcountry] = React.useState("United Arab Emirates");
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState();
  const [fname, setfname] = useState('');
  const [gname, setgname] = useState('');
  const [email, setemail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem("@Language").then((lang) => {
      setLanguage(lang);

      setLoading(false);
    });

    //   const checkAvailable = async () => {
    //   const isAvailable = await AppleAuthentication.isAvailableAsync();
    //   setAppleAuthAvailable(isAvailable);

    //   if (isAvailable) {
    //     const credentialJson = await AsyncStorage.getItem('users');
    //     setUserToken(JSON.parse(credentialJson));
    //   }
    // }
    // checkAvailable();

    
  }, []);

  useEffect(async() => {
  const savedUser = await AsyncStorage.getItem("appple-credentials2");
      const currentUser = JSON.parse(savedUser);
       
      console.log(currentUser)
      
    
  }, []);

  

  // console.log(countryCode);

  const SendOTP = () => {
    var mobile = countryCode + phone;
    console.log(mobile);
    if (phone.length > 0) {
      // LoginWithMobile(mobile)
      //   .then((response) => response.json())
      //   .then((result) => {
      //     if (result.status === 200) {
      //       // console.log(result)
      //       var data = {
      //         email: result.user.email,
      //         id: result.user.id,
      //       };
      //       console.log(data);
      //       AsyncStorage.setItem("user", JSON.stringify(data));
      //       AsyncStorage.setItem("loginType", "Phone").then(() => {
      //         // setLoading(false);
      //         // navigation.navigate("TabView");

      //         navigation.navigate("Success");
      //       });
      //     } else if (result.status === 404) {
            // console.log(result)
            SendPhoneOtp(mobile)
              .then((response) => response.json())
              .then((result) => {
                // console.log(result)
                navigation.navigate("otp", { mobile: mobile,country:country });
              })
              .catch((e) => console.log(e));
         
      
    } else {
      alert("Please Enter Mobile number");
    }
  };


  const fbsignin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(
        ["public_profile", "email"],
        "limited",
        "my_nonce"
      );
      console.log(result);

      if (Platform.OS === "ios") {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        console.log(result?.authenticationToken);
      } else {
        const result = await AccessToken.getCurrentAccessToken();
        console.log(result?.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Loader loading={loading} />;
  }

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      // this.setState({ userInfo });
      console.log(userInfo);
      console.log(userInfo.user);
      setLoading(true);
      SignupWithGoogle(userInfo.user)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg === "Email already exists!") {
            SigninWithGoogle(userInfo.user.email)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                if (
                  result.msg ===
                  "We sent you an email verification to your email, please read the instruction on how to verify your email."
                ) {
                  SendOtpWithEmail(userInfo.user.email)
                    .then((response) => response.json())
                    .then((result) => {
                      console.log(result);
                      alert(result.msg);
                      setLoading(false)
                      navigation.navigate("OtpWithEmail", {
                        email: userInfo.user.email,
                      });
                    });
                } else {
                  AsyncStorage.setItem("user", JSON.stringify(result));
                  AsyncStorage.setItem("loginType", "Google").then(() => {
                    setLoading(false);

                    // navigation.navigate("Success");
                    navigation.navigate("TabView");
                  });
                }
              })
              .catch((e) =>{
                setLoading(false)
                 alert(e)
              });
          } else {
            SendOtpWithEmail(userInfo.user.email)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                setLoading(false)
                navigation.navigate("OtpWithEmail", {
                  email: userInfo.user.email,
                });
              });
          }
        });
    } catch (error) {
      console.log("error==>"+error);
    }

    //   const currentUser = await GoogleSignin.getCurrentUser();
    // console.log(currentUser)
  };
  const logout = async () => {
    AsyncStorage.removeItem('appple-credentials1');
    setUserToken(undefined);
  };

  const signin_apple = async () => {
    try {
      // await GoogleSignin.hasPlayServices()
      // const userInfo = await GoogleSignin.signIn()
      const use = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
       
      });

       // console.log(use)
       const decoded = jwt_decode(use.identityToken)
       // console.log(decoded.email)

       const  user = {
        familyName:use.fullName.familyName,
        givenName:use.fullName.givenName,
         email:decoded.email,

      }

       console.log(user)

      setLoading(true);
      SignupWithGoogle(user)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.msg === "Email already exists!") {
            SigninWithGoogle(decoded.email)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                if (
                  result.msg ===
                  "We sent you an email verification to your email, please read the instruction on how to verify your email."
                ) {
                  SendOtpWithEmail(decoded.email)
                    .then((response) => response.json())
                    .then((result) => {
                      console.log(result);
                      alert(result.msg);
                      setLoading(false)
                      navigation.navigate("OtpWithEmail", {
                        email: decoded.email,
                      });
                    });
                } else {
                  AsyncStorage.setItem("user", JSON.stringify(result));
                  AsyncStorage.setItem("loginType", "Google").then(() => {
                    setLoading(false);

                    // navigation.navigate("Success");
                    navigation.navigate("TabView");
                  });
                }
              })
              .catch((e) =>{
                setLoading(false)
                 alert(e)
              });
          } else {
            AsyncStorage.setItem("user", JSON.stringify(result));
            navigation.navigate("TabView");

            // SendOtpWithEmail(decoded.email)
            //   .then((response) => response.json())
            //   .then((result) => {
            //     console.log(result);
            //     setLoading(false)
            //     navigation.navigate("OtpWithEmail", {
            //       email: decoded.email,
            //     });
            //   });
          }
        });


    } catch (error) {
      console.log("error==>"+error);
    }

    //   const currentUser = await GoogleSignin.getCurrentUser();
    // console.log(currentUser)
  };



  // const apple_login = async () => {
  //   try {
  //     const credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL
  //       ]
  //     });
  //     // console.log(credential);
  //     setUserToken(credential);
  //     AsyncStorage.setItem("users", JSON.stringify(credential));
  //     navigation.navigate("TabView")

  //     // SecureStore.setItemAsync('apple-credentials', JSON.stringify(credential));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // console.log(userToken)
  // <AppleAuthentication.AppleAuthenticationButton 
          //   buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          //   buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          //   cornerRadius={5}
          //   style={styles.button}
          //   onPress={signin_apple}
          // />
          

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* <View style={styles.header}>
          <Text style={styles.headertxt}>Profile</Text>
        </View> */}
        <View style={styles.container}>
          <Image source={require('./../../assets/x2.png')} style={{height:Height*0.4, width:"100%", alignSelf:"center", marginVertical:15, resizeMode:"contain"}}/>
          <View style={{...styles.topBox, display:"none"}}>
            <Text style={styles.offertxt}>
              OFFER VALID TILL 12 OCTOBER 12PM
            </Text>
            {/* <Text>{language==="EN"?EN.FAQ_1:AR.FAQ_1}</Text> */}
            <View style={styles.cirview}>
              <View style={styles.left}></View>
              <Text style={{ letterSpacing: 4, height: 15, flex: 1 }}>
                -------------------------------------------------------------------------------------------------
              </Text>
              <View style={styles.Right}></View>
            </View>
            <Text style={styles.boldtxt}>50% OFF</Text>
            <Text style={styles.boldtxt}>any purchase</Text>
            <Text style={styles.txt}>Valid for only new user</Text>
            <Text style={styles.txt}>
              for purchase made till 12 october{" "}
              <Text
                style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
              >
                know more
              </Text>
            </Text>

            <TouchableOpacity
              style={{
                ...styles.button1_s,
                backgroundColor: "white",
                height: 45,
              }}
              // onPress={()=>signin()}
            >
              <Text style={{ ...styles.button_text, color: "black" }}>
                Login to claim offer
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.logintxt}>{language ==="EN"?EN.login_or_register_with_your_phone:AR.login_or_register_with_your_phone}</Text>

          <CountryPicker
            show={show}
            initialState={""}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={(item) => {
              console.log(item);
              setCountryCode(item.dial_code);
              setShow(false);
              setFlag(item.flag);
             setcountry(item.name.en)
            }}
            style={{ flag: { height: 30, width: 30 } }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "88%",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                // flex:0.5
                width: "35%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ ...styles.textinp, width: "100%", lineHeight: 50 }}
              >{flag} {countryCode}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{ ...styles.textinp, width: "62%" }}
              placeholder={"xxxxx"}
              onChangeText={(text) => setPhone(text)}
              value={phone}
              keyboardType={"number-pad"}
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.button1_s} onPress={() => SendOTP()}>
            <Text style={styles.button_text}>{language ==="EN"?EN.login:AR.login}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orview}>
          <Text
            style={{
              letterSpacing: 0,
              color: "lightgray",
              flex: 1,
              height: 15,
            }}
          >
            ------------------------------------------------------------------
          </Text>
          <Text style={styles.or}>{language==="EN"?EN.or:AR.or}</Text>
          <Text
            style={{
              letterSpacing: 0,
              color: "lightgray",
              flex: 1,
              height: 15,
            }}
          >
            --------------------------------------------------
          </Text>
        </View>

        <View style={styles.socialview}>
          <View style={{ display: "none" }}>
            <Text style={styles.st}>@</Text>
            <Text>Email</Text>
          </View>
          <TouchableOpacity onPress={() => signin()}>
            <Image
              style={styles.socialimg}
              source={require("./../../assets/google.png")}
              resizeMode={"contain"}
            />
            <Text>{language==="EN"?EN.google:AR.google}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={() => fbsignin()}
          >
            <Image
              style={styles.socialimg}
              source={require("./../../assets/facebook.png")}
              resizeMode={"contain"}
            />
            <Text>{language==="EN"?EN.facebook:AR.facebook}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={signin_apple}
          >
            <Image
              style={styles.socialimg}
              source={require("./../../assets/Apple_logo.png")}
              resizeMode={"contain"}
            />
            <Text>{language==="EN"?EN.Apple:AR.Apple}</Text>
          </TouchableOpacity>
         
          
          
          
        </View>
      </ScrollView>
      <Loader loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    // marginTop:Height*0.40
  },
  button: {
    height: 30,
    borderRadius: 15,
    width: "50%",
    alignSelf: "center",
  },
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
  textinp: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    // marginHorizontal:20,
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
  },
  logintxt: {
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    marginVertical: 15,
  },
  topBox: {
    // height:200,
    backgroundColor: "gold",
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  offertxt: {
    textAlign: "center",
    fontWeight: "600",
    // marginTop:15
  },
  cirview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  left: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: -7,
  },
  Right: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: -7,
  },
  button1_s: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "black",
    // marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boldtxt: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  txt: {
    marginLeft: 10,
  },
  button_text: {
    color: "gold",
    fontSize: 16,
    fontWeight: "800",
  },
  socialview: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    alignSelf: "center",
    marginTop: 15,
  },
  socialimg: {
    height: 40,
    borderRadius: 15,
    width: 40,
    alignSelf: "center",
  },
  st: {
    fontSize: 30,
    textAlign: "center",
    height: 40,
    lineHeight: 40,
  },
  orview: {
    flexDirection: "row",
    marginTop: 15,
  },
});
