const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.status(200).json({ msg: "user created ", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const luckyNumber = Math.floor(Math.random() * 100);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authenctiated data, your lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    console.log(err);
    throw new CustomAPIError("Not authorised to access this route", 401);
  }
};

module.exports = { login, dashboard };
