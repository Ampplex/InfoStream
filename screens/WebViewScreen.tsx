import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WebViewScreen = ({navigation, route}) => {
    const {url} = route.params;
  return (
    <View style={styles.container}>
      <Text 
      selectable={true}
      style={{
        color: "#000",
        fontSize: 17
      }}>{url}</Text>
    </View>
  )
}

export default WebViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})