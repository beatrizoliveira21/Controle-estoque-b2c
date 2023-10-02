import React, { useState, useEffect } from 'react';
import styles from './List.module.css';
import { Link } from 'react-router-dom';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              className={`page-link ${currentPage === number ? 'active' : ''}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function List() {
  const [devices, setDevices] = useState([]);
  const [dispositivoSelecionado, setDispositivoSelecionado] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 30;
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/devices")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const filteredDevices = devices.filter((device) => {
    const { equipamento, fabricante, modelo, nome_modelo, serial_number } = device.dispositivo;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Verifica se algum dos campos do dispositivo contém o termo de pesquisa
    return (
      (equipamento && equipamento.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (fabricante && fabricante.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (modelo && modelo.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (nome_modelo && nome_modelo.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (typeof serial_number === 'string' && serial_number.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  // Função para calcular o índice inicial e final dos itens na página atual
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Verifique se indexOfFirstItem não é negativo
  if (indexOfFirstItem < 0) {
    indexOfFirstItem = 0;
  }

  const currentItems = filteredDevices.slice(indexOfFirstItem, indexOfLastItem);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = (dispositivo) => {
    console.log(dispositivo);
    setDispositivoSelecionado(dispositivo);
    setModal(true);
  };

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);

  return (
    <div className={styles["list-container"]}>
      <div className={styles.header}>
        {/* Campo de pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar dispositivos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className={styles["list-table"]}>
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>Equipamento</th>
            <th>Fabricante</th>
            <th>Modelo</th>
            <th>Nome do Modelo</th>
            <th>Serial Number</th>
            <th>NºEmpréstimos</th>
            <th>Log Reversa</th>
            <th>Data fabricação</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        {/* Corpo da tabela */}
        <tbody>
          {currentItems.map((device) => (
            <tr key={device._id.$oid}>
              <td>{device.dispositivo.equipamento}</td>
              <td>{device.dispositivo.fabricante}</td>
              <td>{device.dispositivo.modelo}</td>
              <td>{device.dispositivo.nome_modelo}</td>
              <td>{device.dispositivo.serial_number}</td>
              <td>{device.dispositivo.emprestimo_count}</td>
              <td>{device.dispositivo.log_reversa}</td>
              <td>{device.dispositivo.data_fabricacao}</td>
              <td>
                <button className='detalhes' onClick={() => openModal(device)}>Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {modal && (
        <div className={styles.modal}>
          <div className='modal-content'>
            <h6>Detalhes do dispositivo</h6>
            <br />
            <div>
              <strong>Armário:</strong>{" "}
              {dispositivoSelecionado.dispositivo.localization.armario || "Dado indisponível"}
            </div>
            <div>
              <strong>Prateleira:</strong>{" "}
              {dispositivoSelecionado.dispositivo.localization.prateleira || "Dado indisponível"}
            </div>
            <div>
              <strong>Nºdispositivo:</strong>{" "}
              {dispositivoSelecionado.dispositivo.device_number || "Dado indisponível"}
            </div>
            <div>
              <strong>Empréstimo:</strong>
              <ul>
                <li><strong>Data de Devolução:</strong>{dispositivoSelecionado.dispositivo.emprestimo.data_devolucao}</li>
                <li><strong>Data de Retirada:</strong>{dispositivoSelecionado.dispositivo.emprestimo.data_retirada} </li>
                <li><strong>Responsável:</strong> {dispositivoSelecionado.dispositivo.emprestimo.responsavel} </li>
                <li><strong>Tempo Emprestado:</strong> {dispositivoSelecionado.dispositivo.emprestimo.tempo_emprestado} </li>
              </ul>
            </div>
          </div>
          <br />
          <div className='button-modal'>
            <button className='btn-modal-pegar'>
              <Link to="/emprestimo">Pegar</Link>
            </button>
            <button className='btn-modal' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
