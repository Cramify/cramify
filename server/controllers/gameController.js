module.exports = {
    getGameSets: async (req, res) => {
        const db = req.app.get('db');
        // const {id} = req.session.user;
        const {setID} = req.params;
        let getGameSet = await db.get_specific_set({set_id: setID})
        res.status(200).send(getGameSet)
    }
}