import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { showMessage } from "react-native-flash-message";
import { RegisterData } from '../abstraction/authentication';
import queryString from "query-string";

interface REGISTER_FUNC {
    (username: string, email: string, password: string): Promise<void>
}

const Register = ({ navigation }) => {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirm_password, setConfirmPassword] = useState<string>("")

    const registerBtnHandler: REGISTER_FUNC = async (username: string, email: string, password: string): Promise<void> => {

        const apiUrl: string = "https://news-app-660u.onrender.com/api/users/";

        // Create form data
        const data: RegisterData = {
            name: username,
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
                if (data.msg == "User created successfully") {
                    showMessage({
                        message: "User created successfully",
                        type: "success",
                        duration: 1500,
                        floating: true, // This allows the message to be displayed even if the user scrolls
                        icon: "success",
                    });
                    // storeAuthToken("User_token", data.token);
                    // navigation.replace("Route");
                } else {
                    showMessage({
                        message: data.msg,
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
                    message: "Some error occured",
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

                <View style={styles.Username}>
                    <TextInput
                        placeholder='Username'
                        style={{
                            alignSelf: "center",
                            width: 250,
                            height: 37,
                            borderRadius: 20,
                            paddingLeft: 15
                        }}
                        onChangeText={(username: string) => setUsername(username)}
                    />
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
                        onChangeText={(password: string) => setPassword(email)}
                    />
                </View>

                <View style={styles.ConfirmPassword}>
                    <TextInput
                        placeholder='Confirm password'
                        style={{
                            alignSelf: "center",
                            width: 250,
                            height: 37,
                            borderRadius: 20,
                            paddingLeft: 15
                        }}
                        secureTextEntry={true}
                        onChangeText={(password: string) => setPassword(email)}
                    />
                </View>

                <TouchableOpacity style={styles.registerBtn} onPress={() => registerBtnHandler(username, email, password)}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "10%",
                    position: "absolute",
                    bottom: 35
                }}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "#7695FF",
                        fontFamily: 'sans-serif-medium'
                    }}>Already have an account? Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default Register;

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
        height: Dimensions.get("screen").height * 0.7,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    Username: {
        width: 250,
        height: 37,
        backgroundColor: "#EEEEEE",
        position: "absolute",
        top: 140,
        alignSelf: "center",
        borderRadius: 20
    },
    Email: {
        width: 250,
        height: 37,
        backgroundColor: "#EEEEEE",
        alignSelf: "center",
        borderRadius: 20,
        position: "absolute",
        top: 200
    },
    Password: {
        width: 250,
        height: 37,
        backgroundColor: "#EEEEEE",
        alignSelf: "center",
        borderRadius: 20,
        position: "absolute",
        top: 260 
    },
    ConfirmPassword: {
        width: 250,
        height: 37,
        backgroundColor: "#EEEEEE",
        alignSelf: "center",
        borderRadius: 20,
        position: "absolute",
        top: 320 
    },
    Icon: {
        width: 180,
        height: 130,
        alignSelf: "center",
        position: "absolute",
        top: 0
    },
    registerBtn: {
        width: 120,
        height: 40,
        backgroundColor: "#7695FF",
        alignSelf: "center",
        bottom: -135,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
});