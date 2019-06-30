import  { Router } from "express";

import {
    getAll,
    save,
    update,
    getOneById,
    deleteOneById,
    getBySearchTerm
} from '../controllers/snippetControllers'
const router = Router();


router.get('/',getAll)
        .post('/',(req,res,next)=>{
                next();
        },save);

        



router.get('/id/:snippetId',((req,res,next)=>{
                next();
        }),getOneById);
router.put('/id/:snippetId',((req,res,next)=>{
                next();
        }),update);

router.delete('/id/:snippetId',((req,res,next)=>{
        next();
}),deleteOneById);


router.get('/search/:search',((req,res,next)=>{
        next();
}),getBySearchTerm)




module.exports = router;


export default router;