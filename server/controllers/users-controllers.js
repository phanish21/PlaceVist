const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
const HttpError = require('../models/http-error');


dotenv.config();
jwtSecretKey = process.env.JWT_SECRET;

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({} , '-password');
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed , please try again later." , 500
    )
  }
  res.json({ users : users.map(user => user.toObject({ getters : true}))})
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email : email});
  } catch (err) {
    const error = new HttpError(
      'signing up failed , please try again' , 500
    )
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User already exists , please Login instead ' , 422
    );
    return next(error);
  }

  let hashedpassword;
  try {
    hashedpassword = await bcrypt.hash(password , 10);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again' , 500
    )
  }
  const createdUser = new User({
    name,
    email,
    image: req.file.path ,
    password : hashedpassword,
    places:[]
  })

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'signing up failed , pleasae try again.' ,
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({userId : createdUser.id , email : createdUser.email} , jwtSecretKey , {expiresIn : '1h'} );
  } catch (err) {
    const error = new HttpError(
      'signing up failed , pleasae try again.' ,
      500
    );
    return next(error);
  }
  res.status(201).json({ userId : createdUser.id , email : createdUser.email , token : token});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email : email});
  } catch (err) {
    const error = new HttpError(
      'Logging in failed , please try again' , 500
    )
    return next(error);
  }

  if (!existingUser) {
    const error =new HttpError(
      " Invalid credentials , could not log you in. " , 401
    )
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password , existingUser.password)
  } catch (err) {
    const error = new HttpError('could not log you in , plsease check your password' , 500 )
    return next(error);
  };

  if (!isValidPassword) {
    const error =new HttpError(
      " Invalid credentials , could not log you in. " , 401
    )
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({userId : existingUser.id , email : existingUser.email} , jwtSecretKey , {expiresIn : '1h'} );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed , pleasae try again.' ,
      500
    );
    return next(error);
  }

  res.json({userId : existingUser.id , email : existingUser.email , token : token});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;