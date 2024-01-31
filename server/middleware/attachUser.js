const { verifyToken } = require("../utils/verifyToken");

module.exports.attachUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401);
    res.json({ message: "You are not authorized" });
    return;
  }
  try {
    const user = verifyToken(token);
    if (!user) throw Error("User doesn't exist");
    req.body.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: error });
    return;
  }
};
