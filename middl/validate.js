const yup = require("yup");

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
        .matches(/^[a-z]+@gmail.com+$/),
      cin: yup.number().required().min(8,),
    });
    await schema.validate(req.body);
    next();
    
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
module.exports = { validateUser };