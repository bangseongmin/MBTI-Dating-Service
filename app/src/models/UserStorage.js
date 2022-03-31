"use strict";

class UserStorage {
    /* 테스트 값*/
    // 클래스 자체에서 호출할 경우 static을 사용해야 외부에서 사용가능하며, 
    // #을 사용해서 정보은닉을 할수 있음(public -> private)

    static #users = {
        id: ["admin", "나개발", "김팀장"],
        pw: ["1234", "12345", "123456"],
        name: ["강호동", "이수근", "김영철"],
    };

    static getUsers(...fields){
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});

        return newUsers;
    }
}

module.exports = UserStorage;