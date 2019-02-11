UPDATE user_account 
SET 
  hash = ${hash},
  username = ${username},
  email = ${email},
  img_url = ${img_url}

WHERE user_id = ${user_id} 
RETURNING username, email, img_url;