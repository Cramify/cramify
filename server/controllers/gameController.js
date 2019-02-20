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
        if (req.session.user) {
            const db = req.app.get('db');
            const {id} = req.params;
            const {points} = req.body;
            let currentUserScore = await db.get_user_score({id: Number(id)});
            let newTotalPoints = currentUserScore[0].score + points;
            let updatedPoints = await db.edit_score({score: newTotalPoints, id: id})
            res.status(200).send(updatedPoints)
        }
    },
    getRanking: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        try{
            const usersArrByRank = await db.get_ranking();
            const currentUserIndex = await usersArrByRank.findIndex(user => {
                return Number(id) === user.user_id
            })
            const currentUserRanking = usersArrByRank[currentUserIndex].rnum;
            res.status(200).send(currentUserRanking)
        } catch(e){console.log(e)}

    },
    getAllRooms: async (req, res) => {
        const db = req.app.get('db')
        try{
            const getRooms = await db.get_all_rooms();
            res.status(200).send(getRooms)
        }catch(e){console.log(e)}
    },
    addOpenRoom: async (req,res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {roomID} = req.body;
        try{
            const addRooms = await db.add_open_rooms({room_id: roomID, user_id: id})
            res.status(200).send(addRooms)
        }catch(e){console.log(e)}
    },
    deleteOpenRoom: async (req,res)=>{
        const db = req.app.get('db');
        const {roomID} = req.params;
        // const {id} = req.session.user;
        try{
            const deleteOpenRoom = await db.delete_open_room({game_code: roomID})
            res.status(200).send(deleteOpenRoom)
        }catch(e){console.log(e)}
    }
}