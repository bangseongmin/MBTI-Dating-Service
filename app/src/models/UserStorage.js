"use strict";

const db = require("../config/dbcon");


/*
    UserStorage는 DB를 CRUD 역할
    클래스 자체에서 호출할 경우 static을 사용해야 외부에서 사용가능하며, 
    #을 사용해서 정보은닉을 할수 있음(public -> private)            */
class UserStorage {

    // 로그인
    static async getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data)=> {

                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }
    
    // 회원가입
    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, name, pw, phone, address, gender) VALUES(?, ?, ?, ?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw, userInfo.phone, userInfo.address, userInfo.gender], (err)=> {
                if(err) reject(`${err}`);
                else resolve({ success : true });
            });
        });
    }

    // 아이디 찾기
    static async getFindInfo(phone) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE phone = ?;";
            db.query(query, [phone], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    // 비밀번호 찾기
    static async getFindInfo2(id, phone) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ? && phone = ?;";
            db.query(query, [id, phone], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    // 비밀번호 설정 
    static async updatePassword(id, pw) {
        // update users SET pw = '1111' WHERE id = '1111';
        return new Promise((resolve, reject) => {
            const query = "UPDATE users SET pw = ? WHERE id = ?;";
            db.query(query, [pw, id], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve({ success : true });
            });
        });
    }
    
    // 테스트 결과 확인
    static async saveTestResult(id) {
        // update users SET is_test = false WHERE id = 'admin';
        return new Promise((resolve, reject) => {
            const query = "UPDATE users SET  is_test = true WHERE id = ?;";
            db.query(query, [id], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    // MBTI 정보 저장
    static async saveMBTIInfo(userInfo){
        // SELECT * FROM userMBTI WHERE user_id = "test";
        return new Promise((resolve, reject) => {
            let query = "UPDATE users SET  is_test = true WHERE id = ?;";
            db.query(query, [userInfo.id], (err, data)=> {
                if(err) console.log("에러"+err);
                else{
                    if(typeof data[0] === 'undefined'){
                        // INSERT INTO userMBTI(user_id, user_type, user_Otype) values("admin", 1,1);
                        query = "INSERT INTO userMBTI(user_id, user_type, user_Otype) VALUES(?, ?, ?);";
                        db.query(query, [userInfo.id, userInfo.userType, userInfo.userOType], (err)=> {
                            if(err) reject(`${err}`);
                            else resolve({ success : true, msg : "저장되셨습니다."});
                        });
                    }else{
                        // update userMBTI SET user_type = 2 where user_id = "test";
                        query = "UPDATE userMBTI SET user_type = ?, user_Otype = ? WHERE user_id = ?;";
                        db.query(query, [userInfo.userType, userInfo.userOType, userInfo.id], (err, data)=> {
                            if(err) reject(`${err}`);
                            else resolve({ success : true , msg : "업데이트 되셨습니다."});
                        });
                    }
                }
            });
        });
    }

    static async searchUserInfo(id){
        return new Promise((resolve, reject) => {
            const query = "SELECT users.name, userMBTI.user_type FROM users, userMBTI WHERE users.id = ? and userMBTI.user_id = ?";
            db.query(query, [id, id], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }
}

module.exports = UserStorage;
