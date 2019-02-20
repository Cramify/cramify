DELETE FROM rooms WHERE game_code=${game_code}
RETURNING *;
