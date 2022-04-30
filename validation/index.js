const { check, body } = require("express-validator");
 
 
 

const reqStringValidator = (key, minLength = 1, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isLength({ min: minLength }),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isLength({ min: minLength })
        .withMessage(key + " minimum length should be " + minLength + "."),
    ];
  }
};

 

const reqNumberValidator = (key, minLength = 1, msg = null) => {
  if (msg) {
    return [
      check(key, msg).exists({ checkNull: true }),
      check(key, msg).isLength({ min: minLength }),
    ];
  } else {
    return [
      check(key)
        .exists({ checkNull: true })
        .withMessage(key + " is required."),
      check(key)
        .isNumeric()
        .withMessage(key + " should be in numeric format."),
      check(key)
        .isLength({ min: minLength })
        .withMessage(key + " minimum length should be " + minLength + "."),
    ];
  }
};

const checkIsExists = (req, res, next, field) => {
  if (!req.body[field] || req.body[field] === "") {
    return ResponseData.error(res, field + " is required", null);
  }
  if (req.body[field] && req.body[field].length < 3) {
    return ResponseData.error(
      res,
      field + " minimum length shuold be 3 character long.",
      null
    );
  }
};

module.exports = { 
  reqStringValidator,
  reqNumberValidator, 
  checkIsExists, 
};
