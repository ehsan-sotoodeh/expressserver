import  { Router } from "express";

import {
    getAll,
    getMySnippets,
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

router.get('/mySnippets',((req,res,next)=>{
        next();
}),getMySnippets)




module.exports = router;


export default router;