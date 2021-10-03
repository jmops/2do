
import {Request, Response} from 'express'

export const middleware = {
    /**
     * Check whether or not the user is authenticated. 
     * Check if the session.user is set. This property is set during the login phase. 
     * If the property is not set, the user is not authenticated, and is redirected to /profile/login. 
     * @param req
     * @param res 
     * @param next 
     */
    isAuthenticated : function(req : Request, res : Response, next : Function){
        console.log('middleware')
        if(req.session.user){ // The user is authenticated
            next()
        }
        else{
            res.redirect('/profile/login')
        }
    }
}