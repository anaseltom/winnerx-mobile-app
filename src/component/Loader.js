import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

export default Loader = (props) => {
    return (
        props.loading
            ?
            <View style={styles.loader1}>
                <ActivityIndicator size="large" color='grey' style={{height:100, width:100,borderRadius:10, backgroundColor:"#fff", alignSelf:"center"}} />
            </View>
            :
            null
    )
}

const styles = StyleSheet.create({
    loader1: {
        // rgb(54,122,223)' />
        // backgroundColor: 'rgba(245,245,245, 0.7)',
        height: Dimensions.get('window').height,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        // height:100,
        // width:100,
        // backgroundColor:"gray"
    }
});