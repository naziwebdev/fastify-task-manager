const yup = require('yup')


const registerValidator = yup.object().shape({
    username: yup
    .string()
    .min(3, "at least char is 3")
    .max(50, "max char is 50")
    .required("username field is required"),
  email: yup
    .string()
    .matches(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/)
    .required("email field is required"),
    phone:yup.string()
    .length(11, "phone must be 11 length")
    .required("phone is required")
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Phone number is not valid"
    ),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "format password is incorrect"
    )
    .required("password field is required"),
})


module.exports = {registerValidator}