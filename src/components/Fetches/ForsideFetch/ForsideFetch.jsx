import React, { useState, useEffect } from 'react';
import '../../SideMenu/SideMenu.scss';
import './ForsideFetch.scss';
import { Link } from 'react-router-dom';

export default function ForsideFetch(props) {

    // Opbygger states

    const [apiData, setApiData] = useState(null);
    let [quantity] = useState(0);

    // Initial fetch til at få brands/2, for at have noget på forsiden

    async function getCategory() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');
        try {
            const request = await fetch('https://api.mediehuset.net/stringsonline/brands/2', { headers: fetchHeaders });
            const response = await request.json();
            console.log(response.item.products);
            console.log('forside fetch');
            setApiData(response.item.products);
        } catch (error) {
            console.log('getCategory -> Error', error);
        }
    }
    useEffect(() => {
        getCategory()
    }, [])


 // Opbyggelse af headers for getItemId. Bliver brugt til at redirecte til item klikket på via dens ID

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append('Accept', 'application/json');
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

let requestOptionsTwo = {
    method: "GET",
    headers: headers,
    redirect: "follow",
    };

const getItemId = (id) => {
    
    fetch(`https://api.mediehuset.net/stringsonline/brands/${id}`, requestOptionsTwo)
        .then((res) => res.json())
        .then((data) => console.log(id));
        console.log(id)
        console.log('et andet id?')
      };

    // Opbyggelse af postStuff, bliver brugt til at poste item til Kurv

const postStuff = (id, quantity = "test") => {

    // Deklarerer headers
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

    
    // Deklarerer request options
    let requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencodedBody,
        redirect: "follow",
      };

      // Kalder login i API - returnerer array med token hvis true
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


 // Rendering af data fra API, loopet igennem. Link til underside, købsknap

return (

    <div>
        <section className="forsidefetchwrap">
            {apiData && apiData.length > 0 && apiData.map((item, i) =>

            <section key={i}>
            <div className="forside-grid-items">
          
              <figure><img src={item.image_fullpath} alt='product'/></figure>
            
              <article className="productDescription">
                <h3 className="grid-header">{item.name}</h3>
                <p>{item.description_short}
    
                <Link to={`/specificproduct/${item.id}`}>
                    <li className="direct-link" id={item.id} onClick={(e)=>{getItemId(e.target.id)}}>Læs Mere!</li>
                </Link></p>
    
                {/* If else  statement der checker om en vare er på tilbud, og hvis den er displayer tilbudsprisen */}

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
    
                <button className="fpbuy" onClick={() => postStuff(item.id, quantity)}>Tilføj til kurv</button>
    
              </article>

        </div>
        </section>
            )
    }   
            
          </section>
         
      </div>
    )
}