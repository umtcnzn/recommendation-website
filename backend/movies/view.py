from flask import Blueprint,jsonify,request,make_response,json
from app import mysql


movies = Blueprint('movies',__name__)

@movies.route('/',methods=['GET'])
def getMovies():
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
            return jsonify({"message":error}),400

