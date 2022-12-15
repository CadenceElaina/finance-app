import Nav from "../components/Nav"
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGlobalContext } from '../context'
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

const StockOverview = () => {
    const { darkMode } = useGlobalContext()
    const { symbol } = useParams()
    const [chartData, setChartData] = useState([])
    const [news, setNews] = useState([]);
    const [quoteData, setQuoteData] = useState([])
    const [summary, setSummary] = useState([])
    const [financials, setFinancials] = useState([])

    const quoteDataTitles = [
        'Previous Close: ',
        'Daily Low: ',
        'Daily High: ',
        'Market Cap: ',
        'Average 3 Month Volume: ',
        'Forward EPS: ',
        'Book Value: ',
        'Beta: ',
        'Dividend Yield: ',
        'Exchange Name: '
    ]
    const financialsTitles = [
        'Total Revenue: ',
        'Revenue per Share: ',
        'Revenue Growth: ',
        'Total Debt: ',
        'Total Cash: ',
        'Earnings Growth: ',
        'Gross Profits: ',
    ]

    /* const symbol = 'aapl' */
    /* const data = [ ["day", "low", "open", "close", "high"]] */
    const data = [['date', "", "", "", ""]]
    const getData = () => {
        const options = {
            method: 'GET',
            url: 'https://seeking-alpha.p.rapidapi.com/symbols/get-chart',
            params: { symbol: `${symbol}`, period: '1Y' },
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //console.log(response.data);
            setChartData(response.data.attributes)
        }).catch(function (error) {
            console.error(error);
        });
    }
    /* useEffect(() => {
      getData()
  
    }, []) */

    const getSymbolData = () => {
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
            let qd = [
                '$' + response.data.price.regularMarketPreviousClose.fmt,
                '$' + response.data.price.regularMarketDayLow.fmt,
                '$' + response.data.price.regularMarketDayHigh.fmt,
                '$' + response.data.price.marketCap.fmt,
                response.data.price.averageDailyVolume3Month.fmt,
                response.data.defaultKeyStatistics.forwardEps.fmt,
                response.data.defaultKeyStatistics.bookValue.fmt,
                response.data.defaultKeyStatistics.beta.fmt,
                response.data.summaryDetail.dividendYield.fmt,
                response.data.price.exchangeName
            ]
            let sum = [response.data.summaryProfile.longBusinessSummary]
            let fin = [

                '$' + response.data.financialData.totalRevenue.fmt,
                response.data.financialData.revenuePerShare.fmt,
                response.data.financialData.revenueGrowth.fmt,

                response.data.financialData.totalDebt.fmt,
                response.data.financialData.totalCash.fmt,
                response.data.financialData.earningsGrowth.fmt,

                '$' + response.data.financialData.grossProfits.fmt

            ]
            /*   console.log(fin)
              console.log(sum)
              console.log(qd) */
            setQuoteData(qd)
            setSummary(sum)
            setFinancials(fin)
            //console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    /* useEffect(() => {
     getSymbolData()
   }, [])  */

    const keys = Object.keys(chartData);
    keys.forEach((key, index) => {
        /*    console.log(key, `${chartData[key].open}`, `${chartData[key].high}`, `${chartData[key].low}`, `${chartData[key].close}`) */
        data.push([
            key.substring(0, 10),
            Number(`${chartData[key].low}`),
            Number(`${chartData[key].open}`),
            Number(`${chartData[key].close}`),
            Number(`${chartData[key].high}`)
        ])
    })

    //console.log(data[0])

    const getNews = () => {
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: {
                q: `${symbol}`,
                count: '5',
                freshness: 'Month',
                textFormat: 'Raw',
                safeSearch: 'Off'
            },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '5e3e766307msh87df417b297885bp1f8517jsn2fc4320cebcb',
                'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setNews(response.data.value)
            //console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    /*  useEffect(() => {
     getNews();
 
   }, [])   */

    const options = {
        title: "$" + `${symbol}`,
        legend: "none",
        animation: {
            "startup": true,
            duration: 1000,
            easing: 'in',
        },
        bar: { groupWidth: "10px" }, // Remove space between bars.
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
            risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
        },

    };

    return (
        <>
            <Nav />
            {
                data.length > 1 ?
                    <Chart
                        chartType="CandlestickChart"
                        width="100vw"
                        height="100vh"
                        data={data}
                        options={options}
                    />
                    :
                    <div style={{ marginTop: '300px' }}>Loading probably..</div>
            }
            <Container>
                <Row>
                    <Col>
                        <ul className={darkMode ? "news-container-dark" : "news-container-light"}>
                            {news.map((article) => {
                                return (
                                    <div className="article-link-container" key={article.name}>
                                        <Row>
                                            <h5>{article.provider[0].name}</h5><p>{article.datePublished.substring(0, 10)}</p>
                                        </Row>
                                        <Row>
                                            <a
                                                href={`${article.url}`}
                                                target="_blank"
                                                className={darkMode ? "article-link-dark" : "article-link-light"}
                                            >
                                                <h4 className='article-title'>
                                                    {article.name}
                                                </h4>
                                            </a>
                                        </Row>

                                        <a
                                            href={`${article.url}`}
                                            target="_blank"
                                            className={darkMode ? "article-link-dark" : "article-link-light"}
                                        >
                                            <Row>
                                                {article.image !== undefined && article.image.thumbnail !== undefined && (
                                                    <img
                                                        src={`${article.image.thumbnail.contentUrl}`}
                                                        className="article-img-overview-page"
                                                    />
                                                )} </Row>
                                            <Row>
                                                <p className='article-text'>{article.description}</p>
                                            </Row>
                                        </a>
                                    </div>
                                );
                            })}
                        </ul>



                    </Col>
                    <Col>
                        <ListGroup style={{ marginTop: '5px', marginBottom: '5px' }}>
                            {
                                quoteData.map((qd, i) => {
                                    return (
                                        <ListGroup.Item variant={darkMode ? "dark" : "light"}>
                                            <Row>
                                                <Col>
                                                    {quoteDataTitles[i]}
                                                </Col>
                                                <Col className="text-end">
                                                    {qd}
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                        <Row className="justify-content-md-center">

                            <Col>
                                <Accordion style={{ marginTop: '5px', marginBottom: '5px' }} defaultActiveKey="0" className={darkMode ? 'accordian-body-dark' : 'accordian-body-light'}>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>About</Accordion.Header>
                                        <Accordion.Body className={darkMode ? 'accordian-body-dark' : 'accordian-body-light'}>
                                            {

                                                summary.map((s) => {
                                                    return (
                                                        <p className='summary'>{s}</p>
                                                    )
                                                })
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <ListGroup style={{ marginTop: '5px', marginBottom: '5px' }}>
                            {
                                financials.map((fina, i) => {
                                    return (
                                        <ListGroup.Item variant={darkMode ? "dark" : "light"}>
                                            <Row>
                                                <Col>
                                                    {financialsTitles[i]}
                                                </Col>
                                                <Col className="text-end">
                                                    {fina}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </ >
    )
}
export default StockOverview