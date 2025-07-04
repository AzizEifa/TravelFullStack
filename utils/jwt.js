const jwt = require("jsonwebtoken");

const SECRET_KEY =" d46e6f8f52c5445d9e85c4f5b9e6f83785b7e7d22bba4bb894c69c8e9a1a42fd0f2cb9c0cf23b2c822bba93a0e3c75da68c9a95e1db196ef544ca69b9e96756f";

function generateToken(payload,expiresIn = "1h") {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}
module.exports = {
  generateToken,
  verifyToken,
};
