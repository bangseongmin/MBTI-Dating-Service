"use strict";

const UserMBTIStorage = require('./UserMBTIStorage');

class UserMBTI {
    constructor(body){
        this.body = body;
    }

    async searchMBTIInfo() {
        const info = this.body;
        try{
            const user = await UserMBTIStorage.searchMBTIInfo(info.id);
            if(user){
                const msg = user;
                return { success: true, msg: msg};
            }
        }catch(err){
            return { success: false, err };
        }
    }
}

module.exports = UserMBTI;