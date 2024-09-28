import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import Data_Context from "../context/Data/Data_Context";
import FastImage from "react-native-fast-image";

// Define the interface for the article data
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
      source: {
        id: "the-times-of-india",
        name: "The Times of India",
      },
      author: "ET Online",
      title:
        "Coldplay India tour tickets go on sale. Check prices, dates, availability",
      description:
        "Coldplay will perform in Mumbai on January 18 and 19, 2025, as part of their Music Of The Spheres World Tour. Tickets go on sale on September 22, 2024, with prices ranging from Rs 2,500 to Rs 35,000.",
      url: "https://economictimes.indiatimes.com/magazines/panache/coldplay-india-tour-tickets-go-on-sale-today-check-prices-dates-availability/articleshow/113547731.cms",
      urlToImage:
        "https://img.etimg.com/thumb/msid-113548869,width-1200,height-630,imgsize-1655274,overlay-etpanache/photo.jpg",
      publishedAt: "2024-09-21T10:09:04Z",
      content: "Office Productivity...",
    },
    {
      source: {
        id: null,
        name: "newsBTC",
      },
      author: "Keshav Verma",
      title:
        "Bitcoin Hype Remains Low Even After $63,000 Surge: Green Sign For Rally?",
      description:
        "Data shows the social media users have yet to show excessive hype around the latest Bitcoin rally, a sign that could be positive for its sustainability.",
      url: "http://www.newsbtc.com/bitcoin-news/bitcoin-hype-remains-low-63000-surge-green-rally/",
      urlToImage:
        "https://www.newsbtc.com/wp-content/uploads/2024/09/btc_d2ecbe.png?fit=1792%2C1024",
      publishedAt: "2024-09-21T10:00:45Z",
      content: "Keshav is currently a senior writer at NewsBTC...",
    },
    {
      source: {
        id: null,
        name: "ETF Daily News",
      },
      author: "MarketBeat News",
      title:
        "Dimensional Fund Advisors LP Sells 107,781 Shares of Peabody Energy Co. (NYSE:BTU)",
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

const WebViewScreen = ({route}) => {
  const [articles, setArticles] = useState([]);
  const {category} = route.params;

  const fetchArticles = async () => {
    const date = new Date();

    const url = `https://newsapi.org/v2/everything?q=${category}&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=publishedAt&apiKey=8085d07357a04107bdd64cc252e49090`;
  
    try {

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      setArticles(data.articles);
      
    } catch (error) {
      // If the API call fails, call the API with a different API key
      const url = `https://newsapi.org/v2/everything?q=${category}&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=publishedAt&apiKey=49490b8a2fed496ebfc5a63a7ca3a96f`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        const data = await response.json();
        setArticles(data.articles);
        console.log("Second API call successful");
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }

      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
    <View style={styles.container}>
      <FlatList
        data={articles}
        // data={newsData.articles}
        renderItem={renderArticle}
        keyExtractor={(item: Article) => item.url}
        contentContainerStyle={styles.articleList}
        initialNumToRender={4}
      />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  articleList: {
    paddingBottom: 16,
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 2,
  },
  articleImage: {
    width: "100%",
    height: 150,
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
});
