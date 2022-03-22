import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import './styles.css';

function App() {

  const [cep, setCep] = useState('');
  const [dadosCep, setDadosCep] = useState({});

  async function handleSearch() {
    if (cep === '') {
      alert("Preencha algum CEP");
      return;
    }

    try {
      const res = await api.get(`${cep}/json`);
      setDadosCep(res.data);
      setCep('');
    } catch (err) {
      alert("Algum erro ocorreu");
      console.log({
        msg: "Ocorreu um erro ao buscar o CEP",
        err: err
      });
      setCep("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(dadosCep).length > 0 && (
        <main className="main">
          {dadosCep.logradouro === "" ? (
            <>
              <h2>CEP: {dadosCep.cep}</h2>

              <span>CEP sem informações de logradouro</span>
              <span>{dadosCep.localidade} - {dadosCep.uf}</span>
              <span>DDD: {dadosCep.ddd}</span>
              <span>Código IBGE: {dadosCep.ibge}</span>
            </>
          ) : (
            <>
              <h2>CEP: {dadosCep.cep}</h2>

              <span>{dadosCep.logradouro}</span>
              {dadosCep.complemento !== "" && <span>Complemento: {dadosCep.complemento}</span>}
              <span>Bairro: {dadosCep.bairro}</span>
              <span>{dadosCep.localidade} - {dadosCep.uf}</span>
              <span>DDD: {dadosCep.ddd}</span>
              <span>Código IBGE: {dadosCep.ibge}</span>
            </>
          )}
        </main>
      )}

    </div>
  );
}

export default App;