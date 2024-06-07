from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import requests

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    ''')

    # Create Players table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Players (
        player_id INTEGER PRIMARY KEY,
        player_number INTEGER NOT NULL,
        player_position TEXT NOT NULL,
        name TEXT NOT NULL,
        nationality TEXT,
        date_of_birth DATE NOT NULL,
        country_of_birth TEXT,
        current_club TEXT NOT NULL,
        goals INTEGER DEFAULT 0,
        assists INTEGER DEFAULT 0,
        age INTEGER GENERATED ALWAYS AS (
            CAST((strftime('%Y', 'now') - strftime('%Y', date_of_birth)) AS INTEGER) - 
            (strftime('%m-%d', 'now') < strftime('%m-%d', date_of_birth))
        ) STORED
    );
    ''')

    # Create UserPlayers table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS UserPlayers (
        user_id INTEGER,
        player_id INTEGER,
        PRIMARY KEY (user_id, player_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
    );
    ''')

    conn.commit()
    conn.close()

init_db()

@app.route('/search', methods=['GET'])
def search_players():
    query = request.args.get('q') 
    url = f"https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p={query}&s=Soccer"
    
    try:
        response = requests.get(url)
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

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
        cursor.execute('INSERT INTO Users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        return jsonify({"message": "User saved successfully", "user_id": user_id}), 200
    except sqlite3.IntegrityError:
        return jsonify({"message": "Username already exists"}), 400
    except Exception as e:
        return jsonify({"message": "Error saving user", "error": str(e)}), 500

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
