module.exports  = {
    getSets : async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user
        const getSets = await db.get_sets({user_id:id})
        res.status(200).send(getSets)
    },
    allGameSets: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user
        const getSets = await db.get_create_room_sets({user_id:id})
        res.status(200).send(getSets)
    },
    getAllQuestions: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        if (!id) {
            return res.status(401).send({message: 'Please Log In'})
        } 
        const getQuestions = await db.get_questions();
        res.status(200).send(getQuestions);
    },
    createNewSet: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {setName} = req.body;
        if (!id) {
            return res.status(401).send({message: 'Please Log In'})
        } 
        const newSet = await db.create_new_set({user_id: id, set_name: setName})
        res.status(200).send(newSet)
    },
    addQuestionsToSet: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {setID, questionID} = req.body;
        if (!id) {
            return res.status(401).send({message: 'Please Log In'})
        } 
        const addedQuestion = await db.add_to_set({set_id: setID, question_id: questionID})
        res.status(200).send(addedQuestion)
    },
    deleteQuestionSets: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {setID} = req.params;
        const deleteSet = await db.delete_set({set_id: setID})
        res.status(200).send(deleteSet)
    },
    getSpecificSet: async (req, res) => {
        const db = req.app.get('db');
        const{id} = req.session.user;
        const {setID} = req.params;
        const getSpecific = await db.get_specific_set({set_id: setID})
        res.status(200).send(getSpecific)
    },
    updateQuestionSets: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {setID, questionID} = req.body;
        const updateSet = await db.update_question_sets({set_id: setID, question_id: questionID})
        res.status(200).send(updateSet)
    } 
}