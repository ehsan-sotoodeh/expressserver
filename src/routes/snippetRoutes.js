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
        .post(save);



router.get('/id/:snippetId',getOneById)
        .put(update)
        .delete(deleteOneById)
        .put(update);

router.get('/search/:search',getBySearchTerm)



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