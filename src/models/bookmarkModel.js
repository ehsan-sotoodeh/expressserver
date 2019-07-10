import { resolve } from 'path';
import { rejects } from 'assert';
require('dotenv').config()

const mysql = require('mysql');
class BookmarkModel {
    constructor(){
    }

    
    async bookmarkOne(userId,snippetId){
        return new Promise((resolve,reject)=>{
            pool.query("INSERT INTO `bookmarks`  VALUES (?,?, ?);",
                [null,snippetId,userId],
                (error,results)=>{
                if(error){
                    return reject(error);
                }

                return resolve(results);
            });
        });
    };


    // async getOneByAuthId(auth_id){
    //     return new Promise((resolve,reject) =>{
    //         pool.query("select * from users where auth_id = ? " ,[auth_id], (error,results)=>{
    //             if(error){
    //                 console.log(error)
    //                 return reject(error);
    //             }
    //             if(results.length > 0){
    //                 return resolve(results[0]);  
    //             }else {
    //                 return resolve(null);

    //             }
    //         });
    //     });
    // };






}


const pool = mysql.createPool({
    connectionLimit : 10,
    password : process.env.DB_PASSWORD,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST
});

const _BookmarkModel = new BookmarkModel();
export {_BookmarkModel as BookmarkModel}