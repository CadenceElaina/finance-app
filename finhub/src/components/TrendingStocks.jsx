import { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom"

const PopularStocks = () => {
    const { darkMode } = useGlobalContext()
    const [gainers, setGainers] = useState([]);
    const [actives, setActives] = useState([]);
    const [losers, setLosers] = useState([]);
    const navigate = useNavigate()

    const handleStockSelect = (symbol) => {
        navigate(`overview/${symbol}`)
    }
    const getTrending = () => {
        const options = {
            method: "GET",
            url: "https://ms-finance.p.rapidapi.com/market/v2/get-movers",
            headers: {
                "X-RapidAPI-Key": "",
                "X-RapidAPI-Host": "ms-finance.p.rapidapi.com"
            }
        };

        axios
            .request(options)
            .then(function (response) {
                setGainers(response.data.gainers);
                setActives(response.data.actives);
                setLosers(response.data.losers);
                //console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    useEffect(() => {
        getTrending();
    }, []);

    return (
        <div className="">

            <section className="section-gainers">
                <div className="table-headers">
                    <a className='table-title' href="#" title="Stocks: Gainers">
                        <h3>Stocks: Gainers</h3>
                    </a>
                </div>
                <Table striped bordered hover variant={darkMode ? "dark" : "light"} size="sm" className="gainers-table">
                    <thead>
                        <tr>
                            <th>Symbol (ticker)</th>
                            <th>Last Price</th>
                            <th>Change</th>
                            <th>% Change</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gainers.map((quote) => {
                            return (
                                <tr key={quote.performanceID} className={darkMode ? "gainers-row-dark" : "gainers-row-light"}>
                                    <td className="quote-name">
                                        <a className='trending-ticker' onClick={() => handleStockSelect(quote.ticker)} target="_blank">
                                            ${quote.ticker}
                                        </a>
                                        <p> {quote.name}</p>
                                    </td>
                                    <td>${quote.lastPrice}</td>
                                    <td>{quote.netChange} </td>
                                    <td>{quote.percentNetChange}% </td>
                                    <td>{quote.volume}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </section>
            <section className="section-actives">
                <div className="table-headers">
                    <a className='table-title' href="#" title="Stocks: Actives">
                        <h3>Stocks: Actives</h3>
                    </a>
                </div>
                <Table striped bordered hover variant={darkMode ? "dark" : "light"} size="sm" className="actives-table">
                    <thead>
                        <tr>
                            <th>Symbol (ticker)</th>
                            <th>Last Price</th>
                            <th>Change</th>
                            <th>% Change</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actives.map((quote) => {
                            return (
                                <tr key={quote.performanceID} className={darkMode ? "actives-row-dark" : "actives-row-light"}>
                                    <td className="quote-name">
                                        <a className='trending-ticker' onClick={() => handleStockSelect(quote.ticker)} target="_blank">
                                            ${quote.ticker}
                                        </a>
                                        <p> {quote.name}</p>
                                    </td>
                                    <td>${quote.lastPrice}</td>
                                    <td>{quote.netChange} </td>
                                    <td>{quote.percentNetChange}% </td>
                                    <td>{quote.volume}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </section>
            <section className="section-losers">
                <div className="table-headers">
                    <a className='table-title' href="#" title="Stocks: Losers">
                        <h3>Stocks: Losers</h3>
                    </a>
                </div>
                <Table striped bordered hover variant={darkMode ? "dark" : "light"} size="sm" className="losers-table">
                    <thead>
                        <tr>
                            <th>Symbol (ticker)</th>
                            <th>Last Price</th>
                            <th>Change</th>
                            <th>% Change</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {losers.map((quote) => {
                            return (
                                <tr key={quote.performanceID} className={darkMode ? "losers-row-dark" : "losers-row-light"}>
                                    <td className="quote-name">
                                        <a className='trending-ticker' onClick={() => handleStockSelect(quote.ticker)} target="_blank">
                                            ${quote.ticker}
                                        </a>
                                        <p> {quote.name}</p>
                                    </td>
                                    <td>${quote.lastPrice}</td>
                                    <td>{quote.netChange} </td>
                                    <td>{quote.percentNetChange}% </td>
                                    <td>{quote.volume}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </section>

        </div>
    );

};
export default PopularStocks