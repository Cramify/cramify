const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, username, img_url, password } = req.body;
    const img = `https://robohash.org/user/${username}`
    //check if email, username exists

    const userEmail = await db.find_email({ email });
    if (userEmail[0]) {
      return res.status(200).send({message: "Email already in use"});
    }
    const checkUsername = await db.find_username({ username });
    if (checkUsername[0]) {
      return res.status(200).send({message: "Username already in use"});
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.create_user({ email, username, img_url: img, hash });
    req.session.user = {
      id: newUser[0].user_id,
      email: newUser[0].email,
      username: newUser[0].username,
      imgURL: newUser[0].img_url,
      score: newUser[0].score
    };
    res.status(200).send({
      message: "Registered",
      userData: req.session.user,
      loggedIn: true
    });
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    // find user email
    const userData = await db.find_email({ email });
    if (userData.length===0) return res.status(401).send({ message: "Email not found." });
    const result = bcrypt.compareSync(password, userData[0].hash);
    if (!result) return res.status(401).send({ message: "Password incorrect" });
    req.session.user = {
      id: userData[0].user_id,
      email: userData[0].email,
      username: userData[0].username,
      imgURL: userData[0].img_url,
      score: userData[0].score
    };
    res.status(200).send({
      message: "Logged In",
      userData: req.session.user,
      loggedIn: true
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "logged out" });
  },
  getUser: (req, res) => {
    res.status(200).send(req.session.user);
  },
  changeUser: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let hash = ''
    const { email, username, oldPassword, newPassword, img_url } = req.body;
    // find working account
    const userData = await db.account_by_id({ id: +id });
    const authorized = bcrypt.compareSync(oldPassword, userData[0].hash)
    // old password wrong
    if(!authorized) return res.status(401).send({message: 'Old password incorrect'})
    // new password hash
    if (newPassword) {
      const salt = bcrypt.genSaltSync(10)
      hash = bcrypt.hashSync(newPassword, salt)
    }
    const result = await db.edit_account({
      email,
      username,
      hash,
      img_url,
      user_id: id
    });
    req.session.user = {
      id: id,
      email: result[0].email,
      username: result[0].username
    };
    res.send({ message: "updated account", userData: req.session.user });
  },
  deleteUser: async (req,res) => {
    const db = req.app.get('db')
    const {id} = req.session.user;
    const deleteUser = await db.delete_user({user_id: id});
    req.session.destroy();
    res.status(200).send(deleteUser)
  }
};
