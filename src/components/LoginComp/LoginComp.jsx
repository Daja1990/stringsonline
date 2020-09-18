import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Auth/Auth";
import NavbarSmall from '../NavbarSmall/NavbarSmall';
import './LoginComp.scss';


const LoginComp = (props) => {

  // Deklarerer hook til login form
  const { handleSubmit, register, errors } = useForm();
  const { login, logout, loggedIn } = useAuth();
  const onSubmit = handleSubmit((values) => {
    login(values.username.trim(), values.password.trim());
  });

// Checker om jeg er logget ind. Hvis ikke logget ind displayer den login input felter. Er man logget ind, viser den man er logget ind samt logout knap

if(!loggedIn) {
return (

  <div className="login-main">
      <h2>Login</h2>
      <h3>Indtast brugernavn og adgangskode for at logge på</h3>

    <form onSubmit={onSubmit}>

        <NavbarSmall />
        <section className="loginwrap">
          <label htmlFor="username">Brugernavn:</label>
          <input
            className="label-login"
            type="text"
            name="username"
            id="username" 
            ref={register({
              required: true,
              minLength: { message: "too short", value: 2 },
              maxLength: { message: "too long", value: 30 },              
            })}
          />
          {errors.username && <p className="error-color">Skriv brugernavn</p>}
        </section>

        <section className="loginwrap">
          <label htmlFor="password">Adgangskode:</label>
          <input
            className="label-login"
            type="password"
            name="password"
            id="password"
            ref={register({
              required: true,
              minLength: { message: "too short", value: 2 },
              maxLength: { message: "too long", value: 30 },              
            })}
          />
          {errors.password && <p className="error-color">Skriv password</p>}
        <button className="login-button" type="submit">Send</button>
        </section>

      </form>
      </div>
    )

  }
  return (

      <section className="loginwrap">
      <NavbarSmall />
        <p className="login-p">Du er nu logget ind</p>
      <button className="logout-button" onClick={logout}>Logout</button>
    </section>
  )
}

export default LoginComp;
