const yup = require("yup");

const createProjectValidator = yup.object().shape({
  title: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title must be max 255 chars")
    .required("title is required"),
  description: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title must be max 255 chars")
    .required("title is required"),
});

const updateProjectValidator = yup.object().shape({
  title: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title must be max 255 chars"),
  description: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title must be max 255 chars"),
});

module.exports = { createProjectValidator, updateProjectValidator };
