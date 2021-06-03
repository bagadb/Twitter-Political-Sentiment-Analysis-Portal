import pandas as pd
import tweepy
import matplotlib.pyplot as plt
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_recall_fscore_support
from sklearn.metrics import confusion_matrix
from sklearn.metrics import classification_report
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import precision_recall_fscore_support
from sklearn.metrics import classification_report
import joblib
import os
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

class PoliticalTweetClassifier:

    def __init__(self, mode = 'test'):
        self.mode = mode
        if mode == 'train':
            self.classifier = BernoulliNB()
            self.count_vectorizer = CountVectorizer()
            self.tfidf_vectorizer = TfidfTransformer()
        else:
            # print(os.getcwd())
            self.classifier = joblib.load("models/classifier.joblib")
            self.count_vectorizer = joblib.load("models/count_vectorizer.joblib")
            self.tfidf_vectorizer = joblib.load("models/tfidf_vectorizer.joblib")
        self.__label_mapper={0:'Non-political',1:'Political'}

    def __load_data__(self):
        political_df = pd.read_csv("political_tweets.tsv",sep='\t')
        non_political_df = pd.read_csv("non_political.tsv",sep='\t')
        political_df.rename(columns={'text':'Tweet'},inplace=True)
        non_political_df.rename(columns={'text':'Tweet'},inplace=True)
        #political_df.drop(columns=['Unnamed: 0'],inplace=True)
        #non_political_df.drop(columns=['Unnamed: 0'],inplace=True)
        self.df = political_df.append(non_political_df,ignore_index=True)
        self.df.dropna(inplace=True)

    def __preprocess__(self,tweets):
        if self.mode == 'train':
            tweets = self.count_vectorizer.fit_transform(tweets)
            tweets = self.tfidf_vectorizer.fit_transform(tweets)
            self.x_train,self.x_test,self.y_train,self.y_test = train_test_split(tweets,self.df.Label.values,train_size=0.8)
        else:
            self.tweet = self.count_vectorizer.transform(tweets)
            self.tweet = self.tfidf_vectorizer.transform(self.tweet)

    def train(self):
        # print("Fetching data")
        self.__load_data__()
        # print("Creating vectors")
        self.__preprocess__(self.df.Tweet)
        # print("Training classifier")
        #print(self.x_train,self.y_train)
        self.classifier.fit(self.x_train,self.y_train)
        train_accuracy = accuracy_score(self.y_train, self.classifier.predict(self.x_train))
        test_accuracy = accuracy_score(self.y_test, self.classifier.predict(self.x_test))
        report = classification_report(self.y_test, self.classifier.predict(self.x_test))
        # print(report)
        # print(train_accuracy,test_accuracy)
        # print("Storing model state to "+os.getcwd())
        joblib.dump(self.count_vectorizer,"count_vectorizer.joblib")
        joblib.dump(self.tfidf_vectorizer,"tfidf_vectorizer.joblib")
        joblib.dump(self.classifier,"classifier.joblib")

    def classify(self,tweet):
        tweet = [tweet]
        self.__preprocess__(tweet)
        prediction = self.classifier.predict(self.tweet)
        return self.__label_mapper[prediction[0]]
