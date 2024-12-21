const yup = require("yup");

const loginValidator = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .when("phone", {
      is: (phone) => !phone || phone.length === 0,
      then: yup.string().required("Either email or phone is required"),
      otherwise: yup.string().nullable(),
    }),
  phone: yup
    .string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Phone number is not valid"
    )
    .when("email", {
        is: (email) => !email || email.length === 0,
        then: yup.string().required("Either email or phone is required"),
        otherwise: yup.string().nullable(),
      }),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "format password is incorrect"
    )
   .required('password is required')
});

module.exports = { loginValidator };
