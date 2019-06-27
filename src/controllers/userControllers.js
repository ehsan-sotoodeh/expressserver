import {UserModel} from '../models/userModel'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
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
    let authenticatedUser = await jwt.verify(token, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (err){
            console.log('auth Failed')
            throw error;
        }
        try{
            let result = await UserModel.getOneByAuthId(decoded.id);
            console.log(result)
            return result;
         }catch(error){
             throw error;
         }

    });
    return authenticatedUser
}
