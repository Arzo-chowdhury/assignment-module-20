
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from './app/config/config.js';




const app = express();

//default Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}));
app.use(helmet());
app.use(cookieParser());

//limitter
const limiter = rateLimit({windowMs: REQUEST_TIME, max:REQUEST_NUMBER});
app.use(limiter);


//cache
app.set('etag', WEB_CACHE);



//database connect
mongoose.connect(DATABASE,{autoindex: true}).then(()=>{ 
    console.log("MongoDB connected");
}).catch(()=>{ 
    console.log("MongoDB disconnected");
})


//routes
app.use("/api/v1" , router)

app.listen(PORT, ()=> {
    console.log("Server started on port " + PORT)
})