import React, { useState, useEffect } from 'react';
import NavbarSmall from '../../NavbarSmall/NavbarSmall';
import './Cart.scss';
import { Link } from 'react-router-dom';

export default function Cart(props) {

    // Underside, der håndterer hele indkøbskurven

const [apiDatas, setApiDatas] = useState(null);
const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append('Accept', 'application/json');
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

let requestOptions = {
method: "GET",
headers: headers,
redirect: "follow",
};


async function getCartItems() {
    try {
        const request = await fetch('https://api.mediehuset.net/stringsonline/cart', requestOptions, { headers: headers });
        const response = await request.json();
        console.log('Cart fetch')
        console.log(response.cartlines);
        setApiDatas(response.cartlines);
    } catch (error) {
        console.log('getCategory -> Error', error);
    }
}

useEffect(() => {
    getCartItems()
}, [])


    // Fetch method delete, der sletter alt indhold i indkøbskurven onclick

const deleteStuff = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
    const urlencodedBody = new URLSearchParams();

    let requestOptions = {
        method: "DELETE",
        headers: headers,
        body: urlencodedBody,
        redirect: "follow",
        };

    fetch("https://api.mediehuset.net/stringsonline/cart", requestOptions)
        .then((response) => response.json())
        .then((result) => {
        console.log("login -> result", result);
        return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
        getCartItems()
      };


return (
     <div>
        <NavbarSmall />
        <section className="product-sec">

            {(() => {
            if (apiDatas) {
            return (
                <h3 className="basketheader">Indhold af kurv:</h3>
            )
            } else {
             return (
                <h3 className="basketheader">Din kurv er tom!</h3>
            )
            }
            })()}

        {/* Render indholdet fra kurven i et grid */}

        {
        apiDatas && apiDatas.length > 0 && apiDatas.map((item, i) =>
            <section className="cartwraps" key={i}>
                <section>
                    <figure><img alt="product_img" src={item.image_fullpath} /></figure>
                </section>
                <section>
                    <h3>{item.name}</h3>
                </section>
                <section>
                Antal: {item.quantity}<br />

                Pris: {(() => {
                    if (item.offerprice === "0.00") {
                        return (
                            <p>{item.price}</p>
                        )
                        } else {
                        return (
                            <p>{item.offerprice}</p>
                        )
                        }
                    })()}
                            <br />
                    </section>
                    </section>
                    )
                }

                {/* Render et billede hvis kurven er tom */}

            {(() => {
              if (!apiDatas) {
                return (
                    <section>
                        <img className="emptybasket" alt="emptybasket" src="https://media.istockphoto.com/vectors/opened-empty-package-box-with-cute-frustrated-face-vector-id830239112?k=6&m=830239112&s=170667a&w=0&h=gQmJHMnriH4oIZKYkaxiktnHMNirf_kCgZipj4MFMnE=" />
                    </section>
              )
                } else {
              return (
                  <section>
                    <button className="emptycart" onClick={() => deleteStuff()}>Fjern Indhold</button>

                    <Link to={`/Kassen`}>
                        <button className="tilkassen"> Til Kassen</button>
                    </Link>
                  </section>
              )
              }
            })()}
            
        </section>
    </div>
    )

}

