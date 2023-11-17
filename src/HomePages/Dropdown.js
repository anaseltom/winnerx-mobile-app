import React, { FC, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, View, FlatList, Image } from 'react-native';
// import { Icon } from 'react-native-elements';


const Dropdown= ({ label, data, onSelect, select, setCount, count, language }) => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
 
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };
  
  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };
  const [selected, setSelected] = useState(undefined);
  const onItemPress = (item, index)=> {
    setCount(index)
    setSelected(item);
    onSelect(item, index);
    setVisible(false);
  };
  
  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={{...styles.item,backgroundColor:count==index?"gold":"white" }} onPress={() => onItemPress(item, index)}>
      <Text style={{paddingLeft:10, textAlign:"left"}}>{item.product.parent_name? language == "EN"? item.product.parent_name:item.product.parent_name_ar: language =="EN"?item.product.product_name:item.product.product_name_ar}</Text>
     </TouchableOpacity>
  );
  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, {top:dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
    ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
  {(selected && selected.label) || label}
</Text>
<Image source={require("./../../assets/sort-down.png")} style={{height:15, width:15}}/>
   
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#efefef',
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    alignSelf:"center",
    borderRadius:5,
borderWidth:1,
borderColor:"gold",
justifyContent:"flex-end"
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
  },
  dropdown: {
    // position: 'absolute',
    backgroundColor: '#fff',
    width: '90%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5, position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderWidth:1,
    borderColor:"lightgray",
    alignSelf:"center",
    paddingVertical:5,
    borderRadius:3
  },
  item: {
    width:"100%",
  marginHorizontal: 10,
  paddingVertical: 10,
  // backgroundColor:"yellow",
  alignSelf:"center",
},
});

export default Dropdown;