import express, { RequestHandler } from "express"

const app = express();
// to handle json requests in express (express does not support json automatically)
app.use(express.json())

const posts: any[] = []


/**
 * 
 * @param req the request object
 * @param res the response object
 * @param next to call the next middleware  
 * 
 * middleware is a point that the request will always passthrough before or after going to the request handler methods below (get and post), where you can do any logic you want, like authentication, logging, and printing any useful data.
 */

const requestsLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(`${req.method} request: ${req.path}\nBody: ${JSON.stringify(req.body)}\n`)
    next();
}

app.use(requestsLoggerMiddleware)

app.get('/posts', (req, res) => {
    res.send({ posts })
})

app.post('/posts', (req, res) => {
    const post = req.body;
    posts.push(post);
    // you must send status 200 ok
    res.sendStatus(200)
})


app.listen(3000)

