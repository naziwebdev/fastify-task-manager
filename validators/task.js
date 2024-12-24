const yup = require("yup");

const createTaskValidator = yup.object().shape({
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
  deadline: yup
    .date()
    .required("deadline is required")
    .min(new Date(), "deadline cant be in past"),
  project_id: yup.number().positive().required("project_id is required"),
  assignMembers: yup
    .array()
    .of(yup.number().required("members is required"))
    .required("members is required")
    .min(1, "must be at least one member"),
});

const updateTaskValidator = yup.object().shape({
  title: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title must be max 255 chars"),
  description: yup
    .string()
    .min(3, "title must be at least 3 char")
    .max(255, "title must be max 255 chars"),
  status: yup.string().oneOf(["pendding", "progressing", "completed"]),
  deadline: yup.date().min(new Date(), "deadline cant be in past"),
  project_id: yup.number().positive(),
  assignMembers: yup
    .array()
    .of(yup.number())
    .min(1, "must be at least one member"),
});

module.exports = { createTaskValidator, updateTaskValidator };
