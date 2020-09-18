import React, { useState, useEffect } from 'react';
import './SpecificItemDetail.scss';

export default function ItemDetail({ match }) {

const [apiData, setApiData] = useState(null);
const [apiDataGallery, setApiDataGallery] = useState(null);
const [apiDataGalleryExist, setApiDataGalleryExist] = useState(null);
const [apiDataBrandExist, setApiDataBrandExist] = useState(null);
const [fetchStarRating, setfetchStarRating] = useState(null);


// Denne fetch hiver average_num_stars ned

useEffect(() => {
// Ved at putte funktions deklarationen inde i useEffekt kan vi være sikker på at funktionen er frisk når den bliver kørt.
async function getUserRating() {
const fetchHeaders = new Headers();
fetchHeaders.append('Accept', 'application/json');
try {
    const request = await fetch(`https://api.mediehuset.net/stringsonline/ratings/average/${match.params.id}`, { headers: fetchHeaders });
    const response = await request.json();
    setfetchStarRating(response);
} catch (error) {
    console.log('getCategory -> Error', error);
    console.log('error handling ^')
}
}

// Ved at putte match.params.id kan vi få react til at holde øje om den skifter
getUserRating()
}, [match.params.id])

// Denne fetch videretager ID'et fra sidste side, og spytter data ud om denne

useEffect(() => {
async function getCategory() {
const fetchHeaders = new Headers();
fetchHeaders.append('Accept', 'application/json');
try {
    const request = await fetch(`https://api.mediehuset.net/stringsonline/products/${match.params.id}`, { headers: fetchHeaders });
    const response = await request.json();
    console.log(response.item);
    console.log('Fetch response produkt-underside ^');
    setApiData(response.item);
    setApiDataGallery(response.item.gallery);
    setApiDataGalleryExist(response.item.gallery[0]);
    setApiDataBrandExist(response.item.brand_image);
} catch (error) {
    console.log('getCategory -> Error', error);
    console.log('error handling ^')
}
}

getCategory()
}, [match.params.id])


let [quantity, setQuantity] = useState(0);

// Denne funktion poster til kurven når quantity er valgt til varen

const postStuff = (productId, quantity = "test") => {

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
const urlencodedBody = new URLSearchParams();
urlencodedBody.append("product_id", match.params.id);
urlencodedBody.append("quantity", quantity);
console.log(productId);
console.log(quantity);

let requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencodedBody,
    redirect: "follow",
};


fetch("https://api.mediehuset.net/stringsonline/cart", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("login -> result", result);
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};


// Herunder kommer liking systemet. Er brugeren logget ind medsendes bearer token i post, hvor brugeren har valgt et tal mellem 1-5 i dropdown
// Hver gang brugeren vælger et nyt tal i dropdown ændres dens state til det givende tal. Det er denne state der sendes med. Product id er medtaget fra sidste underside
// Når en user har posted sin rating bliver den automatisk fetched ned, så det nye total kommer frem

let [numStars, setnumStars] = useState(null);
let productId = match.params.id;
let [ratings, setRatings] = useState(null);

// Hver gang der ændres i userRating bliver der consol logged (pga. [userRating])
// [] = dependency array. Bliver lyttet på, hver gang den changes kører funktionen. Tomt array = kører kun på mount

useEffect(() => {
    console.log(numStars)
}, [numStars])

useEffect(() => {
    console.log(productId)
}, [productId])

const likeStuff = (productId, numStars = "test") => {

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
const urlencodedBody = new URLSearchParams();
urlencodedBody.append("product_id", productId);
urlencodedBody.append("num_stars", numStars);

let requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencodedBody,
    redirect: "follow",
};

// Poster rating, og kører getRatings samtidig

fetch(`https://api.mediehuset.net/stringsonline/ratings`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      getRatings();
    return result;
    })
    .catch((err) => {
    console.error(err);
    return err;
    });
};

// Henter ratings ned

const getRatings = () => {
    fetch(`https://api.mediehuset.net/stringsonline/ratings/average/${match.params.id}`)
        .then((res) => res.json())
        .then((data) => {
        setRatings(data)
        console.log(data)
        console.log('rating stuff')
        });
};

return (
    <div>
        <section className="breadcrumbs">
            {apiData && 
                <section>
                    <p>{apiData.name}</p>
                </section>
            }
        </section>
            <article className="main-wrapper">

        {
	        apiData && (
		        <article key={apiData.id}>
			        <h2>{apiData.name}</h2> <br />
                    <p>Brand: {apiData.brand}</p> <br />
                    <hr />

                        {(() => {
                        if (apiData.offerprice === "0.00") {
                        return (
                            <p className="price">Pris: {apiData.price}</p>
                        )
                        } else {
                        return (
                            <p className="price">Pris: {apiData.offerprice}</p>
                        )
                        }
                        })()} <br />
                        <hr />

                    <p>Rating: {apiData.rating}</p> <br />
                    <hr />
                    <p>Varer tilbage: {apiData.stock}</p> <br />
                    <hr />
                    <p>Beskrivelse af produkt: <br />{apiData.description_long}</p><br />
                    <hr />
		        </article>
	            )
            }

                    {/* Checker for om der findes et billede i array eller ej, og printer accordingly:  */}
                    <p>Billeder af produktet:</p> <br />
                        {(() => {
                        if (!apiDataGalleryExist) {
                        return (
                            <section>
                                <img className="placeholderimg" alt="placeholder_no_img_found" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png" />
                            </section>
                        )
                        } else {
                        return (
                            <section className="images-grid">
                        {
                        apiDataGallery && apiDataGallery.length > 0 && apiDataGallery.map((setApiDataGallery, i) =>
                            <section key={i}>
                                <img alt="gallery_imgs" src={setApiDataGallery.fullpath} />
                            </section>
                            )
                        }
                            </section>
                        )
                        }
                        })()}
                        <br />
                        <hr />

            </article>

{/* Sidemenu med købsknap */}

        <section className="pricemenu">
        <div className="centered">

            {
            apiData && (

                <section>
                    {(() => {
                    if (!apiDataBrandExist) {
                    return (
                        <section>
                            <figure className="img-move"><img className="placeholderimg-brand" alt="placeholder_img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png" /></figure>
                        </section>
                    )
                    } else {
                    return (
                        <section>
                            <figure className="img-move"><img alt="brand_img" src={apiData.brand_image} /></figure>
                        </section>
                    )
                    }
                    })()}
                </section>
            )
            }

            {
	        apiData && (
		        <section key={apiData.id}>
                    {(() => {
                    if (apiData.offerprice === "0.00") {
                    return (
                        <div className="price-border">
                        <p className="price">Pris: {apiData.price}</p>
                        </div>
                    )
                    } else {
                    return (
                        <div className="price-border">
                        <p className="price">Pris: {apiData.offerprice}</p>
                        </div>
                    )
                    }
                    })()}
		        </section>
	        )
            }

            {/* Quantity knapper til at skrue op og ned for mængden af den vare man er på. Den checker for om man allerede står på 0, og gør man kan man ikke gå længere ned */}

            <button className="change-quantity" onClick={ () => {
                if(quantity === 0){
                    console.log('ikke muligt')
                } else {
                    setQuantity(quantity -1)
                }
                }}>
                -
            </button>

            <button className="buybutton" onClick={() => postStuff(match.params.id, quantity)}>Tilføj til kurv</button>

            <button className="change-quantity" onClick={ () => {
                    setQuantity(quantity +1)
                }}>
                +
            </button>

            {/* Viser antal valgte genstande */}

            <p>Antal valgte: {quantity}</p>
                {
                apiData && (
                    <section>
                        <p>Antal på lager: {apiData.stock}</p>
                    </section>
                )
                }

            <p>Rate produktet:</p>
                <select className="ratings" onChange={(e) => {
                setnumStars(e.target.value)
                }}>
                    <option>Vælg Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>

                <button className="buybutton" onClick={() => likeStuff(productId, numStars)}>Send Rating</button>

                {ratings &&  (
                    <sections>
                        <p>Produktets Rating: {ratings.average_num_stars}</p>
                    </sections>
                    )}

                {/* Henter ratings ned */}

                {
                    fetchStarRating && (
                        <section>
                            {(() => {
                                if (!ratings) {
                                return (
                                    <p>Produktets Rating: {fetchStarRating.average_num_stars}</p>
                                        )
                                } else {
                                return (
                                    <p></p>
                                         )
                                }
                            })()}
                        </section>
                    )
                }
            </div>
        </section>
    </div>
    )
}