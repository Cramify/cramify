INSERT INTO user_account (
username,
hash,
email,
img_url,
score
)
--change to variables later
VALUES(
${username},
${hash},
${email},
${img_url},
0
)

RETURNING *;
