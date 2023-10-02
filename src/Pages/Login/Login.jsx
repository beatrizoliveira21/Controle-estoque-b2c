import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      username,
      password
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/usuario/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (data.message) {
        setError(data.message);
      } else {
        // Se o login for bem-sucedido, atualize o estado isAuthenticated no componente pai
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      setError("Ocorreu um erro ao processar a solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.login}>
        <h1>Faça Login para acessar seus dados</h1>
        <p className={styles.p}>Entre e pegue ou devolva algum dispositivo</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome: </span>
            <input type="text" name="displayName" required placeholder="Nome do usuário" onChange={(e) => { setUsername(e.target.value) }} />
          </label>
          <label>
            <span>Senha: </span>
            <input type="password" name="password" required placeholder="Insira sua senha" onChange={(e) => { setPassword(e.target.value) }} />
          </label>
          {!loading && <button className="btn">Entrar</button>}
          {loading && <button className="btn" disabled>Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
