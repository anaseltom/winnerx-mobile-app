import { StyleSheet } from "react-native";
// import { scaleHeight, scaleWidth } from "../../utils";

// const scaleHeight = 400
// const scaleWidth:


const style = StyleSheet.create({
  mainContatiner: {
   
    backgroundColor: "red",
  },
  slideLayout: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
  },
  iconStyle: {
    alignSelf: "center",
    marginTop:37,
  },
  topIconImg: {
    width: 205,
    height: 54,
  },

  paginationContainer: {
    alignItems: "center",
    backgroundColor: "red",
    flexDirection: "row",
    height: 20,
    justifyContent: "center",
    width: "100%",
  },
  dot: {
    borderRadius: 50,
    height: 6,
    marginHorizontal: 6,
    width: 6,
  },
  textContent: {
    justifyContent: "center",
    marginTop:70,
    borderWidth: 0.8,
    borderBottomWidth: 0,
    borderColor: "red",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 10,
  },
  // OLD
  imageStyle: {
    width: 300,
    height: 250,
    alignSelf: "center",
  },
  titleTextStyle: {
    color: "#2B6CB0",
    fontSize: 24,
    textAlign: "center",
  },
  contentStyle: {
    color: "#2C3A4B",
    fontSize: 15,
    padding: 8,
    textAlign: "center",
  },
  skipBtn: {
    backgroundColor: "red",
    width: 100,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 38,
  },
  skipBtnLabel: {
    fontSize: 18,
    
  },
  nextBtn: {
    backgroundColor: "red",
    width: 380,
    alignSelf: "center",
    height: 55,
    // paddingVertical: scaleHeight(14),
    marginBottom: 20,
    marginTop: 26,
  },
  nextBtnLabel: {
    fontSize: 18,
    color: "red",
  },
  opacityZero: {
    opacity: 0,
  },
});

export default style;
