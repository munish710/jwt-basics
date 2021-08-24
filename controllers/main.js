const login = async (req, res) => {
  res.send("Fake Login/Reegister/Signup Route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Heloo, Munish Thakur`,
    secret: `Here is theyour authenctiated data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
