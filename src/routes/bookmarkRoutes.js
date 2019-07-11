import  { Router } from "express";

import {
    bookmark,unBookmark
} from '../controllers/bookmarkControllers'
const router = Router();





router
        .post('/snippetId/:snippetId',((req,res,next)=>{
                next();
        }),bookmark)
        .delete('/snippetId/:snippetId',((req,res,next)=>{
                next();
        }),unBookmark)



// router.delete('/id/:snippetId',((req,res,next)=>{
//         next();
// }),deleteOneById);






module.exports = router;


export default router;