import React from 'react';
import "./Footer.css"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"

const Footer = () => {
    return <footer id="footer">
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS Mobile Phone</p>
            <img src={playStore} alt='playstore' />
            <img src={appStore} alt="AppStore" />
        </div>
        <div className='midFooter' >
            <h1>Ecommerce </h1>
            <p>High Quality is our first priority</p>

            <p>copyrights 2021 &copy; AjayKumar sahani </p>
        </div>
        <div className='rightFooter'>
            <h4>Follow us</h4>
            <a href='http://instagram.com/ajay sahani'>Instagram</a>
            <a href='http://youtuve.com/ajay sahani'>youtube</a>
        </div>
    </footer>;
};

export default Footer;
