const express = require('express');
const router = new express.Router();

const CONTROLLER = require('../controllers/login.controller');

router.route('/signIn')
                .post(CONTROLLER.signIn)



 module.exports = router;