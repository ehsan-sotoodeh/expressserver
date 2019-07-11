import {CollectionModel} from '../models/CollectionModel'


export const getCollection = async (req,res) =>{
    try{
       let result = await CollectionModel.getCollection();
       res.json(result);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}



