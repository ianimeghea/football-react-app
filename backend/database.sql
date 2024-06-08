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
    name TEXT NOT NULL,
    team TEXT NOT NULL,
    position TEXT NOT NULL
);

-- Players end

-- user players start
CREATE TABLE UserPlayers (
    user_id INTEGER,
    player_id INTEGER,
    PRIMARY KEY (user_id, player_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES Players(player_id) ON DELETE CASCADE
);

-- user players end
