var jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);

    if (!token) {
      res.send("Login again");
      return;
    }

    let decoded = jwt.verify(token, "masai");
    req.logged_id = decoded.userId;
    req.username = decoded.userName;
    console.log("decoded is", decoded);
    next();
  } catch (error) {
    res.status(500).send({ msg: "error occured in middleware", error: error });
  }
};

module.exports = { authenticationMiddleware };
