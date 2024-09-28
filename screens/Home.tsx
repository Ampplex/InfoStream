import React, { useContext, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking
} from "react-native";
import Data_Context from "../context/Data/Data_Context";
import AntDesign from "@expo/vector-icons/AntDesign";
import CategoryBanner from "../components/CategoryBanner"; // Assuming CategoryBanner is a memoized component

interface Article {
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}

const newsData = {
  status: "ok",
  totalResults: 4131,
  articles: [
    {
      source: { id: "the-times-of-india", name: "The Times of India" },
      author: "ET Online",
      title: "Coldplay India tour tickets go on sale. Check prices, dates, availability",
      description:
        "Coldplay will perform in Mumbai on January 18 and 19, 2025, as part of their Music Of The Spheres World Tour. Tickets go on sale on September 22, 2024, with prices ranging from Rs 2,500 to Rs 35,000.",
      url: "https://economictimes.indiatimes.com/magazines/panache/coldplay-india-tour-tickets-go-on-sale-today-check-prices-dates-availability/articleshow/113547731.cms",
      urlToImage:
        "https://img.etimg.com/thumb/msid-113548869,width-1200,height-630,imgsize-1655274,overlay-etpanache/photo.jpg",
      publishedAt: "2024-09-21T10:09:04Z",
      content: "Office Productivity...",
    },
    {
      source: { id: null, name: "newsBTC" },
      author: "Keshav Verma",
      title: "Bitcoin Hype Remains Low Even After $63,000 Surge: Green Sign For Rally?",
      description:
        "Data shows the social media users have yet to show excessive hype around the latest Bitcoin rally, a sign that could be positive for its sustainability.",
      url: "http://www.newsbtc.com/bitcoin-news/bitcoin-hype-remains-low-63000-surge-green-rally/",
      urlToImage:
        "https://www.newsbtc.com/wp-content/uploads/2024/09/btc_d2ecbe.png?fit=1792%2C1024",
      publishedAt: "2024-09-21T10:00:45Z",
      content: "Keshav is currently a senior writer at NewsBTC...",
    },
    {
      source: { id: null, name: "ETF Daily News" },
      author: "MarketBeat News",
      title: "Dimensional Fund Advisors LP Sells 107,781 Shares of Peabody Energy Co. (NYSE:BTU)",
      description:
        "Dimensional Fund Advisors LP decreased its position in Peabody Energy Co. (NYSE:BTU) by 1.5% in the second quarter, according to its most recent 13F filing.",
      url: "https://www.etfdailynews.com/2024/09/21/dimensional-fund-advisors-lp-sells-107781-shares-of-peabody-energy-co-nysebtu/",
      urlToImage:
        "https://www.americanbankingnews.com/wp-content/timthumb/timthumb.php?src=https://www.marketbeat.com/logos/peabody-energy-co-logo-1200x675.png?v=20221117094441&w=240&h=240&zc=2",
      publishedAt: "2024-09-21T09:57:06Z",
      content: "Dimensional Fund Advisors LP decreased its position...",
    },
  ],
};

const Home = ({ navigation }: { navigation: any }) => {
  const data_context = useContext(Data_Context);
  
  console.log(data_context.articles);

  const renderArticle = ({ item }: { item: Article }) => (
    <View style={styles.articleContainer}>
      <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.greeting}>Hi, Ankesh!</Text>
      <Text style={styles.headline}>Explore today's news</Text>

      {/* Search bar */}
      <TouchableOpacity style={styles.search}>
        <AntDesign name="search1" size={24} color="grey" style={styles.searchIcon} />
        <Text style={styles.searchText}>Search...</Text>
      </TouchableOpacity>

      <Text style={styles.categoryTitle}>Category</Text>

      {/* Optimized CategoryBanner rendering */}
      <View style={styles.categoryContainer}>
        <CategoryBanner navigation={navigation} />
      </View>

      <Text style={styles.newsHeader}>Latest News</Text>

      {/* FlatList for news articles inside a fixed height container */}
      <View style={styles.flatListContainer}>
        <FlatList
          // data={data_context.articles}
          data={newsData.articles}
          renderItem={renderArticle}
          keyExtractor={(item, index) => index.toString()} // Ensure unique key extractor
          scrollEnabled={false} // Disable FlatList's scroll to allow ScrollView to handle scrolling
        />
      </View>
    </ScrollView>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width,
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    color: "#777d8f",
    fontSize: 18,
    marginLeft: 30,
    marginTop: "20%",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  headline: {
    fontFamily: "sans-serif-medium",
    color: "#313a66",
    fontSize: 25,
    marginLeft: 30,
    marginTop: 27,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  search: {
    backgroundColor: "#e9e9f0",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 27,
    marginLeft: 30,
    alignSelf: "flex-start",
  },
  searchIcon: {
    position: "absolute",
    right: 20,
  },
  searchText: {
    fontFamily: "sans-serif-medium",
    fontSize: 15,
    color: "grey",
    alignSelf: "flex-start",
    padding: 10,
    paddingLeft: 20,
    fontWeight: "600",
  },
  categoryTitle: {
    fontFamily: "sans-serif-medium",
    color: "#313a66",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 27,
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  newsHeader: {
    fontFamily: "sans-serif-medium",
    color: "#313a66",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 15,
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  flatListContainer: {
    width: "100%",
    marginLeft: 30,
    marginRight: 30,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 22,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  articleDescription: {
    fontSize: 14,
    color: "#666",
  },
  readMore: {
    color: "#007BFF",
    marginTop: 8,
  },
  categoryContainer: {
    width: "100%",
    height: 300,
    marginTop: -10,
  }
});