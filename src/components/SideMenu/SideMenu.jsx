import React from 'react';
import './SideMenu.scss';
import BrandFetch from '../Fetches/BrandFetch/BrandFetch';
import GuitarFetch from '../Fetches/GuitarFetch/GuitarFetch';
import BassFetch from '../Fetches/BassFetch/BassFetch';
import OtherFetch from '../Fetches/OtherFetch/OtherFetch';
import KeyboardFetch from '../Fetches/KeyboardFetch/KeyboardFetch';

class SideMenu extends React.Component {

// Dette "samlekomponent" har alle menuerne nødvendigt i venstre side samlet til ét stort komponent. Ved tryk på en gruppe fetches og åbnes listen af items derfra

state = { showing: false };

render() {

const { showguitar } = this.state;
const { showbass } = this.state;
const { showothers } = this.state;
const { showkeyboard } = this.state;
const { showbrands } = this.state;


return (
    <div className="menuwrapper">
        <ul className="ul-push">
        <p onClick={() => this.setState({ showguitar: !showguitar })}>Guitarer</p>
        <div className="guitar-inline" style={{ display: (showguitar ? 'block' : 'none') }}><li><GuitarFetch /></li></div>

        <p onClick={() => this.setState({ showbass: !showbass })}>Basser</p>
        <div className="guitar-inline" style={{ display: (showbass ? 'block' : 'none') }}><li><BassFetch /></li></div>
                
        <p onClick={() => this.setState({ showothers: !showothers })}>Andre</p>
        <div className="guitar-inline" style={{ display: (showothers ? 'block' : 'none') }}><li><OtherFetch /></li></div>
                
        <p onClick={() => this.setState({ showkeyboard: !showkeyboard })}>Keyboards</p>
        <div className="guitar-inline" style={{ display: (showkeyboard ? 'block' : 'none') }}><li><KeyboardFetch /></li></div>

        <p onClick={() => this.setState({ showbrands: !showbrands })}>Brands</p>
        <div className="div-inline" style={{ display: (showbrands ? 'block' : 'none') }}><li><BrandFetch /></li></div>
        </ul>
    </div>  
        )
    }
}
export default SideMenu