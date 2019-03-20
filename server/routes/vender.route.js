const express = require('express');
const router = new express.Router();

const CONTROLLER = require('../controllers/vender.controller');

router.route('/')
            .post(CONTROLLER.signUp)



module.exports = router;