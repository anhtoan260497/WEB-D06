const express = require("express");
const userRouter = express.Router();
const { body, validationResult } = require("express-validator");
const res = require("express/lib/response");

let users = [
  {
    id: 1,
    age: 18,
    email: "victory@gmail.com",
    name: "nguyen tuan anh",
    gender: 0,
  },
];

userRouter.get("/", (req, res) => {
  res.send(users);
});

// userRouter.post("/", (req, res) => {
//     req.body.age

//   const newUser = {
//     id: users.length + 1,
//     age: req.body.age,
//     email: req.body.email,
//     name: req.body.name,
//     gender: req.body.gender,
//   };

//   users.push(newUser);
//   res.send(users);
// });

userRouter.post(
  "/",
  // username must be an email
  body("age")
    .isNumeric()
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage("Age only in 1-100"),
  // password must be at least 5 chars long
  body("email").isEmail().withMessage("Must be an email"),

  body("name")
    .isString()
    .isLength({
      min: 4,
      max: 30,
    })
    .withMessage("Enter correct name"),

  body("gender").isNumeric().withMessage("Enter correct gender"),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array()[0].msg);
      // return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const currentID = users.reduce((cur, next) => {
      if (cur < next.id) return next.id;
      else return cur;
    }, users[0].id);

    const newUser = {
      id: currentID + 1,
      age: req.body.age,
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
    };

    users.push(newUser);

    res.send(users);
  }
);

userRouter.put(
  "/",
  body("id").notEmpty().withMessage("Enter correct id"),
  body("age")
    .isNumeric()
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage("Age only in 1-100"),

  body("email").isEmail().withMessage("Must be an email"),

  body("name")
    .isString()
    .isLength({
      min: 4,
      max: 30,
    })
    .withMessage("Enter correct name"),

  body("gender").isNumeric().withMessage("Enter correct gender"),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array()[0].msg);
      // return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const id = parseInt(req.body.id);

    const idx = users.findIndex((el) => el.id === id);

    if (idx < 0) return res.send("Please enter valid id");

    const newDetail = {
      id,
      age: req.body.age || users[idx].age,
      email: req.body.email || users[idx].email,
      name: req.body.name || users[idx].name,
      gender: req.body.gender || users[idx].gender,
    };

    users.splice(idx,1)
    users.splice(idx, 0, newDetail);

    res.send(users);
  }
);

userRouter.delete(
  "/",
  body("id").notEmpty().withMessage("Please Enter correct ID"),
  (req, res) => {
    const id = parseInt(req.body.id);

    const idx = users.findIndex((el) => el.id === id);

    if (idx < 0) return res.send("Please Enter correct ID");

   users.splice(idx,1)

    res.send(users);
  }
);

module.exports = userRouter;
