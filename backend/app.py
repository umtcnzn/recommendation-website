from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_httpauth import HTTPBasicAuth
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB")

mysql = MySQL(app)
auth = HTTPBasicAuth()

from auth.view import auth
CORS(auth)
app.register_blueprint(auth,url_prefix="/auth")





