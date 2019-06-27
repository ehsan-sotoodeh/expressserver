import  { Router } from "express";
import passport from 'passport';
import dotenv from 'dotenv';
import { save,getOneByAuthId,updateToken } from '../controllers/userControllers'
import jwt from 'jsonwebtoken';
const passportSetup = require('../config/passport-setup');

dotenv.config();

//auth login
const router = Router();

//google+ login
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/')
});

//auth logOut
router.get('/logout',(req,res)=>{
    //haddle with passport
    req.logout();
    res.redirect('/');
});


export default router;




