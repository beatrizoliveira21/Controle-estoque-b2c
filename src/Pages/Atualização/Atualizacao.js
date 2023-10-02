import styles from './atualização.module.css';
import React, { useState } from "react";


function Atualizacao() {
  const [dados, setDados] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState(null);

  const handleInputChange = (field, value) => {
    setDados((prevDados) => ({
      ...prevDados,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    fetch("http://127.0.0.1:5000/insert-devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar os dados.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta do servidor:", data);
        setEnviado(true);
        setErro(null);
      })
      .catch((error) => {
        console.error("Erro ao enviar:", error);
        setErro(error.message);
      });
  };

  return (
    <div className={`${styles.att} atualizacao-component`}>
      <h3>Adicionar novo Dispositivo:</h3>
      <table  className={`${styles.tabelaDireita} tabela-direita`}>
        <thead>
        <tr>
          <th scope="col">ID</th>
                <input
                  type="number"
                  onChange={(e) => handleInputChange('id', e.target.value)}
                />
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Equipamento</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('equipamento', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Fabricante</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('fabricante', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Nome do Modelo</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('nome_modelo', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Modelo</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('modelo', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Serial Number</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('serial_number', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Data de fabricação</th>
          <input
                  type="date"
                  onChange={(e) => handleInputChange('data_fabricacao', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">HW Atualizado</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('hw_atualizado', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Oriundo de reversa</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('oriundo_reversa', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Cabo Console</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('cabo_console', e.target.value)}
                />
        </tr>
        <tr>
          <th scope="row">Amostra Global</th>
          <input
                  type="text"
                  onChange={(e) => handleInputChange('amostra_global', e.target.value)}
                />
        </tr>
        </tbody>
      </table>
      <button
        className='btn-att'
        type="button"
        onClick={handleSubmit}
        disabled={enviado}
      >
        Enviar
      </button>
      {erro && <p className={`${styles.erro} erro`}>{erro}</p>}
    </div>
  );
}

export default Atualizacao;
