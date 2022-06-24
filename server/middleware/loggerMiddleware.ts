import { RequestHandler } from "express";

export const requestsLoggerMiddleware: RequestHandler = (req, res, next) => {
    /*
     * 
     * @param next to call the next middleware  
     * 
     * middleware is a point that the request will always passthrough before or after going to the request handler methods below (get and post), where you can do any logic you want, like authentication, logging, and printing any useful data.
     */
    console.log(`${req.method} request: ${req.path}\nBody: ${JSON.stringify(req.body)}\n`)
    next();
}