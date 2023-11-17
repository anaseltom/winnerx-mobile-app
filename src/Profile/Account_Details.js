import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { update_Customer } from "../API";

import { EN } from "../../language/en";
import { AR } from "../../language/ar";

export default function Account_Details({ route }) {
  const [com, setcom] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const navigation = useNavigation();
  var [email, setEmail] = useState(route.params?.email);
  var phone = route.params?.mobile;
  var id = route.params?.id;
  var [name, setName] = useState(route.params?.name);

  const [newName, setNewName] = useState("");
  const [newLName, setNewLName] = useState("");

  const [newEmail, setnewEmail] = useState("");

  const [language, setLanguage] = useState("EN");
  useEffect(() => {
    (async () => {
      const lang = await AsyncStorage.getItem("@Language");
      setLanguage(lang);
      // setLanguage("EN")
    })();
  }, []);

  const onButtonPress = () => {
if(newName === "" && newLName === ""){
alert("Please Enter First name and LastName")
}else{
    setModalVisible(false);
    update_Customer(id, newName, newLName, email, false)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setName(newName + " " + newLName);
      })
      .catch((error) => console.log("error", error));
  };
  }
  const onButtonPress1 = () => {
    setModalVisible1(false);
if(newEmail === ""){
alert("Please Enter Email")
}else{
    update_Customer(id, newName, newLName, newEmail, true)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setEmail(newEmail);
        // setName(newName + " " + newLName)
      })
      .catch((error) => console.log("error", error));
  };
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex:0.5}}>
            <View>
              <Image
                style={styles.back}
                source={{
                  uri:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAXVBMVEX///8/Pz8zMzOpqak7Ozvq6upvb29zc3M4ODglJSXw8PB+fn40NDQtLS38/Pz19fXW1tZKSkpCQkJmZmazs7OIiIigoKDe3t7Ly8sqKiqQkJCXl5dgYGB4eHhSUlK7V+JlAAAB7ElEQVR4nO3dgU7CMBjEcQpVijAQQXGAvP9jGmNMhGEkY0vXu//vBfgutLeNkG40AgAAAAAAAAAAAAAAAAAAAAAAg7dcrXKP0Kvn+Tq9bLa5x+jP6yzFEGK1fsg9SU+mVfgW01PuWXrxOA4/0ib3MH34FTCE2S73ON07CxjGb7nn6dz0LGBI89wDde0ioF7Cy4Byq/TxMqBa0zQDpmnumTrVDBiD1BW/sQdDjFJ3bVcCBgKWRH6JXisZApZEPqBjycgHpEWLQsDSye9BxxYlYFHkS0Y+IC1aOseAWktUvmQIWDr5PejYogQsinzJyAekRUvnGFBricqXTDNgWEv9y+JKwLTfTobifXlvwOYe/Io4HowqTHoIOCz1xz0B99X/n5BdtW8fcFfnnv4mdft/CB4WuYe/yeLQOuEx5h7+JvHYOuGpkIQnvsM/6e9D/S7Vvx4a3NMM/760vve+1ODZwuD50OAZ3+B3GoPf2lwjqi1Ug7oxiOi5F4lYHBpVAREVGOxFz0Y1iKi2UA3qxiCi514kYnFoVAVEVGCwFz0bVS2iwV4kogIaVYFnRLWFKn9uosHZlwbnlxqcQWtwjrDBWdAG53kbnMlucK6+wbsRDN5vYfCOkpH+e2YAAAAAAAAAAAAAAAAAAAAAALD2CRNCIQY8zsQcAAAAAElFTkSuQmCC",
                }}
              />
            </View>
          </TouchableOpacity>
          <View>
            <Text style={{...styles.add_text,marginLeft:-10}}>
              {language === "EN" ? EN.account_setting : AR.account_setting}
            </Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.top1}>
            <Text style={styles.add_text1}>
              {language === "EN" ? EN.name : AR.name}
            </Text>
            <View>
              <Text style={styles.add_text2}>{name}</Text>
              <Text
                style={styles.edittxt}
                onPress={() => setModalVisible(!modalVisible)}
              >
                {language === "EN" ? EN.tedit : AR.tedit}
              </Text>
            </View>
          </View>
          <View style={styles.top1}>
            <Text style={styles.add_text1}>
              {language === "EN" ? EN.phone_number : AR.phone_number}
            </Text>

            <View>
              <Text style={styles.add_text2}>{phone}</Text>
            </View>
          </View>
          <View style={styles.top1}>
            <View>
              <Text style={styles.add_text1}>
                {language === "EN" ? EN.email : AR.email}
              </Text>
            </View>
            <View>
              <Text style={styles.add_text2}>{email}</Text>
              <Text
                style={styles.edittxt}
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                {language === "EN" ? EN.tedit : AR.tedit}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter First Name</Text>
            <TextInput
              style={{
                width: 200,
                height: 35,
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 20,
                paddingHorizontal: 4,
              }}
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />

            <Text style={styles.modalText}>Enter Last Name</Text>
            <TextInput
              style={{
                width: 200,
                height: 35,
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 20,
                paddingHorizontal: 4,
              }}
              value={newLName}
              onChangeText={(text) => setNewLName(text)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => onButtonPress()}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter New Email</Text>
            <TextInput
              style={{
                width: 200,
                height: 35,
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 20,
                paddingHorizontal: 4,
              }}
              value={newEmail}
              onChangeText={(text) => setnewEmail(text)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible1(!modalVisible1)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => onButtonPress1()}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", height: "100%" },
  text1: { marginTop: 30, marginStart: 20 },
  text1_style: { fontSize: 15 },
  input: { marginStart: 20, marginTop: 16, fontSize: 17 },

  top: { flexDirection: "row", height: 60, alignItems: "center" },
  top1: {
    flexDirection: "row",
    height: 65,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },

  back: { height: 30, width: 30, marginStart: 15 },
  back2: { height: 15, width: 15, marginTop: 25 },
  box: { flexDirection: "row" },
  add_text: { fontSize: 20, fontWeight: "600", marginStart: 70 },
  add_text1: {
    fontSize: 18,
    fontWeight: "800",
    marginStart: 15,
    textAlign: "left",
  },
  edittxt: {
    fontSize: 12,
    fontWeight: "100",
    color: "gray",
    marginStart: 15,
    textAlign: "right",
  },
  add_text2: { fontSize: 18, fontWeight: "600", textAlign: "left" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#00000080",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "35%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
