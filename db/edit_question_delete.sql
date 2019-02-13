DELETE FROM question_junction 
WHERE junction_id=${junction_id} AND set_id = ${set_id};


SELECT * FROM question
INNER JOIN question_junction
ON question_junction.question_id = question.question_id
WHERE set_id = ${set_id}