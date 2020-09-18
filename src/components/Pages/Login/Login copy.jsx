// Henter react
import React, { useState } from "react";
// Henter form hook fra NPM React-hook-form
import { useForm, ErrorMessage } from "react-hook-form";

const Login = (props) => {
  // Deklarerer hook til login form
  const { handleSubmit, register, errors } = useForm();
  
  // Deklarerer hook til login
  const [isLoggedIn, setLogin] = useState(false);

  const onSubmit = (values) => {
    // Deklarerer headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // Deklarerer user data (username + password)
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", values.username);
    urlencoded.append("password", values.password);

    // Deklarerer request options
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    // Kalder login i API - returnerer array med token hvis true
    fetch("https://api.mediehuset.net/token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Hvis bruger findes
        if (result.access_token) {
          setLogin(true);

          // Smid token og user id ned i session storage
          // Så kan vi tilgå dem derfra indtil at browser vinduet lukkes
          sessionStorage.setItem("token", result.access_token);
          sessionStorage.setItem("user_id", result.user_id);
        }
      });
  };

  const Logout = () => {
    sessionStorage.clear();
    setLogin(false);
  };

  if(!isLoggedIn) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Brugernavn:</label>
          <input
            type="text"
            name="username"
            id="username"
            ref={register({
              required: "Nødvendig",
            })}
          />
          <ErrorMessage errors={errors} name={"username"}>
            {({ message }) => <span>{message}</span>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="password">Adgangskode:</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register({
              required: "Nødvendig",
            })}
          />
          <ErrorMessage errors={errors} name={"password"}>
            {({ message }) => <span>{message}</span>}
          </ErrorMessage>
        </div>
        <button type="submit">Send</button>
      </form>
    );
  } else {
    return (
      <div>
        <button onClick={() => Logout()}>Logout</button>
      </div>
    );
  }
};

export default Login;
