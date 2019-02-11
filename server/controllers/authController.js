const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, username, img_url, password } = req.body;
    //check if email, username exists
    const userEmail = await db.find_email({ email });
    if (userEmail[0]) {
      return res.status(200).send("Email already in use");
    }
    const checkUsername = await db.find_username({ username });
    if (checkUsername[0]) {
      return res.status(200).send("Username already in use");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.create_user({ email, username, img_url, hash });
    req.session.user = {
      id: newUser[0].user_id,
      email: newUser[0].email,
      username: newUser[0].username
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
    if (!userData)
      return res.status(200).send({ message: "Email not found." });
    const result = bcrypt.compareSync(password, userData[0].hash);
    if (!result) return res.status(401).send({ message: "Password incorrect" });
    req.session.user = {
      id: userData[0].user_id,
      email: userData[0].email,
      username: userData[0].username
    };
    res.status(200).send({
      message: "Logged In",
      userData: req.session.user,
      loggedIn: true
    });
  },
  logout: (req, res) => {
    req.session.destroy()
    res.status(200).send({message: 'logged out'})
  }
};
