UPDATE user_account
set score = ${score}
where user_id = ${id}
returning *;