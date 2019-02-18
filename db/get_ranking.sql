select user_id, score, rank() 
OVER (order by score desc) as rnum 
from user_account;