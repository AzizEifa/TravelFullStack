const yup = require("yup");
const { verifyToken } = require("../utils/jwt");

async function validateUser(req, res, next) {
  try {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required()
        .matches(/^[A-Za-z]/),
      email: yup
        .string()
        .email()
        .required()
        .matches(/^[a-zA-Z][a-zA-Z0-9]*[0-9]+@gmail\.com$/),
      cin: yup.number().required().min(8,),
    });
    await schema.validate(req.body);
    next();
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await verifyToken(token);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
module.exports = { validateUser ,
  authMiddleware
};