import { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from '../context'
import useOutsideClick from "./OutsideClick";
import axios from "axios";
import { GrAdd } from 'react-icons/gr';

const Search = () => {
    const { darkMode, addTicker } = useGlobalContext()
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [quote, setQuote] = useState([]);
    const [quoteChange, setQuoteChange] = useState([]);
    const [quotePercentChange, setQuotePercentChange] = useState([]);
    const [quoteName, setQuoteName] = useState([])

    const ref = useRef();
    useOutsideClick(ref, () => {
        //alert('You clicked outside')
        setIsOpen(!isOpen);
    });

    const [ticker, setTicker] = useState("");

    const handleChange = (e) => {
        //if user is typing in the search box we show the option to add the equity if its a valid search
        setTicker(e.target.value);
        setIsOpen(false);
        setSearchText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addTicker(ticker, quoteName, quote, quoteChange, quotePercentChange);
        setTicker("");
    };

    const handleKeyDown = e => {
        console.log('User pressed: ', e.key);
        // console.log(message);
        if (e.key === 'Enter') {
            setTicker(e.target.value)
            setSearchText(e.target.value);
            getQuote()
            // console.log(searchText)

        }
    }

    const getQuote = () => {
        const options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: `${searchText}`, region: 'US' },
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /*   console.log(response.data.price.regularMarketChange);   console.log(response.data.price.regularMarketChangePercent);
         console.log(response.data.price.regularMarketOpen);
         console.log(response.data.price.regularMarketPrice);
         console.log(response.data.price.shortName);  */
            /*      setQuote( response.data.price.shortName, response.data.price.regularMarketPrice.raw )  */

            setQuote(response.data.price.regularMarketPrice.raw)
            setQuoteName(response.data.price.shortName)
            setQuoteChange(response.data.price.regularMarketChange.fmt)
            setQuotePercentChange(response.data.price.regularMarketChangePercent.raw.toFixed(2))
        }).catch(function (error) {
            console.error(error);
        });
    }

    /*   useEffect(() => {
        setSearchText('msft')
         getQuote()
      }, [])
      useEffect(() => {
       
         addTicker(ticker, quoteName, quote, quoteChange, quotePercentChange);
      }, []) */

    return (
        <div ref={ref}>
            <div className="form"  >
                <div
                    className={darkMode ? "search-container-dark" : "search-container-light"}
                >
                    <button className="submit-search-btn" type="submit" onClick={() => getQuote()}>
                        <span className="search-icon" aria-hidden="true">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                focusable="false"
                                className=" NMm5M"
                            >
                                <path d="M20.49 19l-5.73-5.73C15.53 12.2 16 10.91 16 9.5A6.5 6.5 0 1 0 9.5 16c1.41 0 2.7-.47 3.77-1.24L19 20.49 20.49 19zM5 9.5C5 7.01 7.01 5 9.5 5S14 7.01 14 9.5 11.99 14 9.5 14 5 11.99 5 9.5z"></path>
                            </svg>
                        </span>
                    </button>
                    <div
                        className={darkMode ? "input-container-dark" : "input-container-light"}
                    >
                        <input
                            className={darkMode ? "search-dark" : "search-light"}
                            type="text"
                            placeholder="Search for stocks"
                            value={ticker}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        ></input>
                    </div>

                </div>
            </div>
            {searchText.length > 5 &&
                <div className='search-warning'>
                    <h4>You can only search for equities by their symbol (ticker)!</h4>
                    <a href='https://en.wikipedia.org/wiki/Ticker_symbol?adlt=strict'>What's an investment symbol/ticker?</a>
                </div>
            }
            {searchText !== '' && searchText.length <= 5 && isOpen == false &&
                <form onSubmit={handleSubmit}>
                    <div className={darkMode ? 'search-result-container-dark' : 'search-result-container-light'}>

                        <div className={darkMode ? 'quote-dark' : 'quote-light'}>
                            <p className='quote-item'>${searchText}</p>
                            <p></p>
                            <p className='quote-item'>{quoteName}</p>
                            <p className='quote-item'>{quote}</p>
                            <p className={quotePercentChange == 0 ? 'quote-item-gray' : quotePercentChange > 0 ? 'quote-item-green' : 'quote-item-red'}>{quotePercentChange}%</p>
                            <p className={quotePercentChange == 0 ? 'quote-item-gray' : quotePercentChange > 0 ? 'quote-item-green' : 'quote-item-red'}>{quoteChange}</p>
                        </div>
                        <button className="search-add-btn" type="submit" ><GrAdd /></button>
                    </div>
                </form>
            }
        </div>
    );
};

export default Search

