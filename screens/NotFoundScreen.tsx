import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NotFoundScreen = () => {
    return (
        <View>
            <Text style={styles.text}>not found</Text>
        </View>
    )
}

export default NotFoundScreen

const styles = StyleSheet.create({
    text:{
        color:'white',
        textAlign:'center'
    }
})
