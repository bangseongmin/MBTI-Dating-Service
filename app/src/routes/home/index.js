'use strict';

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

/* Router */
router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);
router.get('/findUsername', ctrl.output.findUsername);
router.get('/findPassword', ctrl.output.findPassword);
router.get('/testPage', ctrl.output.testPage);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/findUsername', ctrl.process.findUsername);
router.post('/findPassword', ctrl.process.findPassword);
router.post('/updatePassword', ctrl.process.updatePassword);
module.exports = router;