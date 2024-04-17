import React, { useState } from 'react'

const DesignacaoList = ({ designacoes, atualizaDesignacao }) => {
    const [designacoesAtualizadas, setDesignacoesAtualizadas] = useState([]);



    const lidaComAlteracoes = (id, campo, valor) => {
        // encontra o index da designacao com o id especificado
        const index = designacoesAtualizadas.findIndex(designacao => designacao.id === id);
        if (index !== -1) {
            // se a designacao ja estiver atualizado, atualiza o valor
            const atualizado = [...designacoesAtualizadas];
            atualizado[index] = { ...atualizado[index], [campo]: valor };
            setDesignacoesAtualizadas(atualizado);
        } else {
            // se ainda nao estiver atualizado, adiciona a array
            const designacao = designacoes.find(designacao => designacao.id === id);
            setDesignacoesAtualizadas(prevState => [...prevState, { ...designacao, [campo]: valor }]);
        }
    };

    const lidarComTodasAtualizacoes = () => {
        designacoesAtualizadas.forEach(designacao => {
            atualizaDesignacao(designacao.id, designacao);
        });
        // Limpa a array
        setDesignacoesAtualizadas([]);
    };

    return (
        <div>
            <table className='table table-responsive-md table-light'>
                <thead className='table-secondary'>
                    <tr>
                        <th>Designação</th>
                        <th>Funcionais</th>
                        <th>Não Funcionais</th>
                        <th>Número total</th>
                    </tr>
                </thead>
                <tbody>
                    {designacoes.map((designacao, index) => (
                        <tr key={designacao.id}>
                            <td className='col-3'>{designacao.designacao}</td>
                            <td className='col-1'>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={designacoesAtualizadas.find(c => c.id === designacao.id)?.funcionais || designacao.funcionais}
                                    onChange={e => {
                                        const novoValor = parseInt(e.target.value);
                                        if (!isNaN(novoValor) && novoValor >= 0) {
                                            lidaComAlteracoes(designacao.id, 'funcionais', novoValor !== 0 ? novoValor : "");
                                        }
                                    }}
                                    disabled={index < 1}
                                />
                            </td>
                            <td className='col-1'>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={designacoesAtualizadas.find(c => c.id === designacao.id)?.nao_funcionais || designacao.nao_funcionais}
                                    onChange={e => {
                                        const novoValor = parseInt(e.target.value);
                                        if (!isNaN(novoValor) && novoValor >= 0) {
                                            lidaComAlteracoes(designacao.id, 'nao_funcionais', novoValor !== 0 ? novoValor : "");
                                        }
                                    }}
                                    disabled={index < 1}
                                />
                            </td>
                            <td className='col-1'>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={designacoesAtualizadas.find(c => c.id === designacao.id)?.numero_total || designacao.numero_total}
                                    onChange={e => {
                                        const novoValor = parseInt(e.target.value);
                                        if (!isNaN(novoValor) && novoValor >= 0) {
                                            lidaComAlteracoes(designacao.id, 'numero_total', novoValor !== 0 ? novoValor : "");
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={lidarComTodasAtualizacoes}>Atualizar</button>
        </div>
    )
}

export default DesignacaoList