import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os
import requests

load_dotenv()

def makeRecommendation(tableName,userId):
    
    try:
        if tableName == 'books':
            allData_response = requests.get('http://localhost/books')
            userData_response = requests.get('http://localhost/readBooks/'+userId)

        elif tableName == 'movies':
            allData_response = requests.get('http://localhost/movies')
            userData_response = requests.get('http://localhost/watchedMovies/'+userId)

        elif tableName == 'series':
            userData_response = requests.get('http://localhost/series')
            allData_response = requests.get('http://localhost/watchedSeries/'+userId)

        
        return recommendationJSON
    
    except requests.exceptions.RequestException as e:
        print(f"Error in making HTTP request: {e}")
        raise e

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise e
