from flask import Blueprint,jsonify,request,make_response,json
from app import mysql


series = Blueprint('series',__name__)

@series.route('/',methods=['GET'])
def getSeries():
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
            return jsonify({"message":error}),400

