INSERT INTO question_set(user_id, set_name) 
VALUES(${user_id}, ${set_name}) 
RETURNING set_id, user_id, set_name;