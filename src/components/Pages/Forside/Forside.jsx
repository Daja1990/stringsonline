import React from 'react';
import { NavLink } from 'react-router-dom';
import './Forside.scss';
import home from '../../images/home-icon.png';
import header from '../../images/fp-img.png';
import ForsideFetch from '../../Fetches/ForsideFetch/ForsideFetch';

export default function Forside(props) {

return (
    <div>

        <section>

            {/* 'Breadcrumb' */}
            <section className="breadcrumbs">
            <img className="icons" src={home} alt="Home" />
                Forside
            </section>

            <section className="infoboard">
                <img className="headerimg" src={header} alt="guitar-header" />
            <section className="headertxt">
                    <h2 className="center-txt">Martin <span className="bold">GPC-11E</span></h2>
                    <h3 className="center-txt">SERIES ELECTRO ACOUSTIC</h3>

                        <article className="linewrap">
                            <h2>Se den nye generation halvacoustiske</h2>
                        </article>

                        {/* Underside findes ikke, derfor tomt link  */}
                        <NavLink to="/">
                            <button className="readmore">LÆS MERE</button>
                        </NavLink>

            </section>
            </section>

                <section>
                    <h2 className="forside-header">Kundernes favoritter</h2>
                    {/* Component med de otte produkter der er på forsiden */}
                    <ForsideFetch />
                </section>

        </section>
    </div>
    )
}

