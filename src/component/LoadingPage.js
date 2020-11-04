import React from 'react';
import {
    Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button
} from 'reactstrap'
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import '../style-css/loadingPage.css';



function LoadingPage() {
    return (
        <React.Fragment>
            <Navbar dark expand="md" style={{ backgroundColor: "rgba(49,49,49,1)" }}>
                <div className="container container-nav">
                    <NavbarToggler />
                    <Collapse isOpen={false} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link collapse-nav-link" to="/home">
                                    <span className="fa fa-home"> Home</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link collapse-nav-link" to="/aboutus">
                                    <span className="fa fa-info"> About Us</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link collapse-nav-link" to="/menu">
                                    <span className="fa fa-list"> Menu</span>
                                </NavLink>
                            </NavItem>
                            {/* 
                                <NavItem>
                                    <NavLink className="nav-link offset-2 offset-md-0" to="/contactus">
                                        <span className="fa fa-address-card"></span> Contact US
                                </NavLink>
                                 
                                </NavItem>*/}
                        </Nav>

                    </Collapse>
                    <Button outline className="nav-link login"><span className="fa fa-sign-in"> Login</span></Button>
                </div>
            </Navbar>
            <Jumbotron style={{ backgroundColor: "rgba(98,98,98,1)" }}>
                <div className="container loading-header" >

                    <h1 className="h1-title">Design Your Restaurant</h1>
                    <span className="loading-title">...</span>
                    <span className="loading-description">...</span>
                    <div className="loading-cycle"> <Loading/> </div>
                </div>
            </Jumbotron>
            <div className="container">
                content
                </div>

            <div className="loading-footer" style={{ backgroundColor: "rgba(98,98,98,0.5)" }}>
                <div className="container">

                </div>
            </div>

        </React.Fragment>
    );


}

export default LoadingPage;