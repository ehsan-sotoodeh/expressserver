import { resolve } from 'path';
import { rejects } from 'assert';
require('dotenv').config()

const mysql = require('mysql');
class SnippetModel {
    constructor(){
    }

    async getAll(){
        return new Promise((resolve,reject) =>{
            pool.query("select * from snippets where deleted_at IS NULL " ,(error,results)=>{
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
            pool.query("select * from snippets where id=? and deleted_at IS NULL " ,parseInt(id), (error,results)=>{
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

    async getBySearchTerm(searchTerm,columnName="keywords"){
        let searchTermArray = searchTerm.split(',');
        let query = "select * from snippets where deleted_at IS NULL AND ";
        let queryValues = [];
        let wheres = ""
        searchTermArray.map((term,index) =>{
            queryValues.push(`%${term}%`);
            let andOr = (index > 0)? " Or " : "";
            wheres += `${andOr} ${columnName} LIKE ? `;
        });
        console.log(query+wheres)
        return new Promise((resolve,reject) =>{
            let q = pool.query(query+wheres ,queryValues , (error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };

    async deleteOneById(id){
        return new Promise((resolve,reject) =>{
            
            pool.query("UPDATE snippets SET deleted_at=? WHERE id = ?" ,[new Date(), parseInt(id)], (error,results)=>{
                if(error){
                    return reject(error); 
                }
                return resolve(id)
            });
        });
    };


    async save(params){
        //TODO replace userId and private with real data
       params.userId = 1;
       params.private = false;  
        return new Promise((resolve,reject)=>{
            pool.query("INSERT INTO `snippets`  VALUES (?,?,?,?,?,?,?,?);"
                ,[null,params.title,params.keywords,params.content,params.userId,params.private,null,null],(error,results)=>{
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

    async update(params){
        return new Promise((resolve,reject)=>{
            pool.query("UPDATE `snippets` SET `title`=?, `keywords`=? ,`content`=? WHERE `id`=?;",[params.title,params.keywords,params.content,parseInt(params.id)],(error,results)=>{
                if(error){
                    return reject(error);
                }
                
                let updatedSnippet = this.getOneById(parseInt(params.id));
                return resolve(updatedSnippet);
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