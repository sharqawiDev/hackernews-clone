import { ErrorRequestHandler } from "express";

export     // error handler middleware so errors in the backend do not show to the client users
    const errHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.log('Uncaught exception:', err);
        return res.status(500).send('Oops! An error occurred, please try again later. ');
    }