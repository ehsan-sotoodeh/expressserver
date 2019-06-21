import {
    getAll,
    save,
    update,
    getOneById,
    deleteOneById,
    getBySearchTerm
} from '../controllers/snippetControllers'
const routes = (app)=>{
    app.route('/snippet')
    .get((req,res,next)=>{
        console.log(`request from ${req.originalUrl}`);
        console.log(`request from ${req.method}`);
        next();
    },getAll)

    .post(save)
    .put(update);


    app.route('/snippet/:snippetId')
    .get(getOneById)

    .put(update)

    .delete(deleteOneById);


    app.route('/snippet/search/:searchTerm')
    .get(getBySearchTerm);



}

export default routes;