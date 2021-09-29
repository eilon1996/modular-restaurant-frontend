import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { patchContent } from '../redux/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import '../style-css/footer.css';

function Footer(props) {

    const {casing} = useSelector(store => store.casing);
    const {id} = useSelector(store => store.credentials.credentials);
    const dispatch = useDispatch();
    const social = casing.social;
    const color = casing.color;
    

    const Links = () => {
        const [edit, setEdit] = useState(false);
        const [facebook, setFacebook] = useState(social.facebook);
        const [instagram, setInstagram] = useState(social.instagram);
        const [twitter, setTwitter] = useState(social.twitter);
        const [youtube, setYoutube] = useState(social.youtube);
        const [email, setEmail] = useState(social.email);

        function handleSubmit(event) {
            event.preventDefault();
            social.facebook = facebook;
            social.instagram = instagram;
            social.twitter = twitter;
            social.youtube = youtube;
            social.email = email;
            setEdit(false);
            dispatch(patchContent(id,"casing",casing));

        }

        return (
                edit ?
                    <form className="footer-social-form" onSubmit={(event) => handleSubmit(event)}>
                        <span className="footer-social-title">add here external links to your restaurant</span>
                        <label className="footer-btn-facebook btn btn-social-icon btn-facebook"><i className="fa fa-facebook" /></label>
                        <input className="facebook-input" name="facebook" placeholder="facebook link" value={facebook} onChange={(event) => setFacebook(event.target.value)} />
                        <label className="footer-btn-instagram btn btn-social-icon btn-instagram"><i className="fa fa-instagram" /></label>
                        <input className="instagram-input" name="instagram" placeholder="instagram link" value={instagram} onChange={(event) => setInstagram(event.target.value)} />
                        <label className="footer-btn-twitter btn btn-social-icon btn-twitter" ><i className="fa fa-twitter" /></label>
                        <input className="twitter-input" name="twitter" placeholder="twitter link" value={twitter} onChange={(event) => setTwitter(event.target.value)} />
                        <label className="footer-btn-youtube btn btn-social-icon btn-google" ><i className="fa fa-youtube" /></label>
                        <input className="youtube-input" name="youtube" placeholder="youtube link" value={youtube} onChange={(event) => setYoutube(event.target.value)} />
                        <label className="footer-btn-email btn btn-social-icon btn-email"><i className="fa fa-envelope-o" /></label>
                        <input className="email-input" name="email" placeholder="email adress" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <small className="footer-social-note">* you don't need to fill all fields</small>
                        <div className="footer-social-buttons">
                            <button type="button" className="btn btn-light" onClick={() => setEdit(false)}>cancel</button>
                            <button type="submit" className="btn btn-primary" >submit</button>
                        </div>
                    </form>

                    :

                    <div className="col-12 col-sm-4 mt-4 mt-sm-0 social-links-div">
                        <h2>our social</h2>
                        <div className="social-links">
                            <a style={{display:facebook && facebook.length>0?"":"none" }} className="btn btn-social-icon btn-facebook" href={facebook}><i className="fa fa-facebook"></i></a>
                            <a style={{display:instagram && instagram.length>0?"":"none" }} className="btn btn-social-icon btn-instagram" href={instagram}><i className="fa fa-instagram"></i></a>
                            <a style={{display:twitter && twitter.length>0?"":"none" }}  className="btn btn-social-icon btn-twitter" href={twitter}><i className="fa fa-twitter"></i></a>
                            <a style={{display:youtube && youtube.length>0?"":"none" }}  className="btn btn-social-icon btn-google" href={youtube}><i className="fa fa-youtube"></i></a>
                            <a style={{display:email && email.length>0?"":"none" }}  className="btn btn-social-icon btn-light" href={"mailto:" + email}><i className="fa fa-envelope-o"></i></a>
                        </div>
                        <button className="edit-social-btn btn btn-secondary" onClick={() => setEdit("edit")}>edit</button>
                    </div>
                )
    }


    return (
            <div className="footer" style={{ backgroundColor: "rgba(" + [...color.map(c => c / 2), 0.5] + ")" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-6 col-sm-4 social-links-div" >
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/aboutus">About Us</Link></li>
                                <li><Link to="/menu">Menu</Link></li>
                                {/* <li><Link to="/contactus">Contact Us</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-6 col-sm-4 social-links-div">
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
                        <Links />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">

                            <br/><br/>
                            <small>© Copyright 2018 Ristorante Con Fusion</small>
                        </div>
                    </div>
                </div>
            </div>
    );
}


export default Footer