import {BookmarkModel} from '../models/bookmarkModel'


export const bookmarkOne = async (req,res) =>{
    let userId = -1;
    if(req.user){
        userId = req.user.id;
    }else{
        res.sendStatus(500);
        return
    }

    try{
       let result = await BookmarkModel.bookmarkOne(userId,req.params.snippetId);
       res.json(result);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

// export const deleteOneById = async (req,res) =>{
//     let userId = -1;
//     if(req.user) 
//         userId = req.user.id;

//     try{
//         let snippets = await SnippetModel.deleteOneById(req.params.snippetId,userId);
//         res.json(snippets);

//     }catch(error){
//         console.error(error);
//         res.sendStatus(500);

//     }
// }



