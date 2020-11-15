import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalBody
} from 'reactstrap'
// nav link auto maticly impliment the active component and a tag
import { NavLink } from 'react-router-dom';
import EditBox from './EditBox';
import { Tabs, Tab } from "react-bootstrap";
import { LogoUrl } from '../shared/externalUrl'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { patchContent, signup, login } from '../redux/ActionCreators'
import ColorPicker from 'react-color-picker-wheel';

import '../style-css/header.css';

const Header = (props) => {

     const [ {casing}, {credentials}, {dishes}, {thePlace}, {staff}, {page} ]= useSelector(store =>[ store.casing, store.credentials, store.dishes, store.thePlace, store.staff, store.page])
    //const { casing } = useSelector(store => store.casing);
    //const { credentials } = useSelector(store => store.credentials);
    const dispatch = useDispatch();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState("login");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupRePassword, setSignupRePassword] = useState("");


     const [flipText, setFlipText] = useState(() => {
        if (page) {
            if (page === "one") return "one page";
            return "multi page"
        }
        return null;
    });

    const [flipClass, setFlipClass] = useState(() => {
        if (page) {
            if (page === "one") return "one-page";
            return "multi-page"
        }
        return null;
    }); 

    const [color, setColor] = useState(() => {
        if (casing) {
            return casing.color;
        }
        return null;

    });
    const [debounce] = useDebounce(color, 1000)

    const [loginError, setLoginError] = useState(null);
    const [signupError, setSignupError] = useState("");
    const { register } = useForm();

    useEffect(() => {
        console.log("color: ", color);
        if (color && casing.color !== color) {
            casing.color = color;
            dispatch(patchContent(credentials.id, "casing", casing))
        }
    }, [debounce])

    function handleLogin(event) {
        event.preventDefault();
        setLoginError("");
        console.log({ loginUsername, loginPassword });

        const details = { id: loginUsername, password: loginPassword }
        dispatch(login(details)).then(res => {
            if (typeof res === "string") {
                console.log(res);
                setLoginError(res);
            }
            else {
                setIsModalOpen(false);
                setLoginUsername("");
                setLoginPassword("");
            }

        }); // check if user already exist
    }

    function handleSignup(event) {
        event.preventDefault();
        setSignupError("");
        console.log({ signupUsername, signupPassword, signupRePassword });

        if (signupRePassword !== signupPassword) {
            setSignupError("passwords not match")
            return;
        }
        credentials.id = signupUsername;
        credentials.password = signupPassword;
        const myContent = {casing, credentials, dishes, thePlace,staff, page}
        dispatch(signup(myContent)).then(res => {
            if (res !== "") {
                setSignupError(res);
                credentials.id = "0";
                credentials.password = "0";
            }
            else {
                setIsModalOpen(false);
                setSignupUsername("");
                setSignupPassword("");
                setSignupRePassword("");
            }

        }); // check if user already exist
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    function rgbToHex(rgb) {
        const hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
        return hex;
    }

    function toMultiPage() {
        setFlipText("multi page");
        setFlipClass("multi-page");
        dispatch(patchContent(page, "page", "multi"));
    }
    function toOnePage() {
        dispatch(patchContent(page, "page", "one"));
        setFlipText("one page");
        setFlipClass("one-page")
    }



    return (
        <React.Fragment>
            <Navbar dark expand="md" style={{ backgroundColor: "rgba(" + [...color.map(c => c / 2), 1] + ")" }}>
                <div className="container container-nav">
                    <NavbarToggler onClick={() => setIsNavOpen(!isNavOpen)} />
                    <NavbarBrand href="/">
                        <img src={LogoUrl} height="30" width="41" alt="" />
                    </NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
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
                    <Button outline onClick={() => setIsModalOpen(!isModalOpen)} className="nav-link login"><span className="fa fa-sign-in"> Login</span></Button>
                </div>
            </Navbar>
            <Jumbotron className="jumbotron" style={{ backgroundColor: "rgba(" + [...color, 1] + ")" }}>
                <div className="container header-container" style={{ backgroundColor: "rgba(" + [...color, 1] + ")" }} >

                    <h1 className="h1-title">Design Your Restaurant</h1>

                    <EditBox className="title" field="title" type="casing" itemId="0" />
                    <EditBox className="description" field="description" type="casing" itemId="0" />
                    <div className="colorPicker">
                        <ColorPicker
                            onChange={(c => setColor(Object.values(c["rgb"])))}
                            size={240}
                            initialColor={rgbToHex(color)}
                        />
                        <div class={"flip-container " + flipClass + "-container"}>
                            <div class="background-btn" onClick={() => toOnePage()}><strong>one page</strong></div>
                            <div class="background-btn" onClick={() => toMultiPage()}><strong>multi page</strong></div>
                             {/*<button class={"btn btn-dark flip-btn " + flipClass + "-btn"} >{flipText}</button>*/}
                            <div class={"flip-btn " + flipClass + "-btn"} ><strong>{flipText}</strong></div> 
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
                <ModalBody>

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={modalTab}
                        onSelect={(k) => setModalTab(k)}
                    >
                        <Tab eventKey="login" title="login">
                            <form name="login" onSubmit={handleLogin}>
                                <label className="col-12 col-md-3" style={{ marginTop: "12px", marginBottom: "8px" }}>username</label>
                                <input className="col-12 col-md-9" style={{ marginTop: "4px", marginBottom: "8px" }} name="loginUsername" value={loginUsername}
                                    onChange={(event) => setLoginUsername(event.target.value)}
                                    ref={register({ required: true })} />

                                <label className="col-12 col-md-3" style={{ marginTop: "4px", marginBottom: "8px" }}>password</label>
                                <input className="col-12 col-md-9" style={{ marginTop: "4px", marginBottom: "8px" }} type="password" name="loginPassword" value={loginPassword}
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                    ref={register({ required: true })} />

                                <div style={{ color: "red" }}>{loginError}</div>
                                <div className=" col-2 ml-auto" style={{ marginRight: "8.5px", marginTop: "5px" }}>
                                    <button type="submit" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 3.5, paddingBottom: 3.5 }} className="btn btn-primary" name="submit">login</button>
                                </div>
                            </form>
                        </Tab>

                        <Tab eventKey="signUp" title="sign up">
                            <form name="signup" onSubmit={handleSignup}>
                                <label className="col-12 col-md-3" style={{ marginTop: "12px", marginBottom: "8px" }}>username</label>
                                <input className="col-12 col-md-9" style={{ marginTop: "4px", marginBottom: "8px" }} name="signupUsername" value={signupUsername}
                                    onChange={(event) => setSignupUsername(event.target.value)} />

                                <label className="col-12 col-md-3" style={{ marginTop: "4px", marginBottom: "8px" }}>password</label>
                                <input className="col-12 col-md-9" style={{ marginTop: "4px", marginBottom: "8px" }} type="password" name="signupPassword" value={signupPassword}
                                    onChange={(event) => setSignupPassword(event.target.value)}
                                    ref={register({ required: true })} />

                                <label className="col-12 col-md-3" style={{ marginTop: "4px", marginBottom: "8px" }}>re-enter password</label>
                                <input className="col-12 col-md-9" style={{ verticalAlign: "top", marginTop: "10px", marginBottom: "8px" }} type="password" name="signupRePassword" value={signupRePassword}
                                    onChange={(event) => setSignupRePassword(event.target.value)}
                                    ref={register({ required: true })} />

                                <div style={{ color: "red" }}>{signupError}</div>
                                <div className=" col-3 ml-auto" style={{ marginRight: "8.5px", marginTop: "5px", paddingRight: "0px", alignItems: "right", justifyContent: "right" }}>
                                    <button type="submit" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 3.5, paddingBottom: 3.5 }} className="btn btn-primary mr-auto" name="submit2">sign up</button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );


}

export default Header