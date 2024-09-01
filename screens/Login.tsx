import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { showMessage } from "react-native-flash-message";
import { LoginData } from '../abstraction/authentication';
import queryString from "query-string";

interface LOGIN_FUNC {
  (email: string, password: string) : Promise<void>
}

const Login = ({navigation}) => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const loginBtnHandler: LOGIN_FUNC = async (email: string, password: string) : Promise<void> => {

    const apiUrl: string = "https://news-app-660u.onrender.com/api/users/login";

    // Create form data
    const data: LoginData = {
      email: email,
      password: password
    };

    // Serialize data to x-www-form-urlencoded format
    const formDataString = queryString.stringify(data);

    console.log(formDataString);

    // Making a POST request to login to an existing account
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Add any additional headers if needed
      },
      body: formDataString,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // setLoginPressable(true);
        return response.json();
      })
      .then((data) => {
        console.log("POST request successful:", data.msg == "Login successful");
        if (data.msg == "Login successful") {
          showMessage({
            message: "Logined successfully!",
            type: "success",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "success",
          });
          // storeAuthToken("User_token", data.token);
          // navigation.replace("Route");
        } else {
          showMessage({
            message: "Invalid credentials",
            type: "danger",
            duration: 1500,
            floating: true, // This allows the message to be displayed even if the user scrolls
            icon: "danger",
          });
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
        showMessage({
          message: "Invalid credentials",
          type: "danger",
          duration: 1500,
          floating: true, // This allows the message to be displayed even if the user scrolls
          icon: "danger",
        });
      });
  } 

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
            paddingLeft: 15
          }}
          onChangeText={(email: string) => setEmail(email)}
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
            paddingLeft: 15
          }}
          secureTextEntry={true}
          onChangeText={(password: string) => setPassword(password)}
          />
        </View>

       <TouchableOpacity style={styles.loginBtn} onPress={() => loginBtnHandler(email, password)}>
        <Text style={styles.text}>Login</Text>
       </TouchableOpacity>

      <TouchableOpacity style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "10%",
        position: "absolute",
        bottom: 35
      }}
      onPress={() => navigation.navigate("Register")}
      >
        <Text style={{
          textAlign: "center",
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
    height: Dimensions.get("window").height * 0.55,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  Email: {
    width: 250,
    height: 37,
    backgroundColor: "#EEEEEE",
    top: -25,
    alignSelf: "center",
    borderRadius: 20
  },
  Password: {
    width: 250,
    height: 37,
    backgroundColor: "#EEEEEE",
    top: 4,
    alignSelf: "center",
    borderRadius: 20
  },
  Icon: {
    width: 180,
    height: 130,
    alignSelf: "center",
    position: "absolute",
    top: 0
  },
  loginBtn: {
    width: 120,
    height: 40,
    backgroundColor: "#7695FF",
    alignSelf: "center",
    top: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});