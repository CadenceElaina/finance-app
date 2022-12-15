import React, { useState, useContext, useEffect } from 'react'
import Watchlist from './components/Watchlist'
//import DATA from './list'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  let searchText = 'msft'
  let count = 0
  //const [ticker, setTicker] = useState('')
  const [quote, setQuote] = useState([]);
  const [quoteChange, setQuoteChange] = useState([]);
  const [quotePercentChange, setQuotePercentChange] = useState([]);
  const [quoteName, setQuoteName] = useState([])

  const [darkMode, setDarkMode] = useState(true)

  /* const getQuote = () => {
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
      params: { symbol: `${searchText}`, region: 'US' },
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };
 
    axios.request(options).then(function(response) {
      //setTicker(searchText)
      setQuote(response.data.price.regularMarketPrice.raw)
      setQuoteName(response.data.price.shortName)
      setQuoteChange(response.data.price.regularMarketChange.fmt)
      setQuotePercentChange(response.data.price.regularMarketChangePercent.raw.toFixed(2))
    }).catch(function(error) {
      console.error(error);
    });
  } */
  /*   if(count = 0){
      getQuote()
      count++
    } */
  const [list, setList] = useState([]);
  const changeMode = () => {
    setDarkMode(!darkMode);
    // console.log(darkMode);
    //console.log(searchText);
  };
  const removeTicker = (id) => {
    const remainingQuotes = list.filter((quote) => id !== quote.ticker);
    setList(remainingQuotes);
  };

  const addTicker = (ticker, quoteName, quote, quoteChange, quotePercentChange) => {
    const newWatchlistQuote = {
      id: ticker,
      ticker: ticker,
      name: quoteName,
      price: quote,
      change: quoteChange,
      percentChange: quotePercentChange
    };
    setList([...list, newWatchlistQuote]);
  };
  /* let ticker = 'msft'
  addTicker(ticker, quoteName, quote, quoteChange, quotePercentChange); -*/

  const watchList = list.map((quote) => (
    <Watchlist
      id={quote.ticker}
      key={quote.ticker}
      removeTicker={removeTicker}
      ticker={quote.ticker}
      name={quote.name}
      price={quote.price}
      change={quote.change}
      percentChange={quote.percentChange}
    />
  ));


  //custom hook
  return <AppContext.Provider value={{ darkMode, changeMode, removeTicker, watchList, addTicker }}>
    {children}
  </AppContext.Provider>

}
export const useGlobalContext = () => {
  return useContext(AppContext)
}



export { AppContext, AppProvider }