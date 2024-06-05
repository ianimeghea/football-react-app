from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

players = [
    {"id": 1, "name": "Lionel Messi", "team": "PSG"},
    {"id": 2, "name": "Cristiano Ronaldo", "team": "Manchester United"},
    {"id": 3, "name": "Neymar Jr.", "team": "PSG"},
]
@app.route('/api/players', methods=['GET'])
def get_players():
    return jsonify(players)


if __name__ == '__main__':
    app.run(debug=True)