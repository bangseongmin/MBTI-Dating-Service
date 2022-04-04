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
    }
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
    }
};


module.exports = {
    output,
    process,
}

const log = (response, url) => {
    if(response.err)
        logger.error(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.err}`);
    else
        logger.info(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.msg || ""}`);
}