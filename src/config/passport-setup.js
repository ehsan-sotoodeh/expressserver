const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config()
let usersArray = [];
import jwt from 'jsonwebtoken';
import { save,getOneByAuthId,updateToken } from '../controllers/userControllers'


passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{

    usersArray.map(user=>{
        if(user.id === id){
            done(null,user);
        }
    })
    
});


passport.use(
    new GoogleStrategy({
    // option for strategy
        callbackURL : '/auth/google/redirect',
        clientID : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done)=>{
        // passport callback function
        //console.log(profile)
        //made sure you have recorded user's information in Db
        //... if you havn't then do it here.

        let token = jwt.sign({ id: profile.id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_DURATION  // expires in 24 hours
          });
        let newUser = { 
            authId :profile.id, 
            username : profile.displayName,
            authMethod : "google-oauth20",
            profilePhoto : profile.photos[0].value,
            token : token,
        };
        try {

            let currentUserInDb = getOneByAuthId(profile.id);
            currentUserInDb.then(res=>{

                if(res == null){
                    currentUserInDb = save(newUser);
                }else{
                    currentUserInDb = updateToken(profile.id, token)
                }
                currentUserInDb.then(res=>{
                    //console.log(res)
                    //add session to cookie
                    done(null,res); 
    
                })
            });



        } catch (error) {
            throw error;
        }
            


    })
);
