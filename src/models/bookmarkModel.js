import { resolve } from 'path';
import { rejects } from 'assert';
require('dotenv').config()

const mysql = require('mysql');
class BookmarkModel {
    constructor(){
    }

    
    async bookmark(userId,snippetId){
        return new Promise(async (resolve,reject)=>{
            //check if sippet is already bookmarked
            let isBookmarked = await this.isBookmarked(userId, snippetId);

            if(isBookmarked)
                return resolve("already bookmarked");

            pool.query("INSERT INTO `bookmarks`  VALUES (?,?, ?);",
                [null,snippetId,userId],
                (error,results)=>{
                if(error){
                    return reject(error);
                }

                return resolve("bookmarked");
            });
        });
    };

    async unBookmark(userId,snippetId){
        return new Promise(async (resolve,reject)=>{
            //check if sippet is already bookmarked
            pool.query("DELETE FROM `bookmarks` WHERE `snippetId` = ? and `userId` = ? ",
                [snippetId,userId],
                (error,results)=>{
                if(error){
                    return reject(error);
                }

                return resolve("unBookmarked");
            });
        });
    };

    async isBookmarked(userId,snippetId){
        return new Promise((resolve,reject)=>{
            //check if sippet is already bookmarked
            pool.query("SELECT * from `bookmarks`  WHERE snippetId = ? and userId = ?",
                [snippetId,userId],
                (error,results)=>{
                if(error){
                    return reject(error);
                }
                // is already bookmarked
                if(results.length > 0)
                    return resolve(true);
                
                // not bookmarked yet
                return resolve(false);
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