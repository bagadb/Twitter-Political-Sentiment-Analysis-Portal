#
# scraping.py number-of-tweets query-type(keyword,hashtag,username) query-string
# 0 = keyword 1 = hashtag 2 = username
#
#
#
#

# Import Libraries
import sys
import tweepy
import pandas as pd

#Keys for Authentication

consumer_key ="5hF57DZyQoNet7KufOZBRy6l3"
consumer_secret= "mcyIVlqjTnhyHf7eNbYJDFVtvd7Aa6sQ9juVikhR669i7IeEuH"
access_token = "405425239-OL0bs4yCgUvoWIbkuVVz2EMOZAVApWwAOjuqb2jm"
access_secret = "8JQhxIV2IHcQdm2I1847FkSy8h8XEwQGiUSJy8u1lXepU"

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

sys.exit()
#DataFrame stores data gathered

df = pd.DataFrame({"text" : tweets})
df.to_csv("tweets.tsv", sep="\t",index=False)