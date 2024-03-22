const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT =(req, res = response, next) =>{
    //* x-token header
    const token = req.header('x-token');
    if(!token){
        return  res.status(400).json({
            ok:false,
            msg:'User is not login'
        }) 
    }
    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SED
        );
        
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return  res.status(401).json({
            ok:false,
            msg:'Invalid token'
        }) 
    }
    next();

}

module.exports={
    validateJWT
}