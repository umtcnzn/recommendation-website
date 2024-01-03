import json
from flask import Blueprint,jsonify,request,make_response
from app import mysql
from .recommendSystem import makeRecommendation
# Artık example_module kullanabilirsiniz

recom = Blueprint('recom',__name__)
            
@recom.route('/recommendation/<tableName>/<userId>',methods=['GET'])
def getRecommendation(tableName,userId):
    if request.method == 'GET':
        try:
            responseData = makeRecommendation(tableName,userId)
            print(responseData)
            return jsonify(responseData),200
        except Exception as error:
            print(error)
            return error,400
        

@recom.route('/books',methods=['GET'])
def books():
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            
            cur.execute("""SELECT JSON_OBJECT(
                            'id', books.book_id,
                            'title', books.title,
                            'original_language', books.language_code,
                            'authors', books.authors,
                            'image_url', books.image_url,
                            'vote_average', books.average_rating,
                            'release_date', books.original_publication_year,
                            'genre_1', books.genre_1,
                            'genre_2', books.genre_2,
                            'genre1_name', genres1.genre_name,
                            'genre2_name', genres2.genre_name) AS json_data
                        FROM books
                        INNER JOIN book_genres AS genres1 ON books.genre_1 = genres1.genre_id
                        INNER JOIN book_genres AS genres2 ON books.genre_2 = genres2.genre_id """)
       
            all_data = cur.fetchall()
            cur.close()
            
            formatted_data = [json.loads(item[0]) for item in all_data]
            
            return jsonify(formatted_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/movies',methods=['GET'])
def movies():
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            
            cur.execute("""SELECT JSON_OBJECT(
                            'id', movies.id,
                            'title', movies.title,
                            'original_language', movies.original_language,
                            'overview', movies.overview,
                            'image_url', movies.poster_path,
                            'vote_average', movies.vote_average,
                            'release_date', movies.release_date,
                            'genre_1', movies.genre_1,
                            'genre_2', movies.genre_2,
                            'genre1_name', genres1.genre_name,
                            'genre2_name', genres2.genre_name) AS json_data
                        FROM movies
                        INNER JOIN movie_genres AS genres1 ON movies.genre_1 = genres1.genre_ids
                        INNER JOIN movie_genres AS genres2 ON movies.genre_2 = genres2.genre_ids """)
            
            all_data = cur.fetchall()
            cur.close()
            
            formatted_data = [json.loads(item[0]) for item in all_data]
            
            return jsonify(formatted_data),200
        except Exception as error:
            print(error)
            return error,400

@recom.route('/series',methods=['GET'])
def series():
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            
            cur.execute("""SELECT JSON_OBJECT(
                            'id', series.id,
                            'title', series.name,
                            'original_language', series.original_language,
                            'overview', series.overview,
                            'image_url', series.poster_path,
                            'vote_average', series.vote_average,
                            'release_date', series.first_air_date,
                            'genre_1', series.genre_1,
                            'genre_2', series.genre_2,
                            'genre1_name', genres1.genre_name,
                            'genre2_name', genres2.genre_name) AS json_data
                        FROM series
                        INNER JOIN series_genres AS genres1 ON series.genre_1 = genres1.genre_ids
                        INNER JOIN series_genres AS genres2 ON series.genre_2 = genres2.genre_ids """)
            
            all_data = cur.fetchall()
            cur.close()
            
            formatted_data = [json.loads(item[0]) for item in all_data]
            
            return jsonify(formatted_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/readbooks/<userid>',methods=['GET'])
def readBooks(userid):
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute("""SELECT JSON_OBJECT(
                    'id', book_id,
                    'rating', rating) AS json_data
                FROM read_books WHERE id = %s""", (userid,))
            user_data = cur.fetchall()
            cur.close()
            
            formatted_data = [json.loads(item[0]) for item in user_data]
            
            return jsonify(formatted_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/watchedMovies/<userid>',methods=['GET'])
def watchedMovies(userid):
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute("""SELECT JSON_OBJECT(
                    'id', movie_id,
                    'rating', rating) AS json_data
                FROM watched_movies WHERE id = %s""", (userid,))
            
            user_data = cur.fetchall()
            cur.close()
            
            formatted_data = [json.loads(item[0]) for item in user_data]
            
            return jsonify(formatted_data),200
        except Exception as error:
            print(error)
            return error,400
            
@recom.route('/watchedSeries/<userid>',methods=['GET'])
def watchedSeries(userid):
    if request.method == 'GET':
        try:
            cur = mysql.connection.cursor()
            cur.execute("""SELECT JSON_OBJECT(
                    'id', serie_id,
                    'rating', rating) AS json_data
                FROM watched_series WHERE id = %s""", (userid,))
            user_data = cur.fetchall()
            cur.close()
            
            formatted_data = [json.loads(item[0]) for item in user_data]
            
            return jsonify(formatted_data),200
        except Exception as error:
            print(error)
            return error,400