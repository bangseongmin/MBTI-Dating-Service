'use strict';

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

/* Router */
router.get('/', ctrl.output.login);
router.get('/main', ctrl.output.home);
router.get('/register', ctrl.output.register);
router.get('/findUsername', ctrl.output.findUsername);
router.get('/findPassword', ctrl.output.findPassword);
router.get('/testPage', ctrl.output.testPage);
router.get('/selectOne', ctrl.output.selectOne);
router.get('/logout', ctrl.output.logout);

router.get('/main/chat', ctrl.output.chat);
router.get('/main/interest', ctrl.output.interest);
router.get('/main/test', ctrl.output.test);
router.get('/main/profile', ctrl.output.profile);

/* Result Page */
router.get('/testPage/:n', ctrl.result.result);

/* Result Image for share */
router.get('/image/:n', ctrl.image.image);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/findUsername', ctrl.process.findUsername);
router.post('/findPassword', ctrl.process.findPassword);
router.post('/updatePassword', ctrl.process.updatePassword);
router.post('/testPage', ctrl.process.saveTestResult);
router.post('/saveMBTI', ctrl.process.saveMBTI);
router.post('/searchInfo', ctrl.process.searchInfo);
router.post('/searchUserMBTI', ctrl.process.searchUserMBTI);

module.exports = router;