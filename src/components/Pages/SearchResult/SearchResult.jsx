import React, { useState, useEffect } from 'react';
import './SearchResult.scss';
import { Link } from 'react-router-dom';

export default function SearchResult( { match } ) {

// Denne underside fanger søgeparameteret i navbarens søgefunktion, og redirecter det til denne side, samt render materialet + link til produktet 

const [searchResult, setSearchResult] = useState(null);

useEffect(() => {
	async function getComments() {
    const fetchHeaders = new Headers();
    fetchHeaders.append('Accept', 'application/json');
    try {
        const request = await fetch(`https://api.mediehuset.net/stringsonline/search/${match.params.comment}`, { headers: fetchHeaders });
        const response = await request.json();
        console.log(response.items);
        console.log('søge funktion return ^');
        setSearchResult(response.items);
    } catch (error) {
        console.log('getCategory -> Error', error);
        console.log('error handling ^')
    }
}

getComments()
}, [match.params.comment])

return (
    <div>

        {/* Tager params fra søgning og ligger dem som 'breadcrumbs' */}
        <section className="breadcrumbs">
            {searchResult && 
            <section>
                <p>{match.params.comment}</p>
            </section>
            }
        </section>

        <section className="wrapsearch">
            <h2 className="searchheader">Søgeresultater:</h2>

            {
            searchResult && searchResult.length > 0 && searchResult.map((searchResult) =>
            
                <section className="center-search" key={searchResult.id}>
                    <Link to={`/specificproduct/${searchResult.id}`}>
                        <p>{searchResult.name}</p>
                    </Link>
                </section>

	        )
            }
        </section>
    </div>
)
}