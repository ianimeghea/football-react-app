from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import requests
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db', timeout=30)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS Users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
        ''')

        cursor.execute('''
        CREATE TABLE IF NOT EXISTS Players (
            player_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            team TEXT NOT NULL,
            position TEXT NOT NULL
        );
        ''')

        cursor.execute('''
        CREATE TABLE IF NOT EXISTS UserPlayers (
            user_id INTEGER,
            player_id INTEGER,
            PRIMARY KEY (user_id, player_id),
            FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
        );
        ''')

init_db()

def get_user_id(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT user_id FROM Users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return user['user_id']
    return None

@app.route('/search', methods=['GET'])
def search_players():
    query = request.args.get('q')
    url = f"https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p={query}&s=Soccer"
    
    try:
        response = requests.get(url)
        data = response.json()

        if 'player' in data and data['player'] is not None:
            return jsonify(data)
        return jsonify({'message': 'No players found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/players', methods=['GET'])
def get_players():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Players')
    players = cursor.fetchall()
    conn.close()

    return jsonify([dict(player) for player in players]), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO Users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 200
    except sqlite3.IntegrityError:
        return jsonify({"message": "Username already exists"}), 400
    except Exception as e:
        return jsonify({"message": "Error registering user", "error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM Users WHERE username = ? AND password = ?', (username, password))
        user = cursor.fetchone()
        conn.close()

        if user:
            return jsonify({"message": "Login successful", "user_id": user['user_id']}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 400
    except Exception as e:
        return jsonify({"message": "Error logging in", "error": str(e)}), 500

@app.route('/api/users/<username>/players', methods=['GET'])
def get_user_players(username):
    user_id = get_user_id(username)
    if user_id is None:
        return jsonify({"message": "User not found"}), 404
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT Players.* 
        FROM Players 
        JOIN UserPlayers ON Players.player_id = UserPlayers.player_id 
        WHERE UserPlayers.user_id = ?
    ''', (user_id,))
    players = cursor.fetchall()
    conn.close()

    return jsonify([dict(player) for player in players]), 200

@app.route('/api/users/<username>/favorite_players', methods=['POST'])
def add_favorite_player(username):
    logging.debug(f"Adding favorite player for username: {username}")
    user_id = get_user_id(username)
    if user_id is None:
        logging.debug(f"User not found for username: {username}")
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    logging.debug(f"Received data: {data}")
    player_id = data.get('player_id')
    name = data.get('name')
    team = data.get('team')
    position = data.get('position')

    if not player_id or not name or not team or not position:
        return jsonify({"message": "Player ID, name, team, and position are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT OR IGNORE INTO Players (player_id, name, team, position)
            VALUES (?, ?, ?, ?)
        ''', (player_id, name, team, position))
        
        cursor.execute('INSERT INTO UserPlayers (user_id, player_id) VALUES (?, ?)', (user_id, player_id))
        
        conn.commit()
        conn.close()
        logging.debug(f"Player {name} added to favorites for username: {username}")
        return jsonify({"message": "Player added to favorites"}), 200
    except sqlite3.IntegrityError:
        return jsonify({"message": "Player already in favorites"}), 400
    except Exception as e:
        logging.error(f"Error adding player to favorites: {e}")
        return jsonify({"message": "Error adding player to favorites", "error": str(e)}), 500

@app.route('/api/users/<username>/favorite_players', methods=['DELETE'])
def remove_favorite_player(username):
    user_id = get_user_id(username)
    if user_id is None:
        logging.debug(f"User not found for username: {username}")
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    logging.debug(f"Received data for removal: {data}")
    player_id = data.get('player_id')

    if not player_id:
        logging.debug("Player ID is required but not provided")
        return jsonify({"message": "Player ID is required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM UserPlayers WHERE user_id = ? AND player_id = ?', (user_id, player_id))
        rows_affected = cursor.rowcount
        conn.commit()
        conn.close()

        if rows_affected == 0:
            logging.debug(f"No player found with player_id: {player_id} for user_id: {user_id}")
            return jsonify({"message": "Player not found in favorites"}), 404

        logging.debug(f"Player {player_id} removed from favorites for user {user_id}")
        return jsonify({"message": "Player removed from favorites"}), 200
    except Exception as e:
        logging.error(f"Error removing player from favorites: {e}")
        return jsonify({"message": "Error removing player from favorites", "error": str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM Users')
    users = cursor.fetchall()
    conn.close()

    return jsonify([dict(user) for user in users]), 200

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
