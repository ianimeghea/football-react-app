import requests
import sqlite3
from database import get_db_connection

def fetch_players_from_api():
    """
    Gets the players from the API in order to send them to the database
    Uses the url of the API as a variable
    Returns: The json response from the API
    """
    url = ''  #Url aici
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  
    else:
        return []

def insert_players_to_db(players):
    """
    Sends the players from the API to the database without creating duplicates
    Param: players which are a dictionary
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    for player in players:
        cursor.execute('''
            INSERT OR IGNORE INTO Players (player_id, player_number, player_position, name, nationality, date_of_birth, country_of_birth, current_club, goals, assists)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (player['id'], player['number'], player['position'], player['name'], player['nationality'], player['date_of_birth'], player['country_of_birth'], player['current_club'], player['goals'], player['assists']))
    # The ?,?,? are replaced automatically by the sql library when the cursos.execute method is used
    # The cursor.execute method handles a provided tuple of values as the second argument, and the library automatically 
    # substitutes the placeholders (the ?) with the corresponding values in a safe and secure manner.
    
    conn.commit()
    conn.close()

