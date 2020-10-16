import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { putContent } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';

function Footer(props) {

    const { myContent, isLoading } = useSelector(store => store.myContent);
    const dispatch = useDispatch();


    const Links = () => {
        const [edit, setEdit] = useState("");
        const [facebook, setFacebook] = useState(myContent.footer.facebook);
        const [instagram, setInstagram] = useState(myContent.footer.instagram);
        const [twitter, setTwitter] = useState(myContent.footer.twitter);
        const [youtube, setYoutube] = useState(myContent.footer.youtube);
        const [email, setEmail] = useState(myContent.footer.email);

        function handleSubmit(event){
            event.preventDefault();
            myContent.footer.facebook = facebook;
            myContent.footer.instagram = instagram;
            myContent.footer.twitter = twitter;
            myContent.footer.youtube = youtube;
            myContent.footer.email = email;
            dispatch(putContent(myContent));
        }

        return (
            <div>
                <div className="col-12 col-sm-4 align-self-center">
                    <div className="text-center" id={edit}>
                        <a className="btn btn-social-icon btn-facebook" href={facebook}><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-instagram" href={instagram}><i className="fa fa-instagram"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href={twitter}><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href={youtube}><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon" href={"mailto:"+email}><i className="fa fa-envelope-o"></i></a>
                    </div>
                    <button className="btn" onClick={() => setEdit("edit")}>edit</button>
                </div>
                <div className="col-12 col-sm-4 align-self-center">
                    <form className="footer-form" id={edit} onSubmit={(event) => handleSubmit(event)}>
                        <span>add here external links to your restaurant</span>
                        <label className="btn btn-social-icon btn-facebook"><i className="fa fa-facebook"></i>
                            <input name="facebook" placeholder="facebook link" value={facebook} onChange={(event) => setFacebook(event.target.value)} /></label>
                        <label className="btn btn-social-icon btn-instagram"><i className="fa fa-instagram"></i>
                            <input name="instagram" placeholder="instagram link" value={instagram} onChange={(event) => setInstagram(event.target.value)}  /></label>
                        <label className="btn btn-social-icon btn-twitter" ><i className="fa fa-twitter"></i>
                            <input name="twitter" placeholder="twitter link" value={twitter} onChange={(event) => setTwitter(event.target.value)}  /></label>
                        <label className="btn btn-social-icon btn-google" ><i className="fa fa-youtube"></i>
                            <input name="youtube" placeholder="youtube link" value={youtube} onChange={(event) => setYoutube(event.target.value)}  /></label>
                        <label className="btn btn-social-icon"><i className="fa fa-envelope-o"></i>
                            <input name="email" placeholder="email adress" value={email} onChange={(event) => setEmail(event.target.value)}  /></label>
                            <small>* you don't need to fill all fields</small>
                    <button type="button" className="btn btn-light" onClick={() => setEdit("save")}>cancel</button>
                    <button type="submit" className="btn btn-light" >submit</button>
                    </form>
                </div>
            </div>)
    }


    // TODO triger re-render when color change
    return (

        (isLoading || myContent === null) ? null :

            <div className="footer" style={{ backgroundColor: "rgba(" + [...myContent.color.map(c => c / 2), 0.5] + ")" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 offset-1 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/aboutus">About Us</Link></li>
                                <li><Link to="/menu">Menu</Link></li>
                                {/* <li><Link to="/contactus">Contact Us</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-7 col-sm-5">
                            <h5>Our Address</h5>
                            <address>
                                121, Clear Water Bay Road<br />
		              Clear Water Bay, Kowloon<br />
		              HONG KONG<br />
                                <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
                                <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
                                <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">
                                    confusion@food.net</a>
                            </address>
                        </div>
                         <Links/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p>© Copyright 2018 Ristorante Con Fusion</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}


export default Footer