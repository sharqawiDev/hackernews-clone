import express, { ErrorRequestHandler, RequestHandler } from "express"
import { createPostHandler, listPostsHandler } from "./handlers/PostHandler";
import asyncHandler from "express-async-handler"
import { initDB } from "./datastore";
import { signInHandler, signUpHandler } from "./handlers/AuthHandler";
import { requestsLoggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorHandlerMiddleware";

(async () => {
    await initDB();
    const app = express();
    // to handle json requests in express (express does not support json automatically)
    app.use(express.json())


    app.use(requestsLoggerMiddleware)

    app.get('/v1/posts', asyncHandler(listPostsHandler));
    app.post('/v1/posts', asyncHandler(createPostHandler))

    app.post('/v1/signUp', asyncHandler(signUpHandler))
    app.post('/v1/signIn', asyncHandler(signInHandler))

    app.use(errHandler)

    app.listen(3000)
})()



