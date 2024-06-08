import sqlite3

def get_db_connection():
    conn = sqlite3.connect('database.db', timeout=30)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """
    Creates the users table, the players table and the user's favourite table if they don't already exist
    IF THE DATABASE CHANGES EACH SECTION OF THIS CODE THAT CREATES A TABLE NEEDS TO ALSO CHANGE
    """
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

if __name__ == '__main__':
    init_db()
