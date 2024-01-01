from flask import Blueprint,jsonify,request,make_response
from app import mysql

# Artık example_module kullanabilirsiniz


recom = Blueprint('recom',__name__)
            
@recom.route('/recommendation/<tableName>/<userId>',methods=['GET'])
def getRecommendation(tableName,userId):
    if request.method == 'GET':
        try:
            responseData = makeRecommendation(tableName,userId)
            return responseData,200
        except Exception as error:
            print(error)
            return error,400
        

@recom.route('/books',methods=['GET'])
def books():
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            
            cur.execute("SELECT books.book_id, books.title, books.authors, "
                        "genres1.genre_name AS genre1_name, "
                        "genres2.genre_name AS genre2_name "
                        "FROM books "
                        "INNER JOIN book_genres AS genres1 ON books.genre_1 = genres1.genre_id "
                        "INNER JOIN book_genres AS genres2 ON books.genre_2 = genres2.genre_id")
            all_data = cur.fetchall()
            cur.close()
            return jsonify(all_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/movies',methods=['GET'])
def movies():
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            
            cur.execute("SELECT movies.id, movies.title, "
                        "genres1.genre_name AS genre1_name, "
                        "genres2.genre_name AS genre2_name "
                        "FROM movies "
                        "INNER JOIN movie_genres AS genres1 ON movies.genre_1 = genres1.genre_ids "
                        "INNER JOIN movie_genres AS genres2 ON movies.genre_2 = genres2.genre_ids")
            all_data = cur.fetchall()
            cur.close()
            return jsonify(all_data),200
        except Exception as error:
            print(error)
            return error,400

@recom.route('/series',methods=['GET'])
def series():
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            
            cur.execute("SELECT series.id, series.name, "
                        "genres1.genre_name AS genre1_name, "
                        "genres2.genre_name AS genre2_name "
                        "FROM series "
                        "INNER JOIN series_genres AS genres1 ON series.genre_1 = genres1.genre_ids "
                        "INNER JOIN series_genres AS genres2 ON series.genre_2 = genres2.genre_ids")
            all_data = cur.fetchall()
            cur.close()
            return jsonify(all_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/readbooks/<userid>',methods=['GET'])
def readBooks(userId):
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM readBooks WHERE id = %s",userId)
            user_data = cur.fetchall()
            cur.close()
            return jsonify(user_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/watchedMovies/<userid>',methods=['GET'])
def watchedMovies(userId):
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM watchedMovies WHERE id = %s",userId)
            user_data = cur.fetchall()
            cur.close()
            return jsonify(user_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/watchedSeries/<userid>',methods=['GET'])
def watchedSeries(userId):
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM watchedSeries WHERE id = %s",userId)
            user_data = cur.fetchall()
            cur.close()
            return jsonify(user_data),200
        except Exception as error:
            print(error)
            return error,400