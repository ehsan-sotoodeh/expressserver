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
router.get('/google',(req,res,next)=>{
    next();
},passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    CookieManager.setUserCookies(res,req)
    //res.send('<script type="text/javascript">window.location = "http://localhost:3000";</script>');
    res.send('<script type="text/javascript">window.close();</script>');
});

//auth logOut
router.get('/logout',(req,res)=>{
    //haddle with passport
    CookieManager.clearUserCookies(res)


    req.logout();
    res.send('<script type="text/javascript">window.location = "http://localhost:3000";</script>');
});



export default router;




