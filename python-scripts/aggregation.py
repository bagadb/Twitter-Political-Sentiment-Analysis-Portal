import pandas as pd

import json

aggregationData = {
    "ntrl" : 0,
    "slght_pst" : 0,
    "mdrt_pst" : 0,
    "mst_pst" : 0,
    "ovwhm_pst" : 0,
    "slght_ngt" : 0,
    "mdrt_ngt" : 0,
    "mst_ngt" : 0,
    "ovwhm_ngt" : 0
}

ntrl = 0
slght_pst = 0
mdrt_pst = 0
mst_pst = 0
ovwhm_pst = 0
slght_ngt = 0
mdrt_ngt = 0
mst_ngt = 0
ovwhm_ngt = 0

f = open('./jsondata/sentimentscores.json',)

data=json.load(f)

f.close()

arrayOfSentimentScores = []

for i in data:
    arrayOfSentimentScores.append(i)

for i in arrayOfSentimentScores:
    if i > 0.0:
        if i <= 0.25:
            slght_pst=slght_pst + 1
        elif i <= 0.5 and i > 0.25:
            mdrt_pst = mdrt_pst + 1
        elif i <= 0.75 and i > 0.5:
            mst_pst = mst_pst + 1
        elif i <= 1.00 and i > 0.75:
            ovwhm_pst = ovwhm_pst + 1
    elif i < 0.0:
        if i >= -0.25:
            slght_ngt = slght_ngt + 1
        elif i >= -0.5 and i < -0.25:
            mdrt_ngt = mdrt_ngt + 1
        elif i >= -0.75 and i < -0.5:
            mst_ngt = mst_ngt + 1
        elif i >= 1.00 and i < 0.75:
            ovwhm_ngt = ovwhm_ngt + 1
    else:
        ntrl = ntrl + 1
    
aggregationData["ntrl"] = ntrl
aggregationData["slght_pst"] = slght_pst
aggregationData["mdrt_pst"] = mdrt_pst
aggregationData["mst_pst"] = mst_pst
aggregationData["ovwhm_pst"] = ovwhm_pst
aggregationData["slght_ngt"] = slght_ngt
aggregationData["mdrt_ngt"] = mdrt_ngt
aggregationData["mst_ngt"] = mst_ngt
aggregationData["ovwhm_ngt"] = ovwhm_ngt

print(aggregationData)

with open('jsondata/aggregation.json', 'w') as json_file:
  json.dump(aggregationData, json_file)

json_file.close()

f = open('./jsondata/classifierscores.json',)

data=json.load(f)

arrayOfClassifierScores = []

pieChartData = {
    "pol" : 0,
    "nonpol" : 0
}


for i in data:
    if i == "Political":
        pieChartData["pol"] += 1
    else:
        pieChartData["nonpol"] += 1       

print(pieChartData)

with open('jsondata/polnonpol.json', 'w') as json_file:
  json.dump(pieChartData, json_file)

json_file.close()

