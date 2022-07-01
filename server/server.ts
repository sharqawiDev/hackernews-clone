import express, { ErrorRequestHandler, RequestHandler } from "express"
import { createPostHandler, listPostsHandler } from "./handlers/PostHandler";
import asyncHandler from "express-async-handler"
import { initDB } from "./datastore";
import { signInHandler, signUpHandler } from "./handlers/AuthHandler";
import { requestsLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorHandlerMiddleware";
import dotenv from "dotenv"
import { authMiddleware } from "./middleware/authMiddleware";
(async () => {
    await initDB();
    dotenv.config();
    const app = express();
    // to handle json requests in express (express does not support json automatically)
    app.use(express.json())

    app.use(requestsLoggerMiddleware)

    app.get('/healthz', (req, res) => res.send({ status: 'OK 🤡' }))
    app.post('/v1/signUp', asyncHandler(signUpHandler))
    app.post('/v1/signIn', asyncHandler(signInHandler))

    app.use(authMiddleware)

    // protected endpoints (only authorized users)
    app.get('/v1/posts', asyncHandler(listPostsHandler));
    app.post('/v1/posts', asyncHandler(createPostHandler))


    app.use(errHandler)

    app.listen(process.env.PORT || 3000)
    console.log(`jwt secret ${process.env.JWT_SECRET} | salt: ${process.env.PASSWORD_SALT}`)
})()



