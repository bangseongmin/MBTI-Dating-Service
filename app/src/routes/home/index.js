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

router.get('/result-0', ctrl.show.result0);
router.get('/result-1', ctrl.show.result1);
router.get('/result-2', ctrl.show.result2);
router.get('/result-3', ctrl.show.result3);
router.get('/result-4', ctrl.show.result4);
router.get('/result-5', ctrl.show.result5);
router.get('/result-6', ctrl.show.result6);
router.get('/result-7', ctrl.show.result7);
router.get('/result-8', ctrl.show.result8);
router.get('/result-9', ctrl.show.result9);
router.get('/result-10', ctrl.show.result10);
router.get('/result-11', ctrl.show.result11);


module.exports = router;