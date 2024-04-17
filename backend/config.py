from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# CORS stands for cross origin request
# it allows us to send a request to this backend from a different URL
# we use cors to make our frontend communicate with our backend

# initialize the flask application
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)