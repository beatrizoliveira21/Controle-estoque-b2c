import React, { useState, useEffect } from 'react';
import styles from './LoginPage.css';

function LoginPage(){
    return(
        <div className={styles["login-container"]}>
            <div className="login-box">
              <h6> Meu perfil </h6>
                <ul>
                    <li><strong>Dispositivos emprestados:</strong>{}</li>
                    <li><strong>Dispositivos devolvidos:</strong>{} </li>
                    <li><strong>Quantidade de emprestimos:</strong>{} </li>
                </ul>
           </div>
        </div>
    )
}

export default LoginPage;