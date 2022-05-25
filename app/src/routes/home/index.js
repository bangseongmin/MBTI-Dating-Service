'use strict';

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

/* Router */
router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/getUser', ctrl.output.getUser);
router.get('/register', ctrl.output.register);
router.get('/findUsername', ctrl.output.findUsername);
router.get('/findPassword', ctrl.output.findPassword);
router.get('/testPage', ctrl.output.testPage);
router.get('/logout', ctrl.output.logout);
router.get('/selectOne', ctrl.output.selectOne);
router.get('/chat', ctrl.output.chat);
router.get('/interest', ctrl.output.interest);
router.get('/test', ctrl.output.test);
router.get('/profile/:username', ctrl.output.profile);
router.get('/readInfo', ctrl.output.readInfo);

/* Result Page */
router.get('/testPage/:n', ctrl.result.result);

/* Result Image for share */
router.get('/image/:n', ctrl.image.image);


router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);
router.post('/findUsername', ctrl.process.findUsername);
router.post('/findPassword', ctrl.process.findPassword);
router.post('/updatePassword', ctrl.process.updatePassword);
router.post('/saveMBTI', ctrl.process.saveMBTI);
router.post('/searchInfo', ctrl.process.searchInfo);
router.post('/searchUserMBTI', ctrl.process.searchUserMBTI);
router.post('/profile', ctrl.process.profile);

router.post('/testPage', ctrl.process.saveTestResult);

router.put('/profile', ctrl.update.profile);
router.put('/changeImage', ctrl.update.changeImage);
module.exports = router;