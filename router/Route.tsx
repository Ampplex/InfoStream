import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from '../screens/Home';

const Route = ({ navigation }: any) => {

  const activeTabIndicator1 = useRef(new Animated.Value(0)).current;
  const activeTabIndicator2 = useRef(new Animated.Value(0)).current;
  const activeTabIndicator3 = useRef(new Animated.Value(0)).current;

  const [activeTab, setActiveTab] = useState<string>('Home');  // Default to "Home"

  const PlayIndicatorAnimator = (indicator: Animated.Value): void => {
    // Reset all indicators first
    Animated.timing(activeTabIndicator1, {
      toValue: indicator === activeTabIndicator1 ? 50 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(activeTabIndicator2, {
      toValue: indicator === activeTabIndicator2 ? 50 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(activeTabIndicator3, {
      toValue: indicator === activeTabIndicator3 ? 50 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    // Run the default animation for "Home" on load
    PlayIndicatorAnimator(activeTabIndicator1);
    // fetchArticles()
  }, []);

  return (
    <View style={styles.container}>
      {activeTab == 'Home' ?
      <Home navigation={navigation} />
      : <View/>}
      <View style={styles.TabNavigator}>
        <TouchableOpacity onPress={() => {
          if (activeTab !== "Home") {
            setActiveTab("Home");
            PlayIndicatorAnimator(activeTabIndicator1);
          }
        }} style={styles.tabButton}>
          <Animated.View style={[styles.tabIndicator, { width: activeTabIndicator1 }]} />
          <AntDesign name="home" size={28} color="#604CC3" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          if (activeTab !== "Search") {
            setActiveTab("Search");
            PlayIndicatorAnimator(activeTabIndicator2);
          }
        }} style={styles.tabButton}>
          <Animated.View style={[styles.tabIndicator, { width: activeTabIndicator2 }]} />
          <AntDesign name="search1" size={28} color="#604CC3" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          if (activeTab !== "Profile") {
            setActiveTab("Profile");
            PlayIndicatorAnimator(activeTabIndicator3);
          }
        }} style={styles.tabButton}>
          <Animated.View style={[styles.tabIndicator, { width: activeTabIndicator3 }]} />
          <Ionicons name="person-outline" size={29} color="#604CC3" />
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Route;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  TabNavigator: {
    backgroundColor: "#fafafa",
    position: "absolute",
    bottom: 10,
    width: "85%",
    height: 60,
    borderRadius: 20,
    elevation: 12,
    shadowColor: "#3FA2F6",  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 1
  },
  tabButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    position: "relative",
    marginLeft: 15,
    marginRight: 15
  },
  tabIndicator: {
    backgroundColor: "#604CC3",
    height: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "absolute",
    top: -10,
  }
});