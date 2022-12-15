import { useGlobalContext } from '../context'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CiCircleRemove } from 'react-icons/ci';

//import {IoAddCircleSharp} from 'react-icons/Io/'
const Watchlist = (props) => {
    const navigate = useNavigate()
    const { darkMode, removeTicker, watchList, addTicker } = useGlobalContext()
    /*  const removeTicker = (id) => {
     const remainingTasks = list.filter((task) => id !== task.ticker);
     setList(remainingTasks);
   }; */
    const handleStockSelect = (symbol) => {
        navigate(`overview/${symbol}`)
    }
    /* href={`https://www.google.com/search?q=${props.ticker}`} */
    return (
        <div>
            <div className="watchlist-inner-container">
                <div className={
                    darkMode ? "watchlist-item-container-dark" : "watchlist-item-container-light"
                }>
                    <Container>
                        <Row className='watchlist-row'>

                            <Col>
                                <p className="watchlist-item-ticker"><a className='watchlist-ticker-link' onClick={() => handleStockSelect(props.ticker)} target="_blank" >${props.ticker}</a></p>
                            </Col>
                            <Col>
                                <p className="watchlist-item-name">{props.name}</p>
                            </Col>

                            <Col>
                                <p className="watchlist-item-price">${props.price}</p>
                            </Col>
                            <Col>
                                <p className={props.change == 0 ? 'quote-item-gray' : props.change > 0 ? 'quote-item-green' : "quote-item-red"}>{props.change > 0 ? "+" : props.change == 0 ? "" : '-'}${props.change}</p>
                            </Col>
                            <Col>
                                <p className={props.percentChange == 0 ? 'quote-item-gray' : props.percentChange > 0 ? 'quote-item-green' : "quote-item-red"}>{props.percentChange > 0 ? "+" : '-'}{props.percentChange}%</p>
                            </Col>
                            <Col>
                                <button
                                    type="button"
                                    className="remove-btn svg"
                                    onClick={() => removeTicker(props.ticker)}><CiCircleRemove className='svg-remove' /></button>
                            </Col>

                        </Row>
                    </Container>
                </div>

            </div>
        </div>
    );
};
export default Watchlist