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

        # Assuming the content is in JSON format, use .json() to extract it
        allData = allData_response.json()
        userData = userData_response.json()

        # Create DataFrames from the extracted data
        allDatadf = pd.DataFrame(allData)
        userDatadf = pd.DataFrame(userData)

        #return recommendationJSON
    
    except requests.exceptions.RequestException as e:
        print(f"Error in making HTTP request: {e}")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    