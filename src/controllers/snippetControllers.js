import {SnippetModel} from '../models/snippetModels'

export const getAll = async (req,res) =>{
    try{
        let snippets = await SnippetModel.getAll();
        res.json(snippets);

    }catch(error){
        console.log(error);
        res.sendStatus(500);

    }
}

export const getOneById = async (req,res) =>{
    try{
        let snippets = await SnippetModel.getOneById(req.params.snippetId);
        res.json(snippets);

    }catch(error){
        console.log(error);
        res.sendStatus(500);

    }
}

export const deleteOneById = async (req,res) =>{
    try{
        let snippets = await SnippetModel.deleteOneById(req.params.snippetId);
        res.json(snippets);

    }catch(error){
        console.log(error);
        res.sendStatus(500);

    }
}

export const save = async (req,res) =>{
    try{
       let result = await SnippetModel.save(req.query);
       res.json(result);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
export const update = async (req,res) =>{
    try{
       let result = await SnippetModel.update(req.query);
       res.json(result);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}