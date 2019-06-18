import { resolve } from 'path';
import { rejects } from 'assert';

const mysql = require('mysql');
class SnippetModel {
    constructor(){

    }

    async getAll(){
        return new Promise((resolve,reject) =>{
            pool.query("select * from snippets" , (error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results)
            });
        });
    };

    async getOneById(id){
        return new Promise((resolve,reject) =>{
            pool.query("select * from snippets where id=?" ,parseInt(id), (error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results[0])
            });
        });
    };

    async deleteOneById(id){
        return new Promise((resolve,reject) =>{
            pool.query("delete from snippets where id=?" ,parseInt(id), (error,results)=>{
                if(error){
                    return reject(error); 
                }
                return resolve(results[0])
            });
        });
    };


    async save(params){
        return new Promise((resolve,reject)=>{
            pool.query("INSERT INTO `snippets`  VALUES (?,?, ?, ? );",[null,params.title,params.keywords,params.content],(error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };

    async update(params){
        console.log(params)
        return new Promise((resolve,reject)=>{
            pool.query("UPDATE `snippets` SET `title`=?, `keywords`=? ,`content`=? WHERE `id`=?;",[params.title,params.keywords,params.content,parseInt(params.id)],(error,results)=>{
                if(error){
                    return reject(error);
                }
                return resolve(results);
            });
        });
    };
}

// get by search term
// delete by Id

const pool = mysql.createPool({
    connectionLimit : 10,
    password : 'qzN83XxqXuT%',
    user : "snippetsAdmin",
    database : "snippetsDb",
    host : "localhost",
    port : "3306"
});

const _SnippetModel = new SnippetModel();
export {_SnippetModel as SnippetModel}