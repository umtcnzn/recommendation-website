from flask import Blueprint,jsonify,request,make_response,json
from app import mysql


books = Blueprint('books',__name__)

@books.route('/',methods=['GET'])
def getBooks():
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
            return jsonify({"message":error}),400

