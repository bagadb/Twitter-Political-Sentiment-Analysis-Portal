from flask import request
from flask_restful import Resource
from http import HTTPStatus
from models.political_tweet_classifier import PoliticalTweetClassifier

import json


class Classifier(Resource):

    _classifier= PoliticalTweetClassifier()

    def get(self):
        f = open('../../jsondata/tweets.json',)

        data=json.load(f)

        arrayofClassifierScores = []

        for i in data:
          arrayofClassifierScores.append(Classifier._classifier.classify(i[0]))
        
        for i in arrayofClassifierScores:
            print(i)
        
        with open('../../jsondata/classifierscores.json', 'w') as json_file:
            json.dump(arrayofClassifierScores, json_file)
        
        
        json_file.close()

        f.close()

        return(json.dumps(arrayofClassifierScores))