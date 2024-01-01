from flask import Blueprint,jsonify,request,make_response
from app import mysql
import jwt
import datetime
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()


auth = Blueprint('auth',__name__)
SECRET_KEY = os.getenv("SECRET_KEY")

@auth.route('/register',methods=['POST'])
def register():
    if request.method == "POST":
        try:
            username = request.json['username']
            email = request.json['email']
            password = request.json['password']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO users(username,email,password) VALUES(%s,%s,%s)",(username,email,password))
            mysql.connection.commit()
            cur.close()
            return jsonify({"message":f"User '{username}' created successfully"}),200
        except Exception as e:
            if "Duplicate entry" in str(e):
                return jsonify({'message': 'Username or Email already exists'}), 400
            else:
                return jsonify({'message': 'An error occurred while adding user'}), 500
    return jsonify({"message":"Invalid Request Method"}),405



@auth.route('/login',methods=['POST'])
def login():
    if request.method == 'POST':
        try:
            email = request.json['email']
            password = request.json['password']
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM users WHERE email = %s AND password = %s",(email,password))
            user = cur.fetchall()
            if user == ():
                return jsonify({"message":"Email or Password is incorrect"}),401
            json_data = []
            columns = [column[0] for column in cur.description]
            cur.close()
            for row in user:
                json_data.append(dict(zip(columns, row)))
            json_user = json_data[0]
            token = jwt.encode(payload={'username':json_user['username'],'email':json_user['email'],'imgUrl':json_user['imgUrl'],
                                'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},algorithm="HS256",key=SECRET_KEY)
            return jsonify({"token":token,"message":f"'{json_user['username']}' succesfully logged!"}),200
        except Exception as error:
            return {'message': f'{str(error)}'},400


@auth.route('/protected', methods=['GET'])
def protected():
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(" ")[1]
    if not token:
        return jsonify({'message': 'Missing Token!'}), 401
    try:
        data = jwt.decode(jwt=token,key=SECRET_KEY,algorithms=["HS256"])
        return jsonify({'username':data['username'],'email':data['email'],'imgUrl':data['imgUrl']})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token Expired!'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid Token!'}), 401
    



