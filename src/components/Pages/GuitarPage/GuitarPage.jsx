import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ItemDetail/ItemDetail.scss';

export default function GuitarPage({ match }) {
    const [apiData, setApiData] = useState(null);
    const [setApiDatas] = useState(null);
    const [apiTitleFetch, setTitleFetch] = useState(null);


 useEffect(() => {
		// Ved at putte funktions deklarationen inde i useEffekt kan vi være sikker på at funktionen er frisk når den bliver kørt.
	async function getCategory() {
    const fetchHeaders = new Headers();
    fetchHeaders.append('Accept', 'application/json');
    try {
      const request = await fetch(`https://api.mediehuset.net/stringsonline/productgroups/${match.params.id}`, { headers: fetchHeaders });
      const response = await request.json();
      console.log(response.group);
      console.log('Fetch response ^');
      setApiData(response.group.products);
      setApiDatas(response.item);
      setTitleFetch(response.group);
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

// Sender ID'et med, når man klikker videre på et specifikt produkt

const getRatings = (id) => {
  fetch(`https://api.mediehuset.net/stringsonline/brands/${id}`, requestOptionsTwo)
    .then((res) => res.json())
    .then((data) => console.log(id));
};


// POST sendt til indkøbskurven: 

let [quantity] = useState(0);

const postStuff = (id = "test") => {

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
const urlencodedBody = new URLSearchParams();
urlencodedBody.append("product_id", id);
urlencodedBody.append("quantity", 1);


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
    {apiTitleFetch && 
      <section>
        <p>{apiTitleFetch.title}</p>
      </section>
    }
  </section>

{apiTitleFetch && 
  <section className="main-wrap">
    <h2 className="product-title">{apiTitleFetch.title} produkter</h2>
  </section>
}

<section className="main-wrap">

  {apiData && apiData.length > 0 && apiData.map((item, i) =>
    <section key={i}>
      <div className="grid-items">
          <figure><img src={item.image_fullpath} alt='product'/></figure>
              <article>
                <h3 className="grid-header">{item.name}</h3>

                  <section>{item.description_short}

                    <Link to={`/specificproduct/${item.id}`}>
                      <div className="direct-link" id={item.id} onClick={(e)=>{getRatings(e.target.id)}}>Læs Mere!</div>
                    </Link></section>

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
</div>
    )
}