const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    const {username, password} = req?.body;

    try {

        const existingUser = await User.findByPk(username);
        if (existingUser) return res.status(400).json({ error: "Username already exists" });

        const user = User.create({
            id: uuidv4(),
            username,
            password,
        });

        return res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
  const { username, password } = req?.body;

  try {
    const user = await User.findByPk(username);
    if (!user || user.password !== password) return res.status(404).json({ error: "Username or password is incorrect" })

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "5m"
    });

    return res.json({ token: token });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};