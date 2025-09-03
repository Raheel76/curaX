const { validationResult, check } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

exports.validateSignup = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name cannot exceed 20 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["patient", "doctor", "admin"])
    .withMessage("Invalid role. Must be 'patient', 'doctor', or 'admin'"),
  validate,
];
