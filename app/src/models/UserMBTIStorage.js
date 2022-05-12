'use strict';

const db = require("../config/dbcon");

class UserMBTIStorage {
    /* Select user_id, user_type, user_Otype from userMBTI where user_id = 'men1'; */
    static async searchMBTIInfo(id){
        return new Promise((resolve, reject) => {
            let query = "select userMBTI.user_type, userMBTI.user_type, users.gender from users INNER JOIN userMBTI ON users.id = userMBTI.user_id where users.id = ?;";
            db.query(query, [id], (err, data)=> {
                if(err) reject(`${err}`);
                else {
                    let user_type = data[0].user_type;
                    let user_Otype = data[0].user_Otype;
                    let user_gender = data[0].gender;
                    query = "select users.id, users.name from users INNER JOIN userMBTI ON users.id = userMBTI.user_id where userMBTI.user_type = ? AND userMBTI.user_Otype = ? AND users.gender != ?;"
                    db.query(query, [user_Otype, user_type, user_gender], (err, datas) => {
                        console.log("result :" +datas);
                        if(err) reject(`${err}`);
                        else resolve({ success : true, data });
                    });
                }
            });
        });
    }
}

module.exports = UserMBTIStorage;