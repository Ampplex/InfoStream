import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.Card}>
        
        <View style={styles.Icon}>
          <Image source={require('../assets/icon/icon.png')} style={{
            position: "absolute",
            width: "100%",
            height: "100%"
          }} />
        </View>
    
        <View style={styles.Email}>
          <TextInput
          placeholder='Email'
          style={{
            alignSelf: "center",
            width: 250,
            height: 37,
            borderRadius: 20,
            paddingLeft: 10
          }}
          />
        </View>
        <View style={styles.Password}>
          <TextInput
          placeholder='Password'
          style={{
            alignSelf: "center",
            width: 250,
            height: 37,
            borderRadius: 20,
            paddingLeft: 10
          }}
          secureTextEntry={true}
          />
        </View>

       <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.text}>Login</Text>
       </TouchableOpacity>

      <TouchableOpacity style={{
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text style={{
          textAlign: "center",
          position: "absolute",
          bottom: -100,
          color: "#7695FF",
          fontFamily: 'sans-serif-medium'
        }}>Don't have an account? Register</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: "center",
    color: '#fff'
  },
  Card: {
    backgroundColor: "#fafafa",
    width: Dimensions.get("screen").width * 0.85,
    height: Dimensions.get("screen").height * 0.5,
    borderRadius: 20,
  },
  Email: {
    width: 250,
    height: 37,
    backgroundColor: "#EEEEEE",
    top: -10,
    alignSelf: "center",
    borderRadius: 20
  },
  Password: {
    width: 250,
    height: 37,
    backgroundColor: "#EEEEEE",
    top: 10,
    alignSelf: "center",
    borderRadius: 20
  },
  Icon: {
    width: 180,
    height: 130,
    alignSelf: "center"
  },
  loginBtn: {
    width: 120,
    height: 40,
    backgroundColor: "#7695FF",
    alignSelf: "center",
    top: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});