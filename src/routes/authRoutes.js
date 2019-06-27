import  { Router } from "express";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { save,getOneByAuthId,updateToken } from '../controllers/userControllers'
import jwt from 'jsonwebtoken';

dotenv.config();

//auth login
const router = Router();

// router.get('/login',(req,res)=>{
//     console.log('auth/login')
//     res.send("login");
// });

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    //get user from db by id
    usersArray.map(user=>{
        console.log(user)
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
                    console.log(res)
                    done(null,res); 
    
                })
            });



        } catch (error) {
            throw error;
        }
            


    })
);


//google+ login
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/')
});

export default router;

// //auth logOut
// router.get('/logout',(req,res)=>{
//     //haddle with passport
//     req.logout();
//     res.redirect('/');
// });

// //auth login
// router.get('/google',passport.authenticate('google',{
//     scope:['profile']
// }));

// router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{

//     //res.send(req.user)
//     res.redirect('/profile/')
// });

