from flask import Blueprint,jsonify,request,make_response,json
from app import mysql


user_data = Blueprint('user_data',__name__)


@user_data.route("/read_books",methods=['POST'])
def postReadBook():
    try:
        username = request.json['username']
        book_id = request.json['book_id']
        rating = request.json['rating']
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                INSERT INTO read_books (book_id, user_id, rating)
                VALUES (%s, %s, %s)""", (book_id, user_id, rating))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message":"Succesfully Added!"}),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to add the book.'}),500
    



@user_data.route("/read_books/all/<username>",methods=['GET'])
def getAllReadBooks(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                SELECT JSON_OBJECT(
                        'id', rb.book_id,
                        'title', books.title,
                        'original_language', books.language_code,
                        'authors', books.authors,
                        'image_url', books.image_url,
                        'vote_average', books.average_rating,
                        'release_date', books.original_publication_year,
                        'genre1_name', genres1.genre_name,
                        'genre2_name', genres2.genre_name
                        ) AS json_data
                        FROM read_books AS rb
                        INNER JOIN books AS books ON books.book_id = rb.book_id
                        INNER JOIN book_genres AS genres1 ON books.genre_1 = genres1.genre_id
                        INNER JOIN book_genres AS genres2 ON books.genre_2 = genres2.genre_id
                        WHERE rb.user_id = %s""",(user_id,))
        row_data = cur.fetchall()
        cur.close()
        book_ids = [json.loads(item[0]) for item in row_data]
        return jsonify(book_ids),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to reach the books.'}),500
    
    
@user_data.route("/read_books/<username>/<book_id>",methods=['DELETE'])
def deleteReadBook(username,book_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                DELETE FROM read_books WHERE user_id = %s AND book_id = %s
                """,(user_id,book_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message":"Succesfully Removed!"}),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to remove the book.'}),500



@user_data.route("/read_books/<username>",methods=['GET'])
def getReadBookIds(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                SELECT JSON_OBJECT('book_id',book_id) AS json_data FROM read_books WHERE user_id = %s
                """,(user_id,))
        row_data = cur.fetchall()
        cur.close()
        book_ids = [json.loads(item[0]) for item in row_data]
        return jsonify(book_ids),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to reach the books.'}),500

    

@user_data.route("/watched_movies",methods=['POST'])
def postWatchedMovie():
    try:
        username = request.json['username']
        movie_id = request.json['movie_id']
        rating = request.json['rating']
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                INSERT INTO watched_movies (movie_id, user_id, rating)
                VALUES (%s, %s, %s)""", (movie_id, user_id, rating))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message":"Succesfully Added!"}),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to add the movie.'}),500
    
    
@user_data.route("/watched_movies/<username>/<movie_id>",methods=['DELETE'])
def deleteWatchedMovie(username,movie_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                DELETE FROM watched_movies WHERE user_id = %s AND movie_id = %s
                """,(user_id,movie_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message":"Succesfully Removed!"}),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to remove the movie.'}),500



@user_data.route("/watched_movies/<username>",methods=['GET'])
def getWatchedMovieIds(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                SELECT JSON_OBJECT('movie_id',movie_id) AS json_data FROM watched_movies WHERE user_id = %s
                """,(user_id,))
        row_data = cur.fetchall()
        cur.close()
        movie_ids = [json.loads(item[0]) for item in row_data]
        return jsonify(movie_ids),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to reach the movies.'}),500
    



@user_data.route("/watched_series",methods=['POST'])
def postWatchedSerie():
    try:
        username = request.json['username']
        serie_id = request.json['serie_id']
        rating = request.json['rating']
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                INSERT INTO watched_series (serie_id, user_id, rating)
                VALUES (%s, %s, %s)""", (serie_id, user_id, rating))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message":"Succesfully Added!"}),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to add the serie.'}),500
    
    
@user_data.route("/watched_series/<username>/<serie_id>",methods=['DELETE'])
def deleteWatchedSerie(username,serie_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                DELETE FROM watched_series WHERE user_id = %s AND serie_id = %s
                """,(user_id,serie_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message":"Succesfully Removed!"}),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to remove the serie.'}),500



@user_data.route("/watched_series/<username>",methods=['GET'])
def getWatchedSerieIds(username):
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
                SELECT id FROM users WHERE username = %s""",(username,))
        user_id = cur.fetchone()[0]
        cur.execute("""
                SELECT JSON_OBJECT('serie_id',serie_id) AS json_data FROM watched_series WHERE user_id = %s
                """,(user_id,))
        row_data = cur.fetchall()
        cur.close()
        serie_ids = [json.loads(item[0]) for item in row_data]
        return jsonify(serie_ids),200
    except Exception as error:
        print(error)
        return jsonify({'message':'An error occurred while trying to reach the movies.'}),500