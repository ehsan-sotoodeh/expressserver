import { resolve } from 'path';
import { rejects } from 'assert';
require('dotenv').config()

const mysql = require('mysql');
class UserModel {
    constructor(){
    }

    async getAll(){
        return new Promise((resolve,reject) =>{
            pool.query("select * from users" , (error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };

    async getOneById(id){
        return new Promise((resolve,reject) =>{
            pool.query("select * from users where id=?" ,parseInt(id), (error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.length > 0)
                    return resolve(results[0]);
                else 
                    return reject(404);
            });
        });
    };

    async getOneByToken(id){
        return new Promise((resolve,reject) =>{
            pool.query("select * from users where token=?" ,parseInt(id), (error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.length > 0)
                    return resolve(results[0]);
                else 
                    return reject(404);
            });
        });
    };


    async deleteOneById(id){
        // return new Promise((resolve,reject) =>{
        //     pool.query("delete from snippets where id=?" ,parseInt(id), (error,results)=>{
        //         if(error){
        //             return reject(error); 
        //         }
        //         return resolve(id)
        //     });
        // });
    };


    async save(params){
        return new Promise((resolve,reject)=>{
            pool.query("INSERT INTO `users`  VALUES (?,?, ?, ? ,?,?,?);",
                [null,params.username,params.authId,params.authMethod,params.profilePhoto,params.token,null],
                (error,results)=>{
                if(error){
                    return reject(error);
                }
                let updatedUser = this.getOneByAuthId(params.authId);

                return resolve(updatedUser);
            });
        });
    };

    async getOneByAuthId(auth_id){
        return new Promise((resolve,reject) =>{
            pool.query("select * from users where auth_id = ? " ,[auth_id], (error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.length > 0){
                    return resolve(results[0]);  
                }else {
                    return resolve(null);

                }
            });
        });
    };



    async updateToken(auth_id,token){
        return new Promise((resolve,reject)=>{
            pool.query("UPDATE `users` SET `token`=? where `auth_id` = ? ;",[token,auth_id],(error,results)=>{
                if(error){
                    return reject(error);
                }
                
                let updatedUser = this.getOneByAuthId(auth_id);
                return resolve(updatedUser);
            });
        });
    };
    async update(params){
        // return new Promise((resolve,reject)=>{
        //     pool.query("UPDATE `snippets` SET `title`=?, `keywords`=? ,`content`=? WHERE `id`=?;",[params.title,params.keywords,params.content,parseInt(params.id)],(error,results)=>{
        //         if(error){
        //             return reject(error);
        //         }
                
        //         let updatedSnippet = this.getOneById(parseInt(params.id));
        //         return resolve(updatedSnippet);
        //     });
        // });
    };
}

// get by search term
// delete by Id

const pool = mysql.createPool({
    connectionLimit : 10,
    password : process.env.DB_PASSWORD,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST
});

const _UserModel = new UserModel();
export {_UserModel as UserModel}