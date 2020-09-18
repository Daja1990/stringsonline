import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Kassen.scss';

export default function Kassen(props) {

// Kasse undersiden, der håndterer formen for indsendelse af informationer samt formvalidering af denne

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append('Accept', 'application/json');
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'))

const { register, errors, handleSubmit } = useForm();
const onSubmit = (data, e) => postStuff(data, e);
const [message, setMessage] = useState('');

const postStuff = (data, e) => {
console.log(data);
  e.target.reset();

const headers = new Headers();
headers.append("Content-Type", "application/x-www-form-urlencoded");
headers.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
const urlencodedBody = new URLSearchParams();
urlencodedBody.append("firstname", data.firstname);
urlencodedBody.append("lastname", data.lastname);
urlencodedBody.append("address", data.address);
urlencodedBody.append("zipcode", data.zipcode);
urlencodedBody.append("city", data.city);
urlencodedBody.append("email", data.email);
urlencodedBody.append("status", 1);
urlencodedBody.append("delivery_address", data.deliveryaddress);
urlencodedBody.append("delivery_zipcode", data.deliveryzipcode);
urlencodedBody.append("delivery_city", data.deliverycity);

let requestOptions = {
  method: "POST",
  headers: headers,
  body: urlencodedBody,
  redirect: "follow",
};

fetch("https://api.mediehuset.net/stringsonline/orders", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    setMessage('Du har nu betalt!');
    return result;
  })
  .catch((err) => {
    console.error(err);
    return err;
  });        
} 

return (
  <div>

    <section className="breadcrumbs">
      <p>Kasse</p>
    </section>
            
    <section className="checkoutwrap">
      <h2 className="formheader">Kasse</h2>

      <form className="checkoutgrid" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <input
          type="text"
          name="firstname"
          placeholder="Fornavn"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.firstname && <p className="errormsg">Skriv fornavn</p>}

          <input
          type="text"
          name="lastname"
          placeholder="Efternavn"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.lastname && <p className="errormsg">Skriv efternavn</p>}

          <input
          type="text"
          name="address"
          placeholder="Adresse"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.address && <p className="errormsg">Skriv addresse</p>}

          <input
          type="number"
          name="zipcode"
          placeholder="Postnummer"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.zipcode && <p className="errormsg">Skriv postnummer</p>}

          <input
          type="text"
          name="city"
          placeholder="By"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.city && <p className="errormsg">Skriv bynavn</p>}
          </section>

          <section>
          <input
          type="text"
          name="email"
          placeholder="Email"
          ref={register({
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.email && <p className="errormsg">Skriv email</p>}

          <input
          type="text"
          name="delivery_address"
          placeholder="Leveringsaddr"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.address && <p className="errormsg">Skriv addresse</p>}

          <input
          type="number"
          name="delivery_zipcode"
          placeholder="Leveringspostnummer"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.zipcode && <p className="errormsg">Skriv postnummer</p>}

          <input
          type="text"
          name="delivery_city"
          placeholder="Leveringsby"
          ref={register({
            required: true,
            minLength: { message: "too short", value: 2 },
            maxLength: { message: "too long", value: 30 },              
          })}>
          </input>
          {errors.city && <p className="errormsg">Skriv bynavn</p>}
          </section>

          <section>
            <button className="post-button">Betal</button>
          </section>
      </form>

        <section>
            {<p>{message}</p>}
        </section>
    </section>
  </div>
);
}