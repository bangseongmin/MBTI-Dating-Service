"use strict";

const { cli } = require('winston/lib/winston/config');
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
            const user = await UserStorage.getUserInfo(client.id);

            if (user) {
                if (user.id === client.id && user.pw === client.pw) {
                    
                    if(user.is_test == 0){
                        return { success: true, msg: "false" };
                    }
                    else{
                        return { success: true, msg: "true" };
                    }
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

    async findUsername(){
        const client = this.body;
        try{
            const user = await UserStorage.getFindInfo(client.phone);
            if (user) {
                const msg = user.id;

                return { success: true, msg: msg};
            }
            return { success: false, msg: "가입된 아이디가 없습니다.." };
        } catch (err) {
            return { success: false, err };
        }
    }

    async findPassword(){
        const client = this.body;
        try{
            const user = await UserStorage.getFindInfo2(client.id, client.phone);
            if (user) {
                return { success: true};
            }
            return { success: false, msg: "가입된 아이디가 없습니다.." };
        } catch (err) {
            return { success: false, err };
        }
    }

    async updatePassword(){
        const client = this.body;
        try{
            const response = await UserStorage.updatePassword(client.id, client.pw);
            return { success: true};;
        } catch (err) {
            return { success: false, err };
        }
    }

    async saveTestResult(){
        const client = this.body;
        try{
            const response = await UserStorage.saveTestResult(client.id);
            return { success: true};;
        }catch (err) {
            return { success: false, err };
        }
    }

    async saveMBTIInfo(){
        const client = this.body;
        try{
            const response = await UserStorage.saveMBTIInfo(client);
            return { success: true};
        }catch(err){
            return {success: false, err};
        }
    }

    async searchUserInfo(){
        const client = this.body;
        try{
            const user = await UserStorage.searchUserInfo(client.id);
            if (user) {
                const msg = user;

                return { success: true, msg: msg};
            }
        }catch(err){
            return { success: false, err };
        }
    }

    async searchUserImage(){
        const client = this.body;
        try{
            const user = await UserStorage.searchUserImage(client.id);
            if(user){
                console.log(user);
                return {success:user.success, list:user.list, result : user.result}
            }
        }catch(err){
            return { success: user.success , err };
        }
    }

    async updateProfile(){
        const client = this.body;
        try{
            const user = await UserStorage.updateProfile(client);
            if(user){
                const msg = user;
                return { success: true, msg: msg};
            }
        }catch(err){
            return { success: user.success , err };
        }
    }

    async changeImage(){
        const client = this.body;
        try{
            const user = await UserStorage.changeImage(client);
            if(user){
                const msg = user;
                return { success: true, msg: msg};
            }
        }catch(err){
            return { success: false , err };
        }
    }
}

module.exports = User;