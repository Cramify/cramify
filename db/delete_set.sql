DELETE FROM question_junction
WHERE set_id = ${set_id};


DELETE FROM question_set 
WHERE set_id = ${set_id};
