/**
 * Require all modules and dependencies
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

/**
 * POST - user /signup controller - (Unprotected route)
 */
exports.user_signup = (req, res, next) => {
    User.find({
        email: req.body.email
    }).then(
        user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Email Already exists',
                    status: 409
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(`Hash err: ${err}`);
                        res.status(409).json({
                            message: 'Error while hashing password',
                            error: err,
                            status: 409
                        });
                    }
                    else {
                        let userCredentials = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        userCredentials.save().then(
                            user => {
                                console.log(`signup res: ${user}`);
                                res.status(201).json({
                                    message: 'User created successfully!',
                                    status: 201,
                                    data: user
                                });
                            }
                        ).catch(
                            err => {
                                console.log(`user already exists err: ${err}`);
                                res.status(500).json({
                                    message: 'Internal Server Error',
                                    error: err,
                                    status: 500
                                });
                            }
                        );
                    }
                });
            }
        }
    ).catch(
        err => {
            console.log(`signup err: ${err}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err,
                status: 500
            });
        });
}

/**
 * POST - user /login controller - (Unprotected route)
 */
exports.user_login = (req, res, next) => {
    User.find({
        email: req.body.email,
    }).then(
        user => {
            if(user.length < 1) {
                res.status(401).json({
                    message: 'Unauthorized',
                    status: 401
                });
            }
            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err) {
                        res.status(401).json({
                            message: 'Unauthorized',
                            status: 401
                        });
                    }
                    if(result) {
                        console.log(`User Login res: ${result}`);
                        const token = jwt.sign({
                            email: user[0].email,
                            _id: user[0]._id,
                        }, "mySecretKey",{
                            expiresIn: "1h"
                        });
                        res.status(201).json({
                            message: 'Login successful!',
                            status: 201,
                            token: token
                        });
                    }
                });
            }
        }
    ).catch(
        err => {
            console.log(`User Login err: ${err}`);
            res.status(500).json({
                message: 'Login successful!',
                status: 500,
                error: err
            });
        }
    );
}

/**
 * GET - user /all controller - (Protected route)
 */
exports.user_getAll = (req, res, next) => {
    User.find().then(
        allUsers => {
            console.log(`Get All users res: ${allUsers}`);
            res.status(200).json({
                message: 'Get All Users success',
                status: 200,
                data: allUsers
            });
        }
    ).catch(
        err => {
            console.log(`Get All users err: ${err}`);
            res.status(500).json({
                message: 'Get All Users error',
                status: 500,
                error: err
            });
        }
    );
}