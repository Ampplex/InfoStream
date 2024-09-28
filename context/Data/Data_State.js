import React, { useState, useEffect } from 'react'
import Data_Context from './Data_Context';

const Data_State = (props) => {

      const [articles, setArticles] = useState([]);

      const fetchArticles = async () => {

      const date = new Date();

      const url = `https://newsapi.org/v2/everything?q=$"India"&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=publishedAt&apiKey=8085d07357a04107bdd64cc252e49090`;
        console.log(url);
        try {

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }
          const data = await response.json();
          setArticles(data.articles);

        } catch (error) {
          // If the API call fails, call the API with a different API key
          const url = `https://newsapi.org/v2/everything?q=$"India"&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=publishedAt&apiKey=49490b8a2fed496ebfc5a63a7ca3a96f`;

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            setArticles(data.articles);
            console.log('Second API call successful');

          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }

          console.error('There has been a problem with your fetch operation:', error);
        }
    };
    
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <>
            <Data_Context.Provider value={{articles, setArticles}}>
                {props.children}
            </Data_Context.Provider>
        </>
    )

}

export default Data_State;

