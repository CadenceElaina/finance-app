import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context'
import { useState, useEffect } from 'react'
import Mode from "./Mode"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { FcComboChart } from 'react-icons/fc';

/*  <Link style={{margin: "10px"}} className="nav-link" to="/overview">Market Overview</Link> */

const TopNav = () => {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);
    const { darkMode, changeMode } = useGlobalContext()
    return (
        <>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className={darkMode && scroll ? "header-shadow-dark" : scroll ? "header-shadow-light" : ''}>
                <Container>
                    <Link className="" to="/"><button className={darkMode ? 'hidden-scroll-btn-dark ' : 'hidden-scroll-btn-light'} onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}><h1 style={{ margin: "10px" }}>FinHub <FcComboChart /></h1></button></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">


                        </Nav>
                        <Nav>
                            {darkMode
                                ? <Button variant="dark" onClick={changeMode}>Light Mode</Button>
                                : <Button variant="light" onClick={changeMode}>Dark Mode</Button>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
export default TopNav 