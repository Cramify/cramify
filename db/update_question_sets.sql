UPDATE question_junction
SET question_id=${question_id}
WHERE junction_id=${junction_id}
RETURNING * ;
