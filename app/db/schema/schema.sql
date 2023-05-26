CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url VARCHAR(200) NOT NULL,
    response TEXT NOT NULL,
    requested_at integer(4) NOT NULL DEFAULT (strftime('%s','now'))
)
