/**
 * Require all modules and dependencies
 */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const Auth = require('../middleware/authentication');

/**
 * POST - user /signup route - (Unprotected route)
 */
router.post('/signup', userController.user_signup);

/**
 * POST - user /signup route - (Unprotected route)
 */
router.post('/login', userController.user_login);

/**
 * GET - user /all route - (Protected route)
 */
router.get('/all', Auth, userController.user_getAll);

module.exports = router;