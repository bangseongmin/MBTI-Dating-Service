"use strict";

const User = require('../../models/User');
const logger = require('../../config/logger');

const output = {
    home : (req, res)=>{
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index");
    },
    
    login : (req, res)=>{
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login")
    },

    register: (req, res) =>{
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },

    findUsername: (req, res) =>{
        logger.info(`GET /register 304 "아이디 찾기 화면으로 이동"`);
        res.render("home/findUsername");
    },

    findPassword: (req, res) =>{
        logger.info(`GET /register 304 "비밀번호 찾기 화면으로 이동"`);
        res.render("home/findPassword");
    },

    testPage: (req, res) =>{
        logger.info(`GET /testPage 304 "MBTI 테스트 화면으로 이동"`);
        res.render("home/testPage");
    },
};


const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        
        const url = {
            method: "/POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };

        log(response, url);

        return res.status(url.status).json(response);
    },
    register: async(req, res) =>{
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: "/POST",
            path: "/register",
            status: response.err ? 409 : 201,           // 서버측 에러(DB 등)가 발생할 경우의 반환할 상태코드는 500번대, 이미 등록되어 있는 것은 클라이언트 측의 잘못이므로 409
        };

        log(response, url);

        return res.status(url.status).json(response);
    },
    findUsername: async(req, res) => {
        const user = new User(req.body);
        const response = await user.findUsername();

        const url = {
            method: "/POST",
            path: "/findUsername",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    findPassword: async(req, res) => {
        const user = new User(req.body);
        const response = await user.findPassword();

        const url = {
            method: "/POST",
            path: "/findPassword",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },

    updatePassword: async(req, res) => {
        const user = new User(req.body);
        const response = await user.updatePassword();

        const url = {
            method: "/POST",
            path: "/updatePassword",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
};

// test 결과
const result = {
    result0: (req, res) =>{
        logger.info(`GET /result-0 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-0");
    },
    result1: (req, res) =>{
        logger.info(`GET /result-1 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-1");
    },
    result2: (req, res) =>{
        logger.info(`GET /result-2 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-2");
    },
    result3: (req, res) =>{
        logger.info(`GET /result-3 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-3");
    },
    result4: (req, res) =>{
        logger.info(`GET /result-4 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-4");
    },
    result5: (req, res) =>{
        logger.info(`GET /result-5 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-5");
    },
    result6: (req, res) =>{
        logger.info(`GET /result-6 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-6");
    },
    result7: (req, res) =>{
        logger.info(`GET /result-7 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-7");
    },
    result8: (req, res) =>{
        logger.info(`GET /result-8 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-8");
    },
    result9: (req, res) =>{
        logger.info(`GET /result-9 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-9");
    },
    result10: (req, res) =>{
        logger.info(`GET /result-10 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-10");
    },
    result11: (req, res) =>{
        logger.info(`GET /result-11 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-11");
    },
}

const image = {
    image0: (req, res) =>{
        logger.info(`GET /image/image0 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image0");
    },
    image1: (req, res) =>{
        logger.info(`GET /image/image1 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image1");
    },
    image2: (req, res) =>{
        logger.info(`GET /image/image2 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image2");
    },
    image3: (req, res) =>{
        logger.info(`GET /image/image3 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image3");
    },
    image4: (req, res) =>{
        logger.info(`GET /image/image4 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image4");
    },
    image5: (req, res) =>{
        logger.info(`GET /image/image5 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image5");
    },
    image6: (req, res) =>{
        logger.info(`GET /image/image6 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image6");
    },
    image7: (req, res) =>{
        logger.info(`GET /image/image7 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image7");
    },
    image8: (req, res) =>{
        logger.info(`GET /image/image8 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image8");
    },
    image9: (req, res) =>{
        logger.info(`GET /image/image9 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image9");
    },
    image10: (req, res) =>{
        logger.info(`GET /image/image10 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image10");
    },
    image11: (req, res) =>{
        logger.info(`GET /image/image11 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("image/image11");
    },
}

module.exports = {
    output,
    process,
    result,
    image
}

const log = (response, url) => {
    if(response.err)
        logger.error(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.err}`);
    else
        logger.info(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.msg || ""}`);
}