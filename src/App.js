import React from 'react';
import Router from './components/Router/Router';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SideMenu from './components/SideMenu/SideMenu';
import { SuspenseLoader } from "./components/Contexts/Loader";
import './App.scss';

function App() {
  return (
    <>
      <Navbar />
      <SuspenseLoader>
            <Router />
          </SuspenseLoader>
          <SideMenu />
      <Footer />
    </>
  );
}


export default App;
