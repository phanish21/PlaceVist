const HttpError = require("../models/http-error");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

jwtSecretKey = process.env.JWT_SECRET;
module.exports = (req , res , next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication Failed');
        }
        const decodedToken = jwt.verify(token , jwtSecretKey);
        req.userData = { userId : decodedToken.userId};
        next();
    } catch (err) {
        const error = new HttpError('Authentication Failed' , 401);
        return next(error);
    }
}