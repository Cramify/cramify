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
    editQuestionDelete: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {setID, junctionID} = req.query;
        const editQuestionDelete = await db.edit_question_delete({set_id: setID, junction_id: junctionID});
        res.status(200).send(editQuestionDelete)
    },
    getByCategory: async (req, res) => {
        const db = req.app.get('db');
        const {category} = req.params;
        const getByCategory = await db.select_category({category})
        res.status(200).send(getByCategory)
    }
}