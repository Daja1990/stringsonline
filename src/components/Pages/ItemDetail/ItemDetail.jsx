import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ItemDetail.scss';
import '../../SideMenu/SideMenu.scss';

// Dette komponent render alt der ses på Brands undersiderne

export default function ItemDetail({ match }) {

const [apiData, setApiData] = useState(null);
const [apiDatas, setApiDatas] = useState(null);

useEffect(() => {
  // Ved at putte funktions deklarationen inde i useEffekt kan vi være sikker på at funktionen er frisk når den bliver kørt.
	async function getCategory() {
    const fetchHeaders = new Headers();
    fetchHeaders.append('Accept', 'application/json');
    try {
        const request = await fetch(`https://api.mediehuset.net/stringsonline/brands/${match.params.id}`, { headers: fetchHeaders });
        const response = await request.json();
        setApiData(response.item.products);
        setApiDatas(response.item);
    } catch (error) {
        console.log('getCategory -> Error', error);
        console.log('error handling ^')
    }
  }
    getCategory()

// Ved at putte match.params.id kan vi få react til at holde øje om den skifter
}, [match.params.id])

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append('Accept', 'application/json');
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

let requestOptionsTwo = {
    method: "GET",
    headers: headers,
    redirect: "follow",
    };

// Får fat i IDet på onclick, og directer til ID'ets underside
const getItemId = (id) => {

fetch(`https://api.mediehuset.net/stringsonline/brands/${id}`, requestOptionsTwo)
  .then((res) => res.json())
  .then((data) => console.log(id));
};


// Sender POST til kurven med valgt item onclick

let [quantity] = useState(0);

const postStuff = (id, quantity = "test") => {

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
const urlencodedBody = new URLSearchParams();
urlencodedBody.append("product_id", id);
urlencodedBody.append("quantity", 1);
console.log(id);
console.log('id der ikke kommer');
console.log(quantity);
console.log('quantity');

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

return (
<div>

  <section className="breadcrumbs">
    {apiDatas && 
      <div>
        <p>{apiDatas.title}</p>
      </div>
    }
  </section>

  {apiDatas && 
    <section className="main-wrap">
    <section className="grid-items">

    {/* Render placeholder image hvis der ikke findes nogle billeder i image_fullpath */}
    {(() => {
      if (!apiDatas.image_fullpath) {
        return (
          <section>
            <figure className="img-move"><img className="placeholderimg-brand" alt="placeholder_img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png" /></figure>
          </section>
        )
      } else {
        return (
          <section>
            <img alt="item_img" className="img-scale" src={apiDatas.image_fullpath}/>
          </section>
        )
      }
    })()}

    <article>
      <h3 className="grid-header">{apiDatas.title}</h3>
      <p>{apiDatas.description}</p>
    </article>

    </section>

      {/* Navn på udtrukne array brand + produkter */}
      <h2 className="product-title">{apiDatas.title} produkter</h2>

  {apiData && apiData.length > 0 && apiData.map((item, i) =>
    <section key={i}>
      <div className="grid-items">
        <figure><img src={item.image_fullpath} alt='product'/></figure>
          <article>
            <h3 className="grid-header">{item.name}</h3>

            <section>{item.description_short}
              <Link to={`/specificproduct/${item.id}`}>
                <div className="direct-link" id={item.id} onClick={(e)=>{getItemId(e.target.id)}}>Læs Mere!</div>
              </Link>
            </section>

    {(() => {
      if (item.offerprice === "0.00") {
        return (
          <p className="price">Pris: {item.price}</p>
        )
      } else {
        return (
          <p className="price">Pris: {item.offerprice}</p>
        )
      }
    })()}

      <button className="buybuttons" onClick={() => postStuff(item.id, quantity)}>Tilføj til kurv</button>

          </article>
      </div>
      </section>
  )
}   
    </section>
  }
</div>
)
}