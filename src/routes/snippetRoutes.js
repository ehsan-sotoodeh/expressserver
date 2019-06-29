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
                console.log("Save a new post");
                next();
        },save);

        



router.get('/id/:snippetId',getOneById);
router.put('/id/:snippetId',((req,res,next)=>{
                console.log("put method");
                next();
        }),update);

router.delete('/id/:snippetId',((req,res,next)=>{
        console.log("deleteOneById");
        next();
}),deleteOneById);


router.get('/search/:search',((req,res,next)=>{
        console.log("search request");
        next();
}),getBySearchTerm)



module.exports = router;

// const routes = (app)=>{
//     app.route('/snippets')
//     .get((req,res,next)=>{
//         console.log(`request from ${req.originalUrl}`);
//         console.log(`request from ${req.method}`);
//         next();
//     },getAll)

//     .post(save)
//     .put(update);


//     app.route('/snippet/:snippetId')
//     .get(getOneById)

//     .put(update)

//     .delete(deleteOneById);


//     app.route('/snippets/search/:searchTerm')
//     .get(getBySearchTerm);

//     app.route('/snippets/search/')
//     .get(getAll);
 


// }

export default router;