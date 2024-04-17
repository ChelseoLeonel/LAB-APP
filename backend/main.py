from flask import request, jsonify
from config import app, db
from models import Escola


@app.route("/designacoes", methods=["GET"])
def get_designacoes():
    designacoes = Escola.query.all()
    json_designacoes = list(map(lambda x: x.to_json(), designacoes))
    return jsonify({"designacoes": json_designacoes})

@app.route("/cria_designacao", methods=["POST"])
def cria_designacao():
    designacao = request.json.get("designacao")
    funcionais = request.json.get("funcionais")
    nao_funcionais = request.json.get("nao_funcionais")
    numero_total = request.json.get("numero_total")

    if not designacao:
        return (
            jsonify({"mensagem": "Não podes deixar o campo de Designação vazio."}),
            400,
            )
    
    nova_designacao = Escola(designacao=designacao, funcionais=funcionais, nao_funcionais=nao_funcionais, numero_total=numero_total)
    try:
        db.session.add(nova_designacao)
        db.session.commit()
    except Exception as e:
        return jsonify({"mensagem": str(e)}), 400
    
    return jsonify({"mensagem": "Designação criada!"}), 201

@app.route("/atualiza_designacao/<int:user_id>", methods=["PATCH"])
def atualiza_designacao(user_id):
    designacao = Escola.query.get(user_id)

    if not designacao:
        return jsonify({"mensagem": "Designação não encotrada"})
    
    data = request.json
    designacao.designacao = data.get("designacao", designacao.designacao)
    designacao.funcionais = data.get("funcionais", designacao.funcionais)
    designacao.nao_funcionais = data.get("nao_funcionais", designacao.nao_funcionais)
    designacao.numero_total = data.get("numero_total", designacao.numero_total)

    db.session.commit()

    return jsonify({"mensagem": "Designação atualizada!"}), 200

@app.route("/apagar_designacao/<int:user_id>", methods=["DELETE"])
def apagar_designacao(user_id):
    designacao = Escola.query.get(user_id)

    if not designacao:
        return jsonify({"mensagem": "Designação não encontrada."}), 404
    
    db.session.delete(designacao)
    db.session.commit()

    return jsonify({"mensagem": "Designação apagada!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
