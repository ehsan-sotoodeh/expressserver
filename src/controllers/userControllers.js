import {UserModel} from '../models/userModel'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import CookieManager from '../config/CookieManager';

import { resolve } from 'url';
dotenv.config();


export const save = async (newUser) =>{
    try{
       let result = await UserModel.save(newUser);
       return (result);
    }catch(error){
        throw error;
    }
}
export const getOneByAuthId = async (auth_id) =>{
    try{
       let result = await UserModel.getOneByAuthId(auth_id);
       return(result);
    }catch(error){
        throw error;
    }
}
export const updateToken = async (auth_id,token) =>{
    try{
       let result = await UserModel.updateToken(auth_id,token);
       return(result);
    }catch(error){
        throw error;
    }
}

export const  authenticate = async (res,token) =>{
    if(!token) return;
    let authenticatedUser = await jwt.verify(token, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (err){
            console.log('auth Failed');
            CookieManager.clearUserCookies(res)
            throw err;
        }
        try{
            let result = await UserModel.getOneByAuthId(decoded.id);
            return result;
         }catch(error){
             throw error;
         }

    });
    return authenticatedUser
}
