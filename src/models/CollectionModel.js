import { resolve } from 'path';
import { rejects } from 'assert';
require('dotenv').config()
import {SnippetModel} from '../models/snippetModels'

const mysql = require('mysql');
class CollectionModel {
    constructor(){
    }

    
    async getCollection(userId,snippetId){
        return new Promise(async (resolve,reject)=>{
            pool.query("select keywords from snippets",
                async (error,results)=>{
                if(error){
                    return reject(error);
                }
                const keywordsList = results.map(row =>{
                    return row.keywords.split(" ");
                });
                let collection = {};
                keywordsList.forEach(keywords => {
                    keywords.forEach(keyword => {
                        if(collection[keyword]){
                            collection[keyword] = collection[keyword]+1;
                        }else{
                            collection[keyword] = 1
                        }
                    });
                });

                return resolve(collection);
            });
        });
    };

}


const pool = mysql.createPool({
    connectionLimit : 10,
    password : process.env.DB_PASSWORD,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST
});

const _CollectionModel = new CollectionModel();
export {_CollectionModel as CollectionModel}