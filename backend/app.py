from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
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
CORS(app)


from auth.view import auth
app.register_blueprint(auth,url_prefix="/auth")

from recommendation.view import recom
app.register_blueprint(recom,url_prefix="/recom")

from movies.view import movies
app.register_blueprint(movies,url_prefix="/movies")

from books.view import books
app.register_blueprint(books,url_prefix="/books")

from series.view import series
app.register_blueprint(series,url_prefix="/series")

from user_data.view import user_data
app.register_blueprint(user_data,url_prefix="/user_data")
