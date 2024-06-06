CREATE TABLE UserPlayers (
    user_id INTEGER,
    player_id INTEGER,
    position_id INTEGER,
    PRIMARY KEY (user_id, player_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (position_id) REFERENCES Positions(position_id)
);
