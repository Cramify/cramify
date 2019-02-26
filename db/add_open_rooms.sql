INSERT INTO rooms(game_code, user_id, room_name) 
VALUES(
    ${room_id}, 
    $(user_id),
    ${room_name}
    ) 
RETURNING *;
