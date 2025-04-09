import JWT from 'jsonwebtoken'
import userModels from '../models/userModel.js';

export const requireSignIn = async(req,res, next) => {
   try{
    const {Auth} = req.cookies
    
    const decode = JWT.verify(Auth,
         process.env.JWT_SECRET
        );
        console.log(decode)
        
        req.user = decode;
        next();
   }
   catch (error){
    res.status(401).send({
        success : false,
        error,
        message : "Error in Admin Middleware"

    });
    console.log(error);
   }
};

export const isAdmin = async (req,res,next) => {
    try{
       const user = await userModels.findById(req.user._id)
       console.log(user.role !=1)
       if(user.role != 1 ){
        
        return res.status(401).send({
             success : false,
           message : "Unauthorized Access"
        })    
       } else{
        console.log("hello")
           next();
       }
    }catch (error){
        console.log(error)
        res.status(401).send({
            success : false,
            error,
            message : "Error in Admin Middleware"

        });
    }
}