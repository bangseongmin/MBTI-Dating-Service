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

router.get('/result-0', ctrl.result.result0);
router.get('/result-1', ctrl.result.result1);
router.get('/result-2', ctrl.result.result2);
router.get('/result-3', ctrl.result.result3);
router.get('/result-4', ctrl.result.result4);
router.get('/result-5', ctrl.result.result5);
router.get('/result-6', ctrl.result.result6);
router.get('/result-7', ctrl.result.result7);
router.get('/result-8', ctrl.result.result8);
router.get('/result-9', ctrl.result.result9);
router.get('/result-10', ctrl.result.result10);
router.get('/result-11', ctrl.result.result11);

router.get('/image0', ctrl.image.image0);
router.get('/image1', ctrl.image.image1);
router.get('/image2', ctrl.image.image2);
router.get('/image3', ctrl.image.image3);
router.get('/image4', ctrl.image.image4);
router.get('/image5', ctrl.image.image5);
router.get('/image6', ctrl.image.image6);
router.get('/image7', ctrl.image.image7);
router.get('/image8', ctrl.image.image8);
router.get('/image9', ctrl.image.image9);
router.get('/image10', ctrl.image.image10);
router.get('/image11', ctrl.image.image11);


module.exports = router;