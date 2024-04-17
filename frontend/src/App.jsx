import { useState, useEffect } from 'react'
import DesigancaoList from './DesignacaoList'
import DesignacaoForm from './DesignacaoForm'
import './App.css'


function App() {
  const [designacoes, setDesignacoes] = useState([]);

  useEffect(() => {
    buscarDesignacoes()
  }, []);

  const buscarDesignacoes = async () => {
    const response = await fetch("http://127.0.0.1:5000/designacoes")
    const data = await response.json()
    setDesignacoes(data.designacoes)
    console.log(data.designacoes)
  }

  const lidarComAtualizarDesignacao = async (id, novoValor) => {
    try {
      const opcoes = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoValor)
      };
      const response = await fetch(`http://127.0.0.1:5000/atualiza_designacao/${id}`, opcoes);
      if (response.status === 200) {
        const designacoesAtualizadas = designacoes.map(designacao => {
          if (designacao.id === id) {
            return { ...designacao, ...novoValor };
          }
          return designacao;
        });
        setDesignacoes(designacoesAtualizadas);
      } else {
        console.error("Falha em atualizar a designação!")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='box'>
      <h2>Editar [Designação da Escola]</h2>
      <DesigancaoList designacoes={designacoes} atualizaDesignacao={lidarComAtualizarDesignacao} />

      {/* Para criar novas designacoes, tira o comentario do codigo abaixo */}
      {/* <DesignacaoForm /> */}
    </div>
  );
}

export default App
