import React from 'react'
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
        <h1>Bem vindo !!!</h1>
        <p>Esse é o Projeto de controle do estoque de Dispositivos do B2C</p>
        <p>A ferramenta consiste em deixar mais organizado e centralizado a busca e também a devolução de dispositivos.</p>
    </div>
  )
}

export default Home;