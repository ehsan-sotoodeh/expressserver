import  { Router } from "express";

import {
    bookmarkOne
} from '../controllers/bookmarkControllers'
const router = Router();





router.post('/snippetId/:snippetId/userId/:userId',((req,res,next)=>{
                next();
        }),bookmarkOne);


// router.delete('/id/:snippetId',((req,res,next)=>{
//         next();
// }),deleteOneById);






module.exports = router;


export default router;