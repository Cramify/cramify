module.exports = {
    getGameSets: async (req, res) => {
        const db = req.app.get('db');
        // const {id} = req.session.user;
        const {setID} = req.params;
        let getGameSet = await db.get_specific_set({set_id: setID})
        res.status(200).send(getGameSet)
    },
    editUserPoints: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id)
        const {points} = req.body;
        console.log(req.body)
        let currentUserScore = await db.get_user_score({id: Number(id)});
        let newTotalPoints = currentUserScore[0].score + points;
        let updatedPoints = await db.edit_score({score: newTotalPoints, id: id})
        res.status(200).send(updatedPoints)
    }
}