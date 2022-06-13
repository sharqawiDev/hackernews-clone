import express, { ErrorRequestHandler, RequestHandler } from "express"
import { createPostHandler, listPostsHandler } from "./handlers/PostHandler";
const app = express();
// to handle json requests in express (express does not support json automatically)
app.use(express.json())



const requestsLoggerMiddleware: RequestHandler = (req, res, next) => {
    /*
     * 
     * @param next to call the next middleware  
     * 
     * middleware is a point that the request will always passthrough before or after going to the request handler methods below (get and post), where you can do any logic you want, like authentication, logging, and printing any useful data.
     */
    console.log(`${req.method} request: ${req.path}\nBody: ${JSON.stringify(req.body)}\n`)
    next();
}

app.use(requestsLoggerMiddleware)

app.get('/posts', listPostsHandler)

app.post('/posts', createPostHandler)


// error handler middleware so errors in the backend do not show to the client users
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('Uncaught exception:', err);
    return res.status(500).send('Oops! An error occurred, please try again later. ');
}

app.use(errHandler)

app.listen(3000)

