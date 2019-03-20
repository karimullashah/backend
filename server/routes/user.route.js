const express = require('express');
const router = new express.Router();
const userAuth = require('../middleware/authUser');
const CONTROLLER = require('../controllers/user.controller');



router.route('/')
            .post(CONTROLLER.signUp)
            .get(CONTROLLER.getUsers)


// router.route('/signIn')
//             .post(CONTROLLER.signIn);

router.route('/signOut')
            .post(userAuth,CONTROLLER.signOut);

router.route('/signOutAll')
            .post(userAuth,CONTROLLER.signOutAll);

router.route('/me')
            .get(userAuth,CONTROLLER.getUser)
            .patch(userAuth,CONTROLLER.updateUser)
            .delete(userAuth,CONTROLLER.deleteUser)

            
            
module.exports = router;