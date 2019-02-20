INSERT INTO rooms(game_code, user_id) 
VALUES(
    ${room_id}, 
    $(user_id)
    ) 
RETURNING *;
