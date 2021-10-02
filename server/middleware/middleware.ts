
import {Request, Response} from 'express'

export const middleware = {
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