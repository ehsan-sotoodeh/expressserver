import  { Router } from "express";

import {
    getCollection
} from '../controllers/collectionControllers'
const router = Router();





router
        .get('/',((req,res,next)=>{
                next();
        }),getCollection)




// router.delete('/id/:snippetId',((req,res,next)=>{
//         next();
// }),deleteOneById);






module.exports = router;


export default router;