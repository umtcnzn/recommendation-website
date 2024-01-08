import json
import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os
import requests

load_dotenv()

def makeRecommendation(tableName,userId):
    try:
        if tableName == 'books':
            allData_response = requests.get('http://127.0.0.1:5000/recom/books')
            userData_response = requests.get(f'http://127.0.0.1:5000/recom/readbooks/{userId}')

        elif tableName == 'movies':
            allData_response = requests.get('http://127.0.0.1:5000/recom/movies')
            userData_response = requests.get(f'http://127.0.0.1:5000/recom/watchedMovies/{userId}')

        elif tableName == 'series':
            userData_response = requests.get('http://127.0.0.1:5000/recom/series')
            allData_response = requests.get(f'http://127.0.0.1:5000/recom/watchedSeries/{userId}')
        print(userData_response)
        #turn json data to dataFrame
        userData_json = userData_response.json()
        allData_json = allData_response.json()

        # Turn JSON data to DataFrames
        userData = pd.DataFrame.from_dict(userData_json)
        allData = pd.DataFrame.from_dict(allData_json)
        
        #copy allData and drop 'title'
        allDataCopy = allData.copy()
        allDataCopy = allDataCopy[['id','genre_1','genre_2']] #id, genre_1, genre_2
        
        #merge userData with allDataCopy for taking genre ids
        userData_withGenre = userData.merge(allDataCopy, how='inner', on = 'id')
        
        #drop 'rating' for userGenreTable
        userGenreTable = userData_withGenre.drop('rating',axis=1)
        
        userGenreTable = BinaryGenre(userGenreTable) #here
        
        #prepare weightedGenre table
        userWeightedGenre = userGenreTable.copy()

        userWeightedGenre.loc[:, userWeightedGenre.columns != 'id'] = userWeightedGenre.loc[:, userWeightedGenre.columns != 'id'].apply(lambda x: userData['rating'] * x)
        
        #create userProfile table for showing tastes of user
        userProfile = userWeightedGenre.copy()
        userProfile.loc['Total'] = userProfile.sum()
        userProfile = userProfile.loc[['Total']].drop('id',axis=1).reset_index(drop=True)
        
        #normalize userProfile Table
        userProfileNormalize = userProfile.copy()

        for col in userProfile.columns:
            userProfileNormalize[col] = (userProfileNormalize[col] / userProfileNormalize.loc[0].sum()).round(2)

        
        allDataCopy = BinaryGenre(allDataCopy)
        
        for col in allDataCopy.columns:
            if col != 'id' and col not in userProfileNormalize.columns:
                allDataCopy = allDataCopy.drop(col, axis=1)
                
        for col in allDataCopy.columns:
            if col in userProfileNormalize.columns:
                allDataCopy[col] = allDataCopy[col].apply(lambda x: x * userProfileNormalize[col])
                            
        allDataCopy['result'] = allDataCopy.drop(columns='id').sum(axis=1)
        
        matching_indices = allDataCopy[allDataCopy['id'].isin(userData['id'])].index
        allDataCopy = allDataCopy.drop(matching_indices)
        
        allDataCopy = allDataCopy.sort_values(by='result',ascending=False)
        allDataCopy = allDataCopy[['id','result']]
        allDataCopy = allDataCopy.head(20).reset_index(drop=True)
        
        allDataCopy = allDataCopy.merge(allData,how='inner',on='id').drop('result',axis=1)
        
        return json.loads(allDataCopy.to_json(orient='records'))
    
    except requests.exceptions.RequestException as e:
        print(f"Error in making HTTP request: {e}")
        raise e

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        raise e

def BinaryGenre(df):
    
    all_genres = df[['genre_1', 'genre_2']].stack().dropna().unique()

    for genre_id in all_genres:
       df[f'genre_{int(genre_id)}_id'] = np.where((df['genre_1'] == genre_id) | (df['genre_2'] == genre_id), 1, 0)

    df = df.drop(['genre_1','genre_2'],axis=1)
    
    return df