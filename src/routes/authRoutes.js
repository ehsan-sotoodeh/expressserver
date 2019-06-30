import  { Router } from "express";
import passport from 'passport';
import dotenv from 'dotenv';
const passportSetup = require('../config/passport-setup');
const GoogleStrategy = require('passport-google-oauth20');

dotenv.config();

//auth login
const router = Router();

//google+ login
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.cookie("auth_token", req.user.token);
    res.redirect('/')
});

//auth logOut
router.get('/logout',(req,res)=>{
    //haddle with passport
    res.clearCookie("auth_token");


    req.logout();
    res.redirect('/');
});


export default router;




