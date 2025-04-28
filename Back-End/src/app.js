import  express from  'express'
import cors  from 'cors'
import  morgan from  'morgan'
import authRoutes from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import blogPostRoute from "./routes/blogPost.route.js";
import categoryRoute from "./routes/category.route.js";
import commentRoute from "./routes/comment.route.js";
import errorHandler from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";

// App Init

const APP = express()
APP.use(express.json())
APP.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

APP.disable("x-powered-by")
APP.use(morgan(process.env.NODE_ENV==='production'?'combined':'dev'))

// Routes
APP
    .use('/api/v1/auth',authRoutes)
    .use('/api/v1/users',userRoute)
    .use('/api/v1/blog-post',blogPostRoute)
    .use('/api/v1/categories',categoryRoute)
    .use('/api/v1/comments',commentRoute)

// APP.use('/api/v1/admin')

// Error Handling Middleware
APP
    .use(notFoundMiddleware)
    .use(errorHandler)


export  default  APP