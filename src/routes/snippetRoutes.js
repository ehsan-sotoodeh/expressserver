import {
    getAll,
    save,
    update,
    getOneById,
    deleteOneById
} from '../controllers/snippetControllers'
const routes = (app)=>{
    app.route('/snippet')
    .get((req,res,next)=>{
        console.log(`request from ${req.originalUrl}`);
        console.log(`request from ${req.method}`);
        next();
    },getAll)

    .post(save)
    .put(update)


    app.route('/snippet/:snippetId')
    .get(getOneById)

    .put((req,res)=>{
        res.send('put request successful!!!');
    })

    .delete(deleteOneById);


}

export default routes;