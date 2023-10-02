import styles from "./devoluçao.module.css";
import React, { useState } from "react";

const Devolucao= ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      username,
      equipmentId,
      loanDate,
      description,
    };

    fetch("http:///127.0.0.1:5000/give-back-device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }).then((response) => {
      return response.json();
    }).then(data => {
      console.log(data);
      if (data.message) {
        setError(data.message);
        setLoading(false);
        return;
      }
      // Se o login for bem-sucedido, atualize o estado isAuthenticated no componente pai
      setIsAuthenticated(true);
    })
    console.log(user);
    setLoading(false);
  }

    return (
      <div className={styles.devolucao}>
         <form  onSubmit={handleSubmit}>
          <h1>Devolução</h1>
          <label>
        <span>Nome: </span>
        <input type="text"
         name="displayName"
          required placeholder="Nome do usuário" 
          onChange={(e) => { setUsername(e.target.value) }} />
        </label>
        <label>
        <span> ID do equipamento:</span>
        <input
          type="number"
          value={equipmentId}
          onChange={(e) => { setEquipmentId(e.target.value) }} 
        />
        </label>
          <label>
          <span>Data de devolução:</span>
          <input
          type="date"
          value={loanDate}
          onChange={(e) => { setLoanDate(e.target.value) }} 
        />
          </label>
          <label>
            <span>Alguma atualização sobre o dispositivo?</span>
            <textarea
            className="inputs"
            name="description"
            id="description"
            cols="20"
            rows="5"
            value={description}
            onChange={(e) => { setDescription(e.target.value) }} 
          ></textarea>
          </label>
          {!loading && <button className="btn">Entrar</button>}
          {loading && <button className="btn" disabled>Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  };
  
  export default Devolucao;