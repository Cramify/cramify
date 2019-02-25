UPDATE user_account
set score = ${score}
where user_id = ${id}
returning user_id, email, username, img_url, score;