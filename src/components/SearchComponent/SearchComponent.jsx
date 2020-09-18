import React, { useState } from 'react';
import NavbarSmall from '../NavbarSmall/NavbarSmall';
import "./SearchComponent.scss";
import { Link } from 'react-router-dom';

export default function SearchComment(props) {

// Dette komponent handler søgefunktionen, og sørger for at sende parametret skrevet i søgefeltet videre

let [comment, setComment] = useState('');
const [setApiComment] = useState(null);

async function getSearchParams() {
const fetchHeaders = new Headers();
fetchHeaders.append('Accept', 'application/json');
try {
    const request = await fetch(`https://api.mediehuset.net/stringsonline/search/${comment}`, { headers: fetchHeaders });
    const response = await request.json();
    setApiComment(response.items);
} catch (error) {
}
}

return (
    <div>
        <NavbarSmall />
            <section className="together">

                <form>
                    <input className="searchfield" onChange={ (e) => {
                        setComment(e.target.value)
                    }} type="text"
                    placeholder="Indtast Søgeord"
                    >        
                    </input>               
                            
                        <Link to={`/searchresult/${comment}`}>
                            <button className="searchbutton" onClick={() => getSearchParams(comment)}><p><i className="arrow right"></i></p></button>
                        </Link>
                </form>
             </section>

    </div>
);
}