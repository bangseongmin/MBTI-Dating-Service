"use strict";

const db = require("../config/dbcon");
const { data } = require("../config/logger");


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
            const query = "INSERT INTO users(id, name, pw, phone, address, gender, age) VALUES(?, ?, ?, ?, ?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw, userInfo.phone, userInfo.address, userInfo.gender, userInfo.age], (err)=> {
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
        // update users SET is_test = false and imagetitle = "1234" where id = "admin";
        return new Promise((resolve, reject) => {
            let query = "Select count(idx) AS count from userMBTI where user_type=?"
            db.query(query, [userInfo.userType], (err, data)=>{

                let count = JSON.stringify(data[0].count);

                let url = `${userInfo.userType}/${parseInt(count+1)}.png`;
                console.log(count);
                console.log(url);

                query = "Insert INTO images(id, image) values(?, ?);"
                db.query(query, [userInfo.id, url], (err, data)=>{
                    if(err) console.log("이미지 저장 중"+err);
                    else {
                        console.log("이미지 저장 성공" + data);
                        query = "UPDATE users SET is_test = true, image = ? WHERE id = ?;";
                        db.query(query, [url, userInfo.id], (err, data)=> {
                            if(err) console.log("에러"+err);
                            else{
                                    // INSERT INTO userMBTI(user_id, user_type, user_Otype) values("admin", 1,1);
                                    query = "INSERT INTO userMBTI(user_id, user_type, user_Otype) VALUES(?, ?, ?);";
                                    db.query(query, [userInfo.id, userInfo.userType, userInfo.userOType], (err)=> {
                                        if(err) reject(`${err}`);
                                        else resolve({ success : true, msg : "저장되셨습니다."});
                                    });

                            }
                        });

                    }
                })
            })
        });
    }

    static async searchUserInfo(id){
        return new Promise((resolve, reject) => {
            const query = "SELECT users.name, users.image, userMBTI.user_type FROM users, userMBTI WHERE users.id = ? and userMBTI.user_id = ?";
            db.query(query, [id, id], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async searchUserImage(id){
        // select imagetitle from images where id = "admin";
        return new Promise((resolve, reject) => {
            let query = "select image from users where id = ?";
            db.query(query, [id], (err, result) => {
                if(err) reject(`${err}`); 
                else{
                    console.log("결과양ㅁ!!"+JSON.stringify(result));
                    query = "SELECT * from images where id = ?";
                    db.query(query, [id], (err, data)=>{
                        if(err) reject(`${err}`);
                        else resolve({ success : true, result: result, list : data});
                    })
                }
            })
        })
    }

    static async updateProfile(userInfo){
        // update profiles SET content = '11121' WHERE id = 'test1';
        return new Promise((resolve, reject) => {
            let query = "update profiles SET content = ? WHERE id = ?";
            db.query(query, [userInfo.content, userInfo.id], (err, data)=>{
                if(err) reject(`${err}`);
                else{
                    query = "update users SET name = ? where id = ?";
                    db.query(query, [userInfo.name, userInfo.id], (err, data)=>{
                        if(err) reject(`${err}`);
                        else resolve({ success : true});
                    })
                }
            })
        })
    }

    static async changeImage(userInfo){
        return new Promise((resolve, reject) => {
            let query = "update users SET image = ? WHERE id = ?";
            db.query(query, [userInfo.image, userInfo.id], (err, data)=>{
                if(err) reject(`${err}`);
                else resolve({ success : true});
            })
        })
    }
}

module.exports = UserStorage;
