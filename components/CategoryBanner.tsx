import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";

// Import images statically
const technologyImage = require("../assets/icon/technology.jpg");
const healthImage = require("../assets/icon/health.jpg");
const business = require("../assets/icon/business.jpeg");
const science = require("../assets/icon/science.jpg");
const sports = require("../assets/icon/sports.jpeg");
const entertainment = require("../assets/icon/entertainment.jpg");
const world = require("../assets/icon/world.jpg");

const images = [
  {
    uri: technologyImage,
    name: "Technology",
  },
  {
    uri: business,
    name: "Business",
  },
  {
    uri: healthImage,
    name: "Health",
  },
  {
    uri: science,
    name: "Science",
  },
  {
    uri: sports,
    name: "Sports",
  },
  {
    uri: entertainment,
    name: "Entertainment",
  },
  {
    uri: world,
    name: "World",
  },
];

const CategoryBanner = ({ navigation }) => {
  const handlePress = (index) => {
    console.log("Pressed slide with index:", index);
    // Navigating to the respective screen for the selected category

    switch (index) {
      case 0:
        navigation.navigate("WebViewScreen", { category: "Technology" });
        break;
      case 1:
        navigation.navigate("WebViewScreen", { category: "Business" });
        break;
      case 2:
        navigation.navigate("WebViewScreen", { category: "Health" });
        break;
      case 3:
        navigation.navigate("WebViewScreen", { category: "Science" });
        break;
      case 4:
        navigation.navigate("WebViewScreen", { category: "Sports" });
        break;
      case 5:
        navigation.navigate("WebViewScreen", { category: "Entertainment" });
        break;
      case 6:
        navigation.navigate("WebViewScreen", { category: "World" });
        break;
      default:
        console.log("Default case reached");
        break;
    }
  };

  return (
    <Swiper
      showsButtons={false}
      autoplay
      loop
      bounces={true}
      showsPagination={false}
    >
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={styles.slide}
          onPress={() => handlePress(index)}
        >
          <View style={styles.imageContainer}>
            <Image source={image.uri} style={styles.image} />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(0.7, 0.7, 0.7, 0.7)",
                "rgba(0.97, 0.97, 0.97, 0.97)",
              ]}
              style={styles.gradient}
            />
          </View>

          {/* Category Name */}
          <View style={styles.nameOverlay}>
            <Text style={styles.nameOverlayText}>{image.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.87; // Adjust as needed
const imageHeight = height * 0.27; // Adjust as needed

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: imageWidth,
    height: imageHeight,
  },
  image: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nameOverlay: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameOverlayText: {
    color: "#fff",
    fontSize: 19,
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
    textAlign: "center",
    bottom: 20,
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 65,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default CategoryBanner;
