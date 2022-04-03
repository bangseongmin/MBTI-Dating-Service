"use strict";

const db = require("../config/dbcon");


/*
    UserStorage는 DB를 CRUD 역할
    클래스 자체에서 호출할 경우 static을 사용해야 외부에서 사용가능하며, 
    #을 사용해서 정보은닉을 할수 있음(public -> private)            */
class UserStorage {


    static getUsers(isAll, ...fields) {

    }

    static getUserInfo(id) {
        // Mysql은 프라미스를 지원해주지 않아 직접 Promise 처리가 필요
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM abc WHERE id = ?;";
            db.query(query, [id], (err, data)=> {
                if(err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        // Mysql은 프라미스를 지원해주지 않아 직접 Promise 처리가 필요
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO abc(id, name, pw) VALUES(?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.name, userInfo.pw], (err)=> {
                if(err) reject(`${err}`);
                else resolve({ success : true });
            });
        });
    }
}

module.exports = UserStorage;

/*


static #getUserInfo(data, id) {
    //     const users = JSON.parse(data);

    //     const idx = users.id.indexOf(id);       // 해당 ID의 인덱스
    //     const usersKeys = Object.keys(users);   // => [id, pw, name]
    //     const userInfo = usersKeys.reduce((newUser, info) => {
    //         newUser[info] = users[info][idx];
    //         return newUser;
    //     }, {});
    //     console.log(userInfo);
    //     return userInfo;
    // }

    // static #getUsers(data, isAll, fields) {
    //     const users = JSON.parse(data);

    //     if (isAll) return users;

    //     const newUsers = fields.reduce((newUsers, field) => {
    //         if (users.hasOwnProperty(field)) {
    //             newUsers[field] = users[field];
    //         }
    //         return newUsers;
    //     }, {});

    //     return newUsers;
    // }
        현재 경로는 app.js 기준
        const fs = require('fs').promises;


    static getUserInfo(id) {
        return fs.readFile('./src/databases/users.json')
        .then((data) => {
            return this.#getUserInfo(data, id);
        })
        .catch(console.error);
    }

    static getUsers(isAll, ...fields) {
        return fs
            .readFile('./src/databases/users.json')
            .then((data) => {
                return this.#getUsers(data, isAll, fields);
            })
            .catch(console.error);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        
        // 이미 존재하는 아이디
        if(users.id.includes(userInfo.id)){
            throw "이미 존재하는 아이디입니다.";
        }

        // 데이터 추가        
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.pw.push(userInfo.pw);
        
        fs.writeFile('./src/databases/users.json', JSON.stringify(users));

        return {success : true};
        
    }
 */