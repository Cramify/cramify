INSERT INTO "question_junction"("set_id", "question_id") 
VALUES(
${set_id},
${question_id}
) 


RETURNING "junction_id", "set_id", "question_id";
