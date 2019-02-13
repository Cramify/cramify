SELECT * FROM question_set
WHERE set_id = ${set_id};

SELECT * FROM question
INNER JOIN question_junction
ON question_junction.question_id = question.question_id
WHERE set_id = ${set_id};