// controllers/userController.js
const User = require('../models/User');
const bcrypt = require("bcryptjs"); // Import Bcrypt Package
const jwt = require("jsonwebtoken"); // Import Jsonwebtoken Package
const AppDataSource = require("../data-source");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, picture } = req.body;
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");

    }
    const userRepository = AppDataSource.getRepository(User);

    const oldUser = await userRepository.findOne({ where: { email } }); // Find user with requested email
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10); // Encrypt password with bcryptjs
    const token = jwt.sign(
      { email:email.toLowerCase() },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    const user = userRepository.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      picture: picture,
      token:token
    });
    await userRepository.save(user);

    res.status(201).json({ user, token });

  } catch (error) {

  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = await userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid Credentials")
  } catch (err) {
    console.log(err)
  }
}