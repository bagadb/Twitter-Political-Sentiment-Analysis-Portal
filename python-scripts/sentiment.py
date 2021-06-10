import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

import json

sia= SentimentIntensityAnalyzer()				# Create SentimentIntensityAnalyzer object
stop_words= set(stopwords.words('english'))		# Get stopwords from nltk

def calculate_sentiment(comment):
    word_tokens= word_tokenize(comment)			# Tokenize the sentence
    filtered_sentence= [words for words in word_tokens if not words in stop_words]	# Remove stop words from the sentence
    filtered_sentence= ' '.join(filtered_sentence)	# Join these sentences on space.
    #print("Statement after pre-processing is" ,filtered_sentence)
    score= sia.polarity_scores(filtered_sentence)	# Calculate sentiment score of the sentence
    #print("Comment: ", comment)
    #print("Score: ", score['compound'])
    return score['compound']# score is a dictionary. Returning only compound score i.e average

# Takes JSON array of tweets
# Outputs JSON array of sentiment scores

f = open('./jsondata/tweets.json',)

data=json.load(f)

arrayOfSentimentScores = []

for i in data:
    arrayOfSentimentScores.append(calculate_sentiment(i[0]))

for i in arrayOfSentimentScores:
    print(i)

with open('./jsondata/sentimentscores.json', 'w') as json_file:
  json.dump(arrayOfSentimentScores, json_file)

json_file.close()

f.close()