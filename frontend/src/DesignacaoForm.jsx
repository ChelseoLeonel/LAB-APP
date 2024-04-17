import { useState } from 'react'

const DesignacaoForm = ({ designacaoExistente = {}, atualizarCallback }) => {
    const [designacao, setDesignacao] = useState(designacaoExistente.designacao || "");
    const [funcionais, setFuncionais] = useState(designacaoExistente.funcionais || "");
    const [naoFuncionais, setNaoFuncionais] = useState(designacaoExistente.naoFuncionais || "");
    const [numeroTotal, setNumeroTotal] = useState(designacaoExistente.numeroTotal || "");

    const atualizando = Object.entries(designacaoExistente).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            designacao,
            funcionais,
            naoFuncionais,
            numeroTotal
        }
        const url = "http://127.0.0.1:5000/" + (atualizando ? `atualiza_designacao/${designacaoExistente.id}` : "cria_designacao")
        const opcoes = {
            method: atualizando ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, opcoes)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            atualizarCallback()
        }
    }

    return (
        <form onSubmit={onSubmit} className='row m-6'>
            <h4>Criar Designação</h4>
            <div className='col-6'>
                <label className='form-label' htmlFor="designacao">Designacao:</label>
                <input className='form-control' type="text"
                    id='designacao'
                    value={designacao}
                    onChange={(e) => setDesignacao(e.target.value)}
                />
            </div>
            <div className='col-6'>
                <label className='form-label' htmlFor="funcionais">Funcionais:</label>
                <input className='form-control' type="number"
                    id='funcionais'
                    value={funcionais}
                    onChange={(e) => setFuncionais(e.target.value)}
                />
            </div>
            <div className='col-6'>
                <label className='form-label' htmlFor="naoFuncionais">Não Funcionais:</label>
                <input className='form-control' type="number"
                    id='naoFuncionais'
                    value={naoFuncionais}
                    onChange={(e) => setNaoFuncionais(e.target.value)}
                />
            </div>
            <div className='col-6'>
                <label className='form-label' htmlFor="numeroTotal">Número total:</label>
                <input className='form-control' type="number"
                    id='numeroTotal'
                    value={numeroTotal}
                    onChange={(e) => setNumeroTotal(e.target.value)}
                />
            </div>
            <button className='btn m-3 btn-dark' type='submit'>{atualizando ? "Atualiza" : "Cria"} Designação</button>
        </form>
    );
};

export default DesignacaoForm;