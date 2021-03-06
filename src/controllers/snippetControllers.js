import {SnippetModel} from '../models/snippetModels'

export const getAll = async (req,res) =>{
    let userId = -1;
    if(req.user) 
        userId = req.user.id;
    
    try{
        let snippets = await SnippetModel.getAll(userId);
        res.json(snippets);

    }catch(error){
        res.sendStatus(500);

    }
}
export const getMySnippets = async (req,res) =>{
    let userId = -1;
    if(req.user) 
        userId = req.user.id;
    
    try{
        let snippets = await SnippetModel.getMySnippets(userId);
        res.json(snippets);

    }catch(error){
        res.sendStatus(500);

    }
}

export const getOneById = async (req,res) =>{

    try{
        let snippets = await SnippetModel.getOneById(req.params.snippetId);
        res.json(snippets);

    }catch(error){
        console.error(error);
        if(error === 404){
            res.sendStatus(404);
        }
        
        res.sendStatus(500);

    }
}

export const getBySearchTerm = async (req,res) =>{
    let userId = -1;
    if(req.user) 
        userId = req.user.id;

    try{
        let snippetsByKeyword = await SnippetModel.getBySearchTerm(userId,req.params.search,'keywords');
        let snippetsByTitle = await SnippetModel.getBySearchTerm(userId,req.params.search,'title');
        let snippetsByContent = await SnippetModel.getBySearchTerm(userId,req.params.search,'content');
        let snippets = [...snippetsByKeyword,...snippetsByTitle,...snippetsByContent];
        let uniqueSnippets = getUniqueByKey(snippets,'id');
        res.json(uniqueSnippets);

    }catch(error){
        res.sendStatus(500);

    }
}

export const deleteOneById = async (req,res) =>{
    let userId = -1;
    if(req.user) 
        userId = req.user.id;

    try{
        let snippets = await SnippetModel.deleteOneById(req.params.snippetId,userId);
        res.json(snippets);

    }catch(error){
        console.error(error);
        res.sendStatus(500);

    }
}

export const save = async (req,res) =>{
    let userId = -1;
    if(req.user){
        userId = req.user.id;
    }else{
        res.sendStatus(500);
        return
    }


    try{
       let result = await SnippetModel.save(userId,req.query);
       res.json(result);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}
export const update = async (req,res) =>{
    let userId = -1;
    if(req.user) 
        userId = req.user.id;

    try{
       let result = await SnippetModel.update(userId,req.query);
       res.json(result);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

function getUniqueByKey(inputSnippets,key){
    //based on the key remove the duplications 
    let resultsSnippets = [];
    let snippetsInArray = [];
    inputSnippets.map(snippet =>{
        if(snippetsInArray.indexOf(snippet[key]) === -1){
            //if not in array then add it to results array
            resultsSnippets.push(snippet);
            snippetsInArray.push(snippet[key]);
        }
    });
   return resultsSnippets
}
