import './App.css';
import'./index.css';
import { Outlet } from 'react-router-dom';
import React from "react";
import NavBar from './Pages/NavBar/NavBar';



function App() {

    return (
        <>
          <NavBar />
          <Outlet/>
        </>
      );
    }

export default App;