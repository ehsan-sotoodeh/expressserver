import  { Router } from "express";
import passport from 'passport';
import dotenv from 'dotenv';
import CookieManager from '../config/CookieManager';
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
    CookieManager.setUserCookies(res,req)
    res.redirect('/')
});

//auth logOut
router.get('/logout',(req,res)=>{
    //haddle with passport
    CookieManager.clearUserCookies(res)


    req.logout();
    res.redirect('/');
});



export default router;




