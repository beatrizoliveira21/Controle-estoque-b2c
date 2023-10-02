import React from 'react';
//import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { createRoot } from 'react-dom/client';

import List from './Pages/Devices/List';
import Login from './Pages/Login/Login';
import Devolucao from './Pages/Devolução/Devolucao';
import Atualizacao from './Pages/Atualização/Atualizacao';
import Home from './Pages/Home/Home';
import Emprestimo from './Pages/Emprestimo/Emprestimo';
import LoginPage from './Pages/Perfil/LoginPage';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {<Route path="/list" element={<List />} />}
          <Route path="/login" element={<Login />} />
          <Route path="/emprestimo" element={<Emprestimo />} />
          <Route path="/devolução" element={<Devolucao />} />
          <Route path="/atualização" element={<Atualizacao />} />
          <Route path='/' element={<Home />} />
          <Route path='loginPage' element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();