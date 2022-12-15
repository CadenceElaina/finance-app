import { useGlobalContext } from '../context'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

const News = () => {
    const { darkMode } = useGlobalContext()
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const getNews = () => {
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news',
            params: { count: '5', category: 'business', safeSearch: 'Off', textFormat: 'Raw' },
            headers: {
                'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': '',
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
    useEffect(() => {
        getNews();

    }, [])


    /*  if(news != []){
       console.log(news.filter((article) => {
       article.image.thumbnail !== undefined
      })) 
     }  */
    return (
        <div className="news-outer-container">
            <Container>

                <ul className={darkMode ? "news-container-dark" : "news-container-light"}>
                    {news.map((article) => {
                        return (
                            <div className="article-link-container" key={article.name}>
                                <Row>
                                    <h4 className='article-title'> <a href="#" target="_blank" className="">
                                        {article.name}
                                    </a></h4>
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
                                                className="article-img"
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

            </Container>
        </div>
    );
};

export default News