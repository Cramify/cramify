DELETE FROM question_junction
where set_id = (
  SELECT set_id FROM question_set
  WHERE user_id = ${user_id}
);

DELETE FROM question_set
where user_id = ${user_id};

DELETE FROM user_account 
WHERE user_id = ${user_id};