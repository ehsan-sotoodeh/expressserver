import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import authRoutes  from './src/routes/authRoutes'
const snippetRoutes = require('./src/routes/snippetRoutes')
import { authenticate } from './src/controllers/userControllers'
require('dotenv').config()



const app = express();
const PORT = process.env.PORT_NUMBER;


app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser());

var cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// set up routes
app.use('/snippets', (async (req,res,next)=>{
    //req.cookies.auth_token = "0000"
    try {
        let user  = await authenticate(res,req.cookies.auth_token);
        req.user = user
    } catch (error) {
        console.log(error)
    }

    next();

}), snippetRoutes);


app.use('/auth', authRoutes);
app.get('/test', async (req,res)=>{
    let user  = await authenticate(res,req.query['token']);
    res.send(user)
});




app.get('/',(req,res)=>{
    res.send(`Node and Express server is running on port ${PORT}`);
});

app.listen(PORT,()=>{
    console.log(`Your server is running on port ${PORT}`);
});

const HomePageRoute = express();

HomePageRoute.get('/',(req,res)=>{
    res.send(`<h1>Hello World</h1>`);
});
// HomePageRoute.listen(80,(req,res)=>{
//     console.log(`Hello World`);
// });

