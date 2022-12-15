
import { useGlobalContext } from '../context'
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { GrAdd } from 'react-icons/gr';
import { useNavigate } from "react-router-dom"

const Footer = () => {
    const navigate = useNavigate()
    const { darkMode, addTicker } = useGlobalContext()
    /*     const [searchText, setSearchText] = useState('MSFT');
        const [temp, setTemp] = useState([]) */
    const [quote1, setQuote1] = useState([])
    const [quote2, setQuote2] = useState([])
    const [quote3, setQuote3] = useState([])
    const [quote4, setQuote4] = useState([])
    const [quote5, setQuote5] = useState([])
    const [quote6, setQuote6] = useState([])
    const handleStockSelect = (symbol) => {
        navigate(`overview/${symbol}`)
    }
    /* const quote1Ref = useRef('1')
      const quote2Ref = useRef('2')
      const quote3Ref = useRef('3')
      const quote4Ref = useRef('4')
      const quote5Ref = useRef('5')
      const quote6Ref = useRef('6') */



    /*   let count = 0 */
    /*  useEffect(() => {
       getCards()
     }, []) */
    // The below 6 calls to the same API is a violation of DRY. However, my smooth brain lacks the wrinkles at this time to solve this. I tried using a dynamic state of search text to make
    // successive calls using only one function. Setting the data to a temp state variable then in the useeffect setting the quote to the temp state then setting the temp back to an empty array
    // then calling the function again with a new search text for each quote, but no luck... 
    const getQuote1 = () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: 'aapl', region: 'US' },
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /* 	console.log(response.data); */
            let quote = [response.data.symbol, response.data.price.shortName, response.data.price.regularMarketPrice.raw, response.data.price.regularMarketChange.fmt, response.data.price.regularMarketChangePercent.raw.toFixed(2)]
            // console.log(quote)
            setQuote1([...quote])
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getQuote2 = () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: 'msft', region: 'US' },
            headers: {
                'X-RapidAPI-Key': '5e3e766307msh87df417b297885bp1f8517jsn2fc4320cebcb',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /* 	console.log(response.data); */
            let quote = [response.data.symbol, response.data.price.shortName, response.data.price.regularMarketPrice.raw, response.data.price.regularMarketChange.fmt, response.data.price.regularMarketChangePercent.raw.toFixed(2)]
            console.log(quote)
            setQuote2([...quote])
            //console.log(quote2[0][4])
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getQuote3 = () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: 'googl', region: 'US' },
            headers: {
                'X-RapidAPI-Key': '5e3e766307msh87df417b297885bp1f8517jsn2fc4320cebcb',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /* 	console.log(response.data); */
            let quote = [response.data.symbol, response.data.price.shortName, response.data.price.regularMarketPrice.raw, response.data.price.regularMarketChange.fmt, response.data.price.regularMarketChangePercent.raw.toFixed(2)]
            //console.log(quote)
            setQuote3([...quote])
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getQuote4 = () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: 'AMZN', region: 'US' },
            headers: {
                'X-RapidAPI-Key': '5e3e766307msh87df417b297885bp1f8517jsn2fc4320cebcb',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /* 	console.log(response.data); */
            let quote = [response.data.symbol, response.data.price.shortName, response.data.price.regularMarketPrice.raw, response.data.price.regularMarketChange.fmt, response.data.price.regularMarketChangePercent.raw.toFixed(2)]
            // console.log(quote)
            setQuote4([...quote])
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getQuote5 = () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: 'tsla', region: 'US' },
            headers: {
                'X-RapidAPI-Key': '5e3e766307msh87df417b297885bp1f8517jsn2fc4320cebcb',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /* 	console.log(response.data); */
            let quote = [response.data.symbol, response.data.price.shortName, response.data.price.regularMarketPrice.raw, response.data.price.regularMarketChange.fmt, response.data.price.regularMarketChangePercent.raw.toFixed(2)]
            //console.log(quote)
            setQuote5([...quote])
        }).catch(function (error) {
            console.error(error);
        });
    }
    const getQuote6 = () => {
        const options = {
            method: 'GET',
            url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
            params: { symbol: 'NVDA', region: 'US' },
            headers: {
                'X-RapidAPI-Key': '5e3e766307msh87df417b297885bp1f8517jsn2fc4320cebcb',
                'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            /* 	console.log(response.data); */
            let quote = [response.data.symbol, response.data.price.shortName, response.data.price.regularMarketPrice.raw, response.data.price.regularMarketChange.fmt, response.data.price.regularMarketChangePercent.raw.toFixed(2)]
            //console.log(quote)
            setQuote6([...quote])
        }).catch(function (error) {
            console.error(error);
        });
    }


    useEffect(() => {
        getQuote1()
        getQuote2()
        getQuote3()
        getQuote4()
        getQuote5()
        getQuote6()
    }, [])

    // console.log(quote1)

    const handleClick = (e) => {
        console.log(e)
        if (e === 1) {
            addTicker(`${quote1[0]}`, `${quote1[1]}`, `${quote1[2]}`, `${quote1[3]}`, `${quote1[4]}`);
        }
        if (e === 2) {
            addTicker(`${quote2[0]}`, `${quote2[1]}`, `${quote2[2]}`, `${quote2[3]}`, `${quote2[4]}`);
        }
        if (e === 3) {
            addTicker(`${quote3[0]}`, `${quote3[1]}`, `${quote3[2]}`, `${quote3[3]}`, `${quote3[4]}`);
        }
        if (e === 4) {
            addTicker(`${quote4[0]}`, `${quote4[1]}`, `${quote4[2]}`, `${quote4[3]}`, `${quote4[4]}`);
        }
        if (e === 5) {
            addTicker(`${quote5[0]}`, `${quote5[1]}`, `${quote5[2]}`, `${quote5[3]}`, `${quote5[4]}`);
        }
        if (e === 6) {
            addTicker(`${quote6[0]}`, `${quote6[1]}`, `${quote6[2]}`, `${quote6[3]}`, `${quote6[4]}`);
        }
    }


    return (
        <div
            className={
                //"bottom-section-container-light"
                darkMode
                    ? "bottom-section-container-dark"
                    : "bottom-section-container-light"
            }
        >

            <Carousel pause='hover' variant={!darkMode ? 'dark' : ''}>
                <Carousel.Item className='caro-item'>
                    <img
                        className={darkMode ? "d-block w-100 caro-dark" : "d-block w-100 caro-light"}
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt=""
                    />
                    <Carousel.Caption >
                        <h3><a className='' onClick={() => handleStockSelect(quote1[0])} target="_blank" >${quote1[0]}</a></h3>
                        <h2>{quote1[1]}</h2>
                        <p className='caro-data'>Price: ${quote1[2]}</p>
                        <p>Change: $<span className={quote1[3] > 0 ? 'caro-data-green' : quote1[3] < 0 ? 'caro-data-red' : ''}>{quote1[3]}</span></p>
                        <p>Percent Change: <span className={quote1[4] > 0 ? 'caro-data-green' : quote1[4] < 0 ? 'caro-data-red' : ''}>{quote1[4]}</span></p>
                        <button className="footer-add-btn" type="button" onClick={() => handleClick(1)} ><GrAdd /></button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='caro-item'>
                    <img
                        className={darkMode ? "d-block w-100 caro-dark" : "d-block w-100 caro-light"}
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt=""
                    />

                    <Carousel.Caption >
                        <h3><a className='' onClick={() => handleStockSelect(quote2[0])} target="_blank" >${quote2[0]}</a></h3>
                        <h2>{quote2[1]}</h2>
                        <p className='caro-data'>Price: ${quote2[2]}</p>
                        <p>Change: $<span className={quote2[3] > 0 ? 'caro-data-green' : quote2[3] < 0 ? 'caro-data-red' : ''}>{quote2[3]}</span></p>
                        <p>Percent Change: <span className={quote2[4] > 0 ? 'caro-data-green' : quote2[4] < 0 ? 'caro-data-red' : ''}>{quote2[4]}</span></p>
                        <button className="footer-add-btn" type="button" onClick={() => handleClick(2)}  ><GrAdd /></button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='caro-item'>
                    <img
                        className={darkMode ? "d-block w-100 caro-dark" : "d-block w-100 caro-light"}
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt=""
                    />

                    <Carousel.Caption >
                        <h3><a className='' onClick={() => handleStockSelect(quote3[0])} target="_blank" >${quote3[0]}</a></h3>
                        <h2>{quote3[1]}</h2>
                        <p className='caro-data'>Price: ${quote3[2]}</p>
                        <p >Change: $<span className={quote3[3] > 0 ? 'caro-data-green' : quote3[3] < 0 ? 'caro-data-red' : ''}>{quote3[3]}</span></p>
                        <p>Percent Change: <span className={quote3[3] > 0 ? 'caro-data-green' : quote3[3] < 0 ? 'caro-data-red' : ''}>{quote3[4]}</span></p>
                        <button className="footer-add-btn" type="button" onClick={() => handleClick(3)}  ><GrAdd /></button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item className='caro-item'>
                    <img
                        className={darkMode ? "d-block w-100 caro-dark" : "d-block w-100 caro-light"}
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt=""
                    />
                    <Carousel.Caption >
                        <h3><a className='' onClick={() => handleStockSelect(quote4[0])} target="_blank" >${quote4[0]}</a></h3>
                        <h2>{quote4[1]}</h2>
                        <p className='caro-data'>Price: ${quote4[2]}</p>
                        <p >Change: $<span className={quote4[3] > 0 ? 'caro-data-green' : quote4[3] < 0 ? 'caro-data-red' : ''}>{quote4[3]}</span></p>
                        <p >Percent Change: <span className={quote4[4] > 0 ? 'caro-data-green' : quote4[4] < 0 ? 'caro-data-red' : ''}>{quote4[4]}</span></p>
                        <button className="footer-add-btn" type="button" onClick={() => handleClick(4)} ><GrAdd /></button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='caro-item'>
                    <img
                        className={darkMode ? "d-block w-100 caro-dark" : "d-block w-100 caro-light"}
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt=""
                    />

                    <Carousel.Caption>
                        <h3><a className='' onClick={() => handleStockSelect(quote5[0])} target="_blank" >${quote5[0]}</a></h3>
                        <h2>{quote5[1]}</h2>
                        <p className='caro-data'>Price: ${quote5[2]}</p>
                        <p >Change: $<span className={quote5[3] > 0 ? 'caro-data-green' : quote5[3] < 0 ? 'caro-data-red' : ''}>{quote5[3]}</span></p>
                        <p >Percent Change: <span className={quote5[4] > 0 ? 'caro-data-green' : quote5[4] < 0 ? 'caro-data-red' : ''}>{quote5[4]}</span></p>
                        <button className="footer-add-btn" type="button" onClick={() => handleClick(5)}  ><GrAdd /></button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='caro-item'>
                    <img
                        className={darkMode ? "d-block w-100 caro-dark" : "d-block w-100 caro-light"}
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt=""
                    />

                    <Carousel.Caption>
                        <h3><a className='' onClick={() => handleStockSelect(quote6[0])} target="_blank" >${quote6[0]}</a></h3>
                        <h2>{quote6[1]}</h2>
                        <p className='caro-data'>Price: ${quote6[2]}</p>
                        <p >Change: $<span className={quote6[3] > 0 ? 'caro-data-green' : quote6[3] < 0 ? 'caro-data-red' : ''}>{quote6[3]}</span></p>
                        <p >Percent Change: <span className={quote6[4] > 0 ? 'caro-data-green' : quote6[4] < 0 ? 'caro-data-red' : ''}>{quote6[4]}</span></p>
                        <button className="footer-add-btn" type="button" onClick={() => handleClick(6)}  ><GrAdd /></button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="footer-container">
                <footer>
                    <a
                        href="//support.google.com/websearch?rd=2&amp;hl=en-US#topic=3378866"
                        className={darkMode ? "footer-link-dark" : "footer-link-light"}
                    >
                        Help
                    </a>

                    <a
                        href="https://myaccount.google.com/privacypolicy?hl=en-US"
                        className={darkMode ? "footer-link-dark" : "footer-link-light"}
                    >
                        Privacy
                    </a>
                    <a
                        href="https://myaccount.google.com/termsofservice?hl=en-US"
                        className={darkMode ? "footer-link-dark" : "footer-link-light"}
                    >
                        Terms
                    </a>
                    <a
                        href="https://www.google.com/intl/en-US_US/googlefinance/disclaimer/"
                        className={darkMode ? "footer-link-dark" : "footer-link-light"}
                    >
                        Disclaimer
                    </a>
                </footer>
            </div>
        </div>
    );
};
export default Footer