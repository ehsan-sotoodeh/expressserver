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


router.get('/',((req,res,next)=>{
                res = addCORSAccessControl(res);
                next();
        }),getAll)
        .post('/',(req,res,next)=>{
                console.log("Save a new post");
                next();
        },save);

        



router.get('/id/:snippetId',((req,res,next)=>{
                 console.log(req.cookies)
                 console.log(req.headers)
                next();
        }),getOneById);
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


function addCORSAccessControl(res){
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.set('Access-Control-Allow-Credentials', 'true')
        return res;
}

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