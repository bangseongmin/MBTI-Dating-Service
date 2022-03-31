"use strict";

const UserStorage = require('./UserStorage');

class User{
    constructor(body){
        this.body = body;
    }

    login(){
        // const { id, pw } = UserStorage.getUsers('id', 'pw');
        const client = this.body;
        const { id, pw } = UserStorage.getUserInfo(client.id);
        
        if(id){
            if(id === client.id && pw === client.pw){
                return { success: true};
            }
            return { success: false, msg : "비밀번호가 일치하지 않습니다."};
        }
        return { success: false, msg : "존재하지 않는 아이디 입니다."};
    }

    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;