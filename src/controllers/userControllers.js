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

export const  authenticate =  (res,token) =>{
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err){
            console.log("00000000")
        }
        console.log("111111111111111")

    });
}


// export const getAll = async (req,res) =>{
//     try{
//         let snippets = await SnippetModel.getAll();
//         res.json(snippets);

//     }catch(error){
//         console.error(error);
//         res.sendStatus(500);

//     }
// }

// export const getOneById = async (req,res) =>{

//     try{
//         let snippets = await SnippetModel.getOneById(req.params.snippetId);
//         res.json(snippets);

//     }catch(error){
//         console.error(error);
//         if(error === 404){
//             res.sendStatus(404);
//         }
        
//         res.sendStatus(500);

//     }
// }

// export const getBySearchTerm = async (req,res) =>{
 

//     try{
//         let snippetsByKeyword = await SnippetModel.getBySearchTerm(req.params.searchTerm,'keywords');
//         let snippetsByTitle = await SnippetModel.getBySearchTerm(req.params.searchTerm,'title');
//         let snippetsByContent = await SnippetModel.getBySearchTerm(req.params.searchTerm,'content');
//         let snippets = [...snippetsByKeyword,...snippetsByTitle,...snippetsByContent];
//         let uniqueSnippets = getUniqueByKey(snippets,'id');
//         res.json(uniqueSnippets);

//     }catch(error){
//         res.sendStatus(500);

//     }
// }

// export const deleteOneById = async (req,res) =>{

//     try{
//         let snippets = await SnippetModel.deleteOneById(req.params.snippetId);
//         res.json(snippets);

//     }catch(error){
//         console.error(error);
//         res.sendStatus(500);

//     }
// }


// export const update = async (req,res) =>{

//     try{
//        let result = await SnippetModel.update(req.query);
//        res.json(result);
//     }catch(error){
//         console.error(error);
//         res.sendStatus(500);
//     }
// }


