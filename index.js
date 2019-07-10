import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser';
import cookieParser  from 'cookie-parser';
import authRoutes  from './src/routes/authRoutes'
import bookmarkRoutes  from './src/routes/bookmarkRoutes'
const snippetRoutes = require('./src/routes/snippetRoutes') //TODO fix this
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
app.use('/snippets',((req,res,next)=>{
        // middle ware for CORS
        res = addCORSAccessControl(res);
        //console.log(res)

        next();
    }),
    (async (req,res,next)=>{
        //req.cookies.auth_token = "0000"
        console.log(req.cookies.auth_token)

        try {
            let user  = await authenticate(res,req.cookies.auth_token);
            console.log("----------------------------")
            console.log(user)

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            req.user = undefined;
            next();
        }
    })
    , snippetRoutes);


app.use('/auth', authRoutes);


app.use('/bookmark',

        ((req,res,next)=>{
            // middle ware for CORS
            res = addCORSAccessControl(res);
            //console.log(res)

            next();
        }),

        (async (req,res,next)=>{
            //req.cookies.auth_token = "0000"
            try {
                let user  = await authenticate(res,req.cookies.auth_token);
                req.user = user;
                next();
            } catch (error) {
                req.user = undefined;
                next();
            }
        })

        , bookmarkRoutes);





app.get('/test', async (req,res)=>{
    res.send('<script type="text/javascript">window.location = "http://localhost:3000";</script>');
    //res.render('redirect');
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

function addCORSAccessControl(res){
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Allow-Credentials', 'true')
    return res;
}


// HomePageRoute.listen(80,(req,res)=>{
//     console.log(`Hello World`);
// });

