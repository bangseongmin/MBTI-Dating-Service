"use strict";

const User = require('../../models/User');
const logger = require('../../config/logger');

const output = {
    home : (req, res)=>{
        if(req.session.user){
            logger.info(`GET / 304 "메인 화면으로 이동"`);
            // console.log("main"+req.session.user.id);
            res.render("home/main");
        }else{
            res.render("home/login");
        }
    },
    
    login : (req, res)=>{
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        if(req.session.user){
            res.render("home/main");
        }else{
            res.render("home/login");
        }
    },

    register: (req, res) =>{
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/login-service/register");
    },

    findUsername: (req, res) =>{
        logger.info(`GET /findUsername 304 "아이디 찾기 화면으로 이동"`);
        res.render("home/login-service/findUsername");
    },

    findPassword: (req, res) =>{
        logger.info(`GET /findPassword 304 "비밀번호 찾기 화면으로 이동"`);
        res.render("home/login-service/findPassword");
    },

    testPage: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /testPage 304 "MBTI 테스트 화면으로 이동"`);
            res.render("home/mbti-test/testPage");
        }else{
            res.render("home/login");
        }
    },
    selectOne: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /selectOne 304 "이상형 선택 화면으로 이동"`);
            res.render("home/mbti-test/selectOne");
        }else{
            res.render("home/login");
        }
    },
    chat: (req, res) =>{
        if(req.session.user){
        logger.info(`GET /main/chat 304 "채팅 페이지으로 이동"`);
        res.render("home/main-page/chat");
        }else{
            res.render("home/login");
        }
    },

    interest: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /main/interest 304 "메시지 및 알림 페이지으로 이동"`);
            res.render("home/main-page/interest");
        }else{
            res.render("home/login");
        }
    },
    test: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /main/test 304 "다양한 테스트 페이지로 이동"`);
            res.render("home/main-page/test");
        }else{
            res.render("home/login");
        }
    },
    profile: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /main/profile 304 "프로필 페이지로 이동"`);
            res.render("home/main-page/profile");
        }else{
            res.render("home/login");
        }
    },
    logout : async (req, res)=>{
        logger.info(`GET /login 304 "로그아웃 후 로그인 화면으로 이동"`);
        if(req.session.user){
            await req.session.destroy(
                function(err){
                    if(err){
                        console.log('세션 삭제시 에러');
                        return;
                    }
                    console.log('세션 삭제 성공!');
                    res.render("home/login");
                }
            );
            res.clearCookie('connect.sid');
        }else{
            console.log('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    },
};


const process = {
    login: async(req, res) => {
        
        const user = new User(req.body);
        const response = await user.login();
        
        if(req.session.user){
            console.log('이미 로그인 되어 있음');
            return res.status(300).json(response);
        }else{

            req.session.user = {
                id: req.body.id,
                pw: req.body.pw,
                authorized:true
            }

            const url = {
                method: "/POST",
                path: "/login",
                status: response.err ? 400 : 200,
            };
    
            log(response, url);
            return res.status(url.status).json(response);   
        }
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
    saveTestResult: async(req, res) => {
        const user = new User(req.body);
        const response = await user.saveTestResult();

        const url = {
            method: "/POST",
            path: "/testPage",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    selectOne: async(req, res) => {
        const user = new User(req.body);
        const response = await user.saveMBTIInfo();

        const url = {
            method: "/POST",
            path: "/selectOne",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    searchInfo: async(req, res) => {
        const user = new User(req.body);
        const response = await user.searchUserInfo();
        
        const url = {
            method: "/POST",
            path: "/searchInfo",
            status: response.err ? 409 : 200,
        }
        
        log(response, url);

        return res.status(url.status).json(response);
    }
};

// test 결과
const result = {
    result0: (req, res) =>{
        logger.info(`GET /testPage/result-0 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-0");
    },
    result1: (req, res) =>{
        logger.info(`GET /testPage/result-1 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-1");
    },
    result2: (req, res) =>{
        logger.info(`GET /testPage/result-2 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-2");
    },
    result3: (req, res) =>{
        logger.info(`GET /testPage/result-3 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-3");
    },
    result4: (req, res) =>{
        logger.info(`GET /testPage/result-4 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-4");
    },
    result5: (req, res) =>{
        logger.info(`GET /testPage/result-5 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-5");
    },
    result6: (req, res) =>{
        logger.info(`GET /testPage/result-6 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-6");
    },
    result7: (req, res) =>{
        logger.info(`GET /testPage/result-7 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-7");
    },
    result8: (req, res) =>{
        logger.info(`GET /testPage/result-8 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-8");
    },
    result9: (req, res) =>{
        logger.info(`GET /testPage/result-9 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-9");
    },
    result10: (req, res) =>{
        logger.info(`GET /testPage/result-10 304 "MBTI 테스트 결과 화면으로 이동"`);
        res.render("testResult/result-10");
    },
    result11: (req, res) =>{
        logger.info(`GET /testPage/result-11 304 "MBTI 테스트 결과 화면으로 이동"`);
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