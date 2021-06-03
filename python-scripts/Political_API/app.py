from flask import Flask
from flask_restful import Api
from resources.classifier_api import Classifier

from flask_cors import CORS


app= Flask(__name__)

CORS(app)

api= Api(app)

api.add_resource(Classifier, '/predict')

if __name__ == '__main__':
    app.run()

# Example command on terminal
# curl -i -X POST localhost:5000/predict -H "Content-Type: application/json" -d '{"tweet":"Indian Prime Minister Narendra Modi"}'
