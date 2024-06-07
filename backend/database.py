import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db')
    return conn

def init_db():
    """
    Creates the users table, the players table and the user's favourite table if they don't already exist
    IF THE DATABASE CHANGES EACH SECTION IF THIS CODE THAT CREATES A TABLE NEEDS TO ALSO CHANGE
    """
    conn = get_db_connection()
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

if __name__ == '__main__':
    init_db()

