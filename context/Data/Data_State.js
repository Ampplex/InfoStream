import React, { useState } from 'react'
import Data_Context from './Data_Context';

const Data_State = (props) => {

    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        const url = `https://newsapi.org/v2/everything?q=India&from=2024-08-22&sortBy=publishedAt&apiKey=49490b8a2fed496ebfc5a63a7ca3a96f`;
    
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }
          const data = await response.json();
          setArticles(data.articles);
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
    };
    
    fetchArticles();

    return (
        <>
            <Data_Context.Provider value={{articles, setArticles}}>
                {props.children}
            </Data_Context.Provider>
        </>
    )

}

export default Data_State;

