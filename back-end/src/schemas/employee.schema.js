const joi = require('joi');

const employeeSchema = joi.object({
  firstname: joi.string().min(2).required(),
  lastname: joi.string().min(2).required(),
  email: joi.string().email().required(),
  country: joi.string().valid('PHILIPPINES', 'USA', 'JAPAN').required(),
  accountType: joi.string().valid('ADMIN', 'REPORTER', 'VIEWER').required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  phonenumber: joi.string().pattern(/^[0-9+\-() ]+$/).required(),
  photo: joi.string().required()
});

const employeeUpdateSchema = joi.object({
  firstname: joi.string().min(2),
  lastname: joi.string().min(2),
  email: joi.string().email(),
  country: joi.string().valid('PHILIPPINES', 'USA', 'JAPAN'),
  accountType: joi.string().valid('ADMIN', 'REPORTER', 'VIEWER'),
  username: joi.string().alphanum().min(3).max(30),
  phonenumber: joi.string().pattern(/^[0-9+\-() ]+$/),
  photo: joi.string()
});

const employeeSearchSchema = joi.object({
  searchKeyword: joi.string().min(1),
  size: joi.number().integer().min(1).max(100).default(10),
  page: joi.number().integer().min(1).default(1),
  order: joi.string().valid('asc', 'desc').default('asc'),
})

module.exports = { employeeSchema, employeeUpdateSchema, employeeSearchSchema };