import React from 'react';
import Styles from "./Footer.scss";
import footerimg from '../images/footer.png';

export default function Footer(props) {

    return (

    <div className="footerdiv">

        <footer className={Styles.sitefooter}>
            <img className="footerimg" src={footerimg} alt="guitar-header" />
        </footer>

    </div>
    )
}