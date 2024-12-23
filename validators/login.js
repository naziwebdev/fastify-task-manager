const yup = require("yup");

const loginValidator = yup
  .object()
  .shape({
    email: yup.string().email("Invalid email format").nullable(),
    phone: yup
      .string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Phone number is not valid"
      )
      .nullable(),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "format password is incorrect"
      )
      .required("password is required"),
  })
  .test("at-least-one", "Either email or phone is required", function (value) {
    return value.email || value.phone;
  });

module.exports = { loginValidator };
