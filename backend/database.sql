-- Users start
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Users end

-- players start
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

-- Players end

--user players start
CREATE TABLE UserPlayers (
    user_id INTEGER,
    player_id INTEGER,
    PRIMARY KEY (user_id, player_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
);

--user players end

