import pandas as pd
import pymysql
import numpy as np
from dotenv import load_dotenv
import os

load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DB = os.getenv("MYSQL_DB")

df = pd.read_csv('bookGenres.csv', delimiter=',') 
df = df.replace({np.nan: None})

mydb = pymysql.connect( 
    host=MYSQL_HOST, 
    user=MYSQL_USER, 
    password=MYSQL_PASSWORD, 
    database=MYSQL_DB 
)
mycursor = mydb.cursor() 
mycursor.execute("CREATE TABLE book_genres (genre_id INT AUTO_INCREMENT PRIMARY KEY, genre_name VARCHAR(500))") #genre_genre_ids,genre_name
for index, row in df.iterrows(): 
 sql = "INSERT INTO book_genres (genre_id,genre_name) VALUES (%s, %s)" 
 val = (row['genre_id'], row['genre_name']) 
 mycursor.execute(sql, val) 
mydb.commit() 
mydb.close() 