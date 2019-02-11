CREATE TABLE user_account (
user_id SERIAL PRIMARY KEY,
username VARCHAR(50),
hash text,
email VARCHAR(150),
img_url text,
score int
);

--question table
CREATE TABLE question (
question_id SERIAL PRIMARY KEY,
question TEXT NOT NULL,
correct_answer TEXT NOT NULL, 
answer_2 TEXT NOT NULL,
answer_3 TEXT,
answer_4 TEXT,
category VARCHAR(50)
);

--question_set table
CREATE TABLE question_set (
set_id SERIAL PRIMARY KEY,
user_id INT REFERENCES user_account(user_id),
set_name VARCHAR(75)
);

--question junction table
CREATE TABLE question_junction (
junction_id SERIAL PRIMARY KEY,
set_id INT REFERENCES question_set(set_id),
question_id INT REFERENCES question(question_id)
);

-- friend list junction between user account to user account
CREATE TABLE friend (
friendship_id SERIAL PRIMARY KEY,
friend_id INT REFERENCES user_account(user_id),
user_id INT REFERENCES user_account(user_id)
);



--create new user
INSERT INTO user_account (
username,
hash,
email,
img_url,
score
)
--change to variables later
VALUES(
'BobRoss',
'password',
'bob@ross.com',
'https://yt3.ggpht.com/a-/AAuE7mC75lyDOGkH_0L4_ZR6F4bfGviFjsMZIGa22w=s900-mo-c-c0xffffffff-rj-k-no',
'32432423'
);

--create new question
INSERT INTO question (
question,
correct_answer,
answer_2,
answer_3,
answer_4,
category
)
VALUES (
'What is the only value not equal to itself in JavaScript?',
'NaN (Not-a-Number)',
'NaO (Not-an-Object)',
'Null',
'Undefined',
'Javascript'
);

-- create add questions to question junction
INSERT INTO question_junction (
set_id,
question_id
)
VALUES(
1,
1
);






