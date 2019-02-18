module.exports = {
    getGameSets: async (req, res) => {
        const db = req.app.get('db');
        // const {id} = req.session.user;
        const {setID} = req.params;
        let getGameSet = await db.get_specific_set({set_id: setID})
        res.status(200).send(getGameSet)
    },
    getLeaders: async (req, res) => {
        const db = req.app.get('db');
        const leaderboard = await db.get_leaders()
        res.status(200).send(leaderboard)
    },
    editUserPoints: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {points} = req.body;
        let currentUserScore = await db.get_user_score({id: Number(id)});
        let newTotalPoints = currentUserScore[0].score + points;
        let updatedPoints = await db.edit_score({score: newTotalPoints, id: id})
        res.status(200).send(updatedPoints)
    },
    getRanking: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const usersArrByRank = await db.get_ranking();
        const currentUserIndex = usersArrByRank.findIndex(user => {
            return Number(id) === user.user_id
        })
        const currentUserRanking = usersArrByRank[currentUserIndex].rnum;
        res.status(200).send(currentUserRanking)
    }
}