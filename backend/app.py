from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['GET'])
def search_players():
    query = request.args.get('q')  # Get the search query from the frontend
    url = f"https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p={query}&s=Soccer"
    
    try:
        response = requests.get(url)
        data = response.json()
        # Extract the relevant data from the API response
        # and return it as JSON to the frontend
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
