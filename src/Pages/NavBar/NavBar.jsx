import React from 'react';
import { NavLink } from 'react-router-dom'; // Importe NavLink do react-router-dom
import styles from './NavBar.module.css';
import { useState } from 'react';

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>Controle<span>Estoque</span></NavLink>
      <ul className={styles.links_list}>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink></li>
        {isAuthenticated && (
          <>
          <li><NavLink to="/devolucao" className={({ isActive }) => (isActive ? styles.active : "")}>Devolução</NavLink></li>
            <li><NavLink to="/emprestimo">Empréstimo</NavLink></li>
            <li><NavLink to="/list">Dispositivos</NavLink></li>
          </>
        )}
        {!isAuthenticated && (
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>Entrar</NavLink></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
