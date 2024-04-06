const express = require('express');
const { signupController, loginController, authCtrl } = require('../Controller/userCtrl');
const auth = require('../Middleware/auth');

const router = express.Router();


router.post('/signup',signupController);
router.post('/login',loginController);

router.post('/getUserData',auth,authCtrl)

module.exports = router;