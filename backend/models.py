from config import db

# Here we defined the database schema

class Escola(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    designacao = db.Column(db.String(200), unique=True, nullable=False)
    funcionais = db.Column(db.Integer, unique=False, nullable=True)
    nao_funcionais = db.Column(db.Integer, unique=False, nullable=True)
    numero_total = db.Column(db.Integer, unique=False, nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "designacao": self.designacao,
            "funcionais": self.funcionais,
            "nao_funcionais": self.nao_funcionais,
            "numero_total": self.numero_total,
        }
