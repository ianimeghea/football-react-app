import sqlite3
from database import get_db_connection

def save_user_favorite(user_id, player_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT OR IGNORE INTO UserPlayers (user_id, player_id)
        VALUES (?, ?)
    ''', (user_id, player_id))
    
    conn.commit()
    conn.close()

