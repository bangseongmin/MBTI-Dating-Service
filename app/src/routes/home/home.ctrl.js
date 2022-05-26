"use strict";

const User = require('../../models/User');
const UserMBTI = require('../../models/UserMBTI');
const logger = require('../../config/logger');
const db = require("../../config/dbcon");

const output = {
    home : (req, res)=>{
        if(req.session.user){
            logger.info(`GET / 304 "메인 화면으로 이동"`);
            let userID = req.session.user.id;
            return res.render("home/main", {username: userID});
        }else{
            res.render("home/login");
        }
    },
    getUser: (req, res) => {
        if(req.session.user){
            let userID = req.session.user.id;
            logger.info(`GET / 304 "사용자 정보 획득`);
            res.json(userID);
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

    selectOne: (req, res) =>{                                                   // 삭제 예정
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
        let userID = req.session.user.id;
        res.render("home/main-page/chat", {username: userID});
        }else{
            res.render("home/login");
        }
    },

    interest: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /main/interest 304 "메시지 및 알림 페이지으로 이동"`);
            let userID = req.session.user.id;
            res.render("home/main-page/interest", {username: userID});
        }else{
            res.render("home/login");
        }
    },

    test: (req, res) =>{
        if(req.session.user){
            logger.info(`GET /main/test 304 "다양한 테스트 페이지로 이동"`);
            let userID = req.session.user.id;
            res.render("home/main-page/test", {username: userID});
        }else{
            res.render("home/login");
        }
    },

    profile: (req, res) =>{
        if(req.session.user){
            let userID = req.session.user.id;       // 접속자
            let username = req.params.username;     // 검색대상

            // DB에서 데이터를 가져와야함
            logger.info(`GET /main/profile 304 "${username} 프로필 페이지로 이동"`);
            let status = userID == username ? true: false;
            
            let query = "Select name, image from users where id = ?;";
            db.query(query, [username], (err, data) => {
                if(err) console.error(err);
                else{
                    let name = JSON.stringify(data[0].name);
                    let image = JSON.stringify(data[0].image);

                    res.render("home/main-page/profile", {username: userID, search:name, status: status, name:name, img: image});
                }
            })
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

    readInfo: async(req, res) =>{
        logger.info(`GET /readInfo 200 "프로필 페이지 정보 로딩"`);
        if(req.session.user){
            let id = req.param('id');     // 검색대상
            let query = "Select content from profiles where id = ?;";
            db.query(query, [id], (err, data)=>{
                if(err) console.log(err);
                else{
                    res.send(data);
                }
            })
        }else{
            console.log('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    },
    findtests: async(req, res) =>{
        logger.info(`GET /api/tests 200 "MBTI 테스트 페이지 정보 전달"`);
        if(req.session.user){
            let userID = req.session.user.id;       // 접속자
            let query = "Select * from test order by likecount DESC";
            db.query(query, [], (err, result) => {
                if(err) console.log(err);
                else {
                    query = "Select testnum, done from testlike where id=?";
                    db.query(query, [userID],(err, done) =>{
                        res.send({list:result, doneList:done});
                    })
                }
            })
        }else{
            console.log('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    },
    testPage: async(req, res) => {
        let idx = req.params.n;
        if(req.session.user){
            logger.info(`GET /test/${idx} 200 "MBTI 테스트 페이지 이동"`);
            res.render(`mbtitest/test-${idx}`);
        }else{
            logger.info('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    },
    notices: async(req, res) => {
        if(req.session.user){
            logger.info(`GET /notice 200 공지사항 요청`);
            let id = req.session.user.id;
            let query = "Select * from notice where towho='all' or towho = ?";
            db.query(query, [id], (err, result) =>{
                if(err) console.log(err);
                else{
                    console.log(result);
                    res.send({list : result});
                }
            })
        }else{
            logger.info('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    },
    messages: async(req, res) => {
        if(req.session.user){
            logger.info(`GET /messages 200 메시지 알림 리스트 요청`);
            let id = req.session.user.id;
            let query = "Select * from message where recevier = ?";
            db.query(query, [id], (err, result) => {
                if(err) console.log(err);
                else{
                    console.log(result);
                    res.send({list : result});
                }
            })
        }else{
            logger.info('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    },
    getidealtype: async(req, res) => {
        if(req.session.user){
            logger.info(`GET /getidealtype 200 이상형 추천 요청`);
            let id = req.session.user.id;
            // select gender, user_Otype from users, userMBTI where users.id = userMBTI.user_id and users.id="test1" LIMIT 1;
            let query = "Select gender, user_Otype, content from users, userMBTI, profiles where users.id = userMBTI.user_id and user_id = ? LIMIT 1";
            db.query(query, [id], (err, result)=>{
                if(err) console.error(err);
                else{
                    let gender = result[0].gender;
                    let user_Otype = result[0].user_Otype;

                    // select * from users, userMBTI where users.id = userMBTI.user_id and userMBTI.user_type = 10 and users.gender != "Female" LIMIT 3;
                    query = "Select * from users, userMBTI where users.id = userMBTI.user_id and userMBTI.user_type = ? and users.gender != ? LIMIT 3";
                    db.query(query, [user_Otype, gender], (err, result) => {
                        if(err) console.error(err);
                        else{
                            res.send({list : result});
                        }
                    })
                }
            })
        }else{
            logger.info('로그인이 되어 있지 않습니다.');
            res.render("home/login");
        }
    }
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
    saveMBTI: async(req, res) => {

        const user = new User(req.body);
        const response = await user.saveMBTIInfo();

        const url = {
            method: "/POST",
            path: "/saveMBTI",
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
            path: `/searchInfo`,
            status: response.err ? 409 : 200,
        }
        
        log(response, url);

        return res.status(url.status).json(response);
    },
    searchUserMBTI: async(req, res) => {
        const user = new UserMBTI(req.body);
        const response = await user.searchMBTIInfo();

        const url = {
            method: "/POST",
            path: "/searchUserMBTI",
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
    profile: async(req, res) => {
        const user = new User(req.body);
        const response = await user.searchUserImage();

        const url = {
            method: "/POST",
            path: "/profile",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    test: async(req, res) => {
        const user = new User(req.body);
        const response = await user.saveProfile();

        const url = {
            method: "/POST",
            path: "/test",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    noticeregister: async(req, res) => {
        const user = new User(req.body);
        const response = await user.saveRegisterNotice();

        const url = {
            method: "/POST",
            path: "/notice/register",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    sendMessage: async(req, res) => {
        const user = new User(req.body);
        const response = await user.sendMessage();

        const url = {
            method: "/POST",
            path: "/sendMessage",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    }
};

// test 결과
const result = {
    result: (req, res) =>{
        let idx = req.params.n;
        if(idx > 11){
            logger.info(`GET /image/image${idx} 404 "요청한 페이지가 존재하지 않습니다."`);
            res.render("home/login");
        }else{
            logger.info(`GET /testPage/result-${idx} 304 "MBTI 테스트 결과 화면으로 이동"`);
            res.render(`testResult/result-${idx}`);
        }
    },
    
}

const image = {
    image: (req, res) =>{  
        let idx = req.params.n;
        if(idx > 11){
            logger.info(`GET /image/image${idx} 404 "요청한 페이지가 존재하지 않습니다."`);
            res.render("home/login");
        }else{
            logger.info(`GET /image/image${idx} 304 "MBTI 테스트 결과 화면으로 이동"`);
            res.render(`home/image`);
        }
    }
}

const update = {
    profile : (req, res) => {
        const user = new User(req.body);
        const response = user.updateProfile();

        const url = {
            method: "/PUT",
            path: "/profile",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    changeImage: (req, res) => {
        console.log(req.body);
        const user = new User(req.body);        
        const response = user.changeImage();

        const url = {
            method: "/PUT",
            path: "/changeImage",
            status: response.err ? 409 : 200,
        }

        log(response, url);

        return res.status(url.status).json(response);
    },
    testlike: async(req, res) => {      // dislike = +1, like -1
        const user = new User(req.body);
        const response = await user.testlike();

        const url = {
            method: "/PUT",
            path: "/test/like",
            status: response.err ? 409 : 200,
        }
        log(response, url);

        return res.status(url.status).json(response);
    }
}


module.exports = {
    output,
    process,
    result,
    image,
    update
}

const log = (response, url) => {
    if(response.err)
        logger.error(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.err}`);
    else
        logger.info(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.msg || ""}`);
}
