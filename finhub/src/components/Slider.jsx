import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context'

const Slider = () => {
    const [data, setData] = useState(null);
    const apiKey = '';
    const { darkMode, addTicker } = useGlobalContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://yfapi.net/v6/finance/quote/marketSummary',
                    headers: {
                        'x-api-key': apiKey
                    }
                };

                const response = await axios.request(options);
                setData(response.data.marketSummaryResponse.result);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [apiKey]);

    return (
        <>
            {
                data ? (
                    <div className='slider' style={{ marginTop: "70px", marginBottom: "25px" }}>
                        <div>
                            {
                                data.map((item, index) => {
                                    return item.regularMarketChange.raw > 0 ?
                                        (
                                            <span className='slider-market-raw' key={index}>
                                                <span className='slider-name'>{item.shortName}</span>
                                                {" "}
                                                {item.regularMarketPrice.fmt}
                                                <span style={{ color: "green" }}>{" "} +{item.regularMarketChange.fmt} {" "} (+{item.regularMarketChangePercent.fmt})</span>
                                            </span>
                                        ) :
                                        (
                                            <span className='slider-market-raw' key={index}>
                                                <span className='slider-name'>{item.shortName}</span>
                                                {" "}
                                                {item.regularMarketPrice.fmt}
                                                <span style={{ color: "red" }}>{" "} {item.regularMarketChange.fmt} {" "} ({item.regularMarketChangePercent.fmt})</span>
                                            </span>
                                        )
                                })
                            }
                        </div>
                    </div>
                )
                    : (
                        <div className={darkMode ? 'fill-bg-dark' : 'fill-bg-light'}><h4 style={{ marginTop: "80px", textAlign: "center" }}>...loading</h4>
                            <p style={{ margin: "5px", textAlign: "center" }}>*note you must add your own api keys</p>
                        </div>
                    )
            }
        </>
    )
}

export default Slider;