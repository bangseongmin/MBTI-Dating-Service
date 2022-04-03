"use strict";

const UserStorage = require('./UserStorage');

/*
    User 클래스는 해당 데이터를 검증 및 조작하는 역할
 */
class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        // const { id, pw } = UserStorage.getUsers('id', 'pw');
        /* Promise를 반환하기 때문에 .then()으로 접근하여 데이터를 가져올 수 있습니다.
           await을 사용해준 이유는 "가독성"입니다.
           fa(파일 시스템)에서도 await으로 가져올 수 있습니다.
           현재는 <pending>으로 데이터를 다 가져오지 못하여서 기다려준 것 */
        const client = this.body;

        try {
            const { id, pw } = await UserStorage.getUserInfo(client.id);

            if (id) {
                if (id === client.id && pw === client.pw) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 일치하지 않습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디 입니다." };
        } catch (err) {
            return { success: false, err };
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);

            return response;
        } catch (err) {

            return { success: false, err };
        }
    }
}

module.exports = User;