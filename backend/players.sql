CREATE TABLE Players (
    player_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    nationality TEXT,
    date_of_birth DATE,
    current_club TEXT,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0
);