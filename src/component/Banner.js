import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { EN } from '../../language/en';
import { AR } from '../../language/ar';

export default function Banner({ Data, navigation, language }) {


  return (
    <View>
      <ImageBackground
        source={require("./../../assets/banner.jpg")}
        style={styles.banner}
      >
        <Text style={{ color: "gold", fontSize: 16, marginLeft: 10 , marginTop:10, textAlign:"left"}}>
          
         {language === "EN"?EN.eco:AR.eco}

        </Text>
        <Text style={{ color: "lightgray", marginLeft: 10, marginBottom: 15, textAlign:"left" }}>
         {language === "EN"?EN.products:AR.products}
        </Text>
        <FlatList 
          horizontal
          data={Data}
          extraData={Data}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
<View>
            <TouchableOpacity onPress={() =>
                            navigation.navigate("details", { item: item })
                          } style={styles.container}>
              <View>
                <Text
                  style={{
                    marginStart: 0,
                    fontSize: 12,
                    marginVertical: 5,
                    color: "white",
                  }}
                >
                    {item.deal_products && item.deal_products[0] && item.deal_products[0].quantity_sold}
                        {language === "EN" ? EN.sold : AR.sold}{" "}
                        {item.deal_products && item.deal_products[0] && item.deal_products[0].quantity_max}
                        {/* {item.unitsInStock} sold out of {item.units_in_stock} */}
                    
                  {/* {item.unitsInStock} {language === "EN"? EN.sold:AR.sold} {item.units_in_stock} */}
                </Text>
                <View
                  style={{
                    height: 4,
                    width: 100,
                    backgroundColor: "#737373",
                    borderRadius: 40,
                  }}
                >
                  {item.deal_products.length>0?
                  <View
                    style={{
                      height: 4,
                      width: item.deal_products[0].quantity_sold * 100/item.deal_products[0].quantity_max,
                      backgroundColor: "white",
                      borderRadius: 40,
                    }}
                  ></View>:null}
                </View>
              </View>
              <Image source={{ uri: item.image_url_main }} style={styles.img} />
              <Text style={{ textAlign: "center", color: "white" }}>
                {language === "EN"?item.product_name:item.product_name_ar}
              </Text>
            </TouchableOpacity>

</View>
          )}
        />


      </ImageBackground>
<View>
<Image resizeMode='stretch' source={require("./../../assets/1.png")} style={{...styles.container, height:250, width:"95%", marginVertical:15, alignSelf:"center"}}/>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    // height: "100%",
    width: "100%",
    marginTop: 15,
  },
  container: {
    height: 200,
    width: 150,
    marginHorizontal: 5,
    backgroundColor: "rgba(256, 256, 256, 0.4)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    // opacity: 0.7,
    paddingVertical: 10,
marginBottom:10,
  },
  img: {
    height: 100,
    width: 100,
  },
});
