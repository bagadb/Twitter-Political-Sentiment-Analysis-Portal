#
# scraping.py number-of-tweets query-type(keyword,hashtag,username) query-string
# 0 = keyword 1 = hashtag 2 = username
#
#
#
#

# Import Libraries

import sys
import os
import json

import tweepy
import pandas as pd

#Keys for Authentication

f = open('../../keys.json')

keys = json.load(f)

consumer_key = keys["TPSAP_CK"]
consumer_secret = keys["TPSAP_CS"]
access_token = keys["TPSAP_AT"]
access_secret = keys["TPSAP_AS"]

#Define Query
print("---------------------------------------------------------------------------")

if (len(sys.argv) < 3):
    print("Not enough parameters")
    sys.exit()

number_of_tweets = 0

query_type = 0

number_of_tweets = sys.argv[1]

query_type = int(sys.argv[2])

query_string = sys.argv[3]

def query_dictionary(query_number):
    switcher = {
        0: "keyword",
        1: "hashtag",
        2: "username",
    }
    return switcher.get(query_number, "keyword")

query = "Scraping '" + number_of_tweets + "' Tweets\nWith QUery type '" + query_dictionary(query_type)+ "' \nand the query string is '" + query_string + "'."

print(query)

#Authenticate and Initiate Cursor

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token,access_secret)
api = tweepy.API(auth)

#Cursor Retrieves Tweets

print("---------------------------------------------------------------------------")

if query_type == 0:
    #API CALL FOR KEYWORD METHOD
    cursor= tweepy.Cursor(api.search, q=query_string,tweet_mode="extended", lang = 'en').items(int(number_of_tweets))
elif query_type == 1:
    #API CALL FOR HASHTAG METHOD
    cursor= tweepy.Cursor(api.search, q= "#" + query_string ,tweet_mode="extended", lang = 'en').items(int(number_of_tweets))
elif query_type == 2:
    #API CALL FOR USERNAME METHOD
    cursor = tweepy.Cursor(api.user_timeline, id=query_string,tweet_mode="extended").items(int(number_of_tweets))


#Store Tweets in Dataframe and then to tsv file

tweets = []

for i in cursor:
    tweets.append(i.full_text)

for tweet in tweets:
    print(tweet)
    print("\n")

#DataFrame stores data gathered

df = pd.DataFrame({"text" : tweets})
df.to_csv("tweets.tsv", sep="\t",index=False)
