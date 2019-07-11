import { resolve } from 'path';
import { rejects } from 'assert';
require('dotenv').config()

const mysql = require('mysql');
class SnippetModel {
    constructor(){
    }

    async getAll(userId){
        return new Promise((resolve,reject) =>{
            pool.query("select snippets.id, snippets.title, snippets.keywords, snippets.content, snippets.user, snippets.private, snippets.created_at, snippets.deleted_at, bookmarks.id as bookmarkId, bookmarks.snippetId from snippets LEFT JOIN bookmarks On snippets.id = bookmarks.snippetId  where snippets.deleted_at IS NULL ORDER BY FIELD(snippets.user, ? ) DESC", userId ,(error,results)=>{
                if(error){
                    console.log(error)
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };

    async getMySnippets(userId){
        return new Promise((resolve,reject) =>{
            pool.query("select snippets.id, snippets.title, snippets.keywords, snippets.content, snippets.user, snippets.private, snippets.created_at, snippets.deleted_at, bookmarks.id as bookmarkId, bookmarks.snippetId from snippets LEFT JOIN bookmarks On snippets.id = bookmarks.snippetId  where snippets.deleted_at IS NULL and (snippets.user = ? or  bookmarks.userId = ?) ", [userId,userId] ,(error,results)=>{
                if(error){
                    console.log(error)
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };


    async getOneById(id){
        return new Promise((resolve,reject) =>{
            pool.query("select snippets.id, snippets.title, snippets.keywords, snippets.content, snippets.user, snippets.private, snippets.created_at, snippets.deleted_at, bookmarks.id as bookmarkId, bookmarks.snippetId from snippets LEFT JOIN bookmarks On snippets.id = bookmarks.snippetId where snippets.id=? and deleted_at IS NULL " ,parseInt(id), (error,results)=>{
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

    
    async getBySearchTerm(userId,searchTerm,columnName="keywords"){
        let searchTermArray = searchTerm.split(',');
        let query = "select snippets.id, snippets.title, snippets.keywords, snippets.content, snippets.user, snippets.private, snippets.created_at, snippets.deleted_at, bookmarks.id as bookmarkId, bookmarks.snippetId from snippets LEFT JOIN bookmarks On snippets.id = bookmarks.snippetId where deleted_at IS NULL AND ";
        let queryValues = [];
        let wheres = ""
        searchTermArray.map((term,index) =>{
            queryValues.push(`%${term}%`);
            let andOr = (index > 0)? " Or " : "";
            wheres += `${andOr} ${columnName} LIKE ? `;
        });
        wheres += " ORDER BY FIELD(user, ? ) DESC, bookmarks.id DESC ",
        queryValues.push(parseInt(userId));
        return new Promise((resolve,reject) =>{
            let q = pool.query(query+wheres ,queryValues , (error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };




    async getBySearchTerm2(userId,searchTerm,columnName="keywords"){
        let searchTermArray = searchTerm.split(',');
        let query = "select * from snippets where deleted_at IS NULL AND ";
        let queryValues = [];
        let wheres = ""
        searchTermArray.map((term,index) =>{
            queryValues.push(`%${term}%`);
            let andOr = (index > 0)? " Or " : "";
            wheres += `${andOr} ${columnName} LIKE ? `;
        });
        wheres += " ORDER BY FIELD(user, ? ) DESC ",
        queryValues.push(parseInt(userId));
        return new Promise((resolve,reject) =>{
            let q = pool.query(query+wheres ,queryValues , (error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };



    async deleteOneById(snippetId,userId){
        return new Promise((resolve,reject) =>{
            
            pool.query("UPDATE snippets SET deleted_at=? WHERE id = ? and user=?" ,[new Date(), parseInt(snippetId), parseInt(userId)], (error,results)=>{
                if(error){
                    return reject(error); 
                }
                if(results.affectedRows > 0) return resolve(snippetId)
                else return resolve(-1);
            });
        });
    };


    async save(userId,params){
        //TODO replace private with real data
       params.private = false;  
        return new Promise((resolve,reject)=>{
            pool.query("INSERT INTO `snippets`  VALUES (?,?,?,?,?,?,?,?);"
                ,[null,params.title,params.keywords,params.content,userId,params.private,null,null],(error,results)=>{
                if(error){
                    return reject(error);
                }
                try {
                    const addedSnippet = this.getOneById(results.insertId);
                    return resolve(addedSnippet);
                } catch (error) {
                    throw error;
                }
            });
        });
    };

    async update(userId,params){
        return new Promise((resolve,reject)=>{
            pool.query("UPDATE `snippets` SET `title`=?, `keywords`=? ,`content`=? WHERE `id`=? and user=?;"
                ,[params.title,params.keywords,params.content,parseInt(params.id),parseInt(userId)],(error,results)=>{
                if(error){
                    return reject(error);
                }
                if(results.affectedRows > 0){
                    let updatedSnippet = this.getOneById(parseInt(params.id));
                    return resolve(updatedSnippet);

                }
                return reject("Unauthorized update request");

            });
        });
    };
}

// get by search term
// delete by Id

const pool = mysql.createPool({
    connectionLimit : 10,
    password : process.env.DB_PASSWORD,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    port : process.env.DB_PORT
});

const _SnippetModel = new SnippetModel();
export {_SnippetModel as SnippetModel}