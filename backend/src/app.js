import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials:true
    }
))

app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

//routes
import userRoutes from './routes/user.routes.js'
import storyRoutes from './routes/story.routes.js'
import categoryRoutes from './routes/category.routes.js'

//routes declare
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/stories',storyRoutes)
app.use('/api/v1/categories',categoryRoutes)

export default app