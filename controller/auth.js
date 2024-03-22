const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    try {
        console.log('Create user')
    const{ email, password } = req.body;
    let user = await User.findOne({ email });
    if( user ){
        return  res.status(400).json({
            ok:false,
            msg:'A user with that email already existed.'
        })
    }
     user = new User(req.body);

     //* Encrypt

     const salt = bcrypt.genSaltSync();
     user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //* Generate JWT
        const token = await generateJWT(user.id, user.name);
        res.status(201).json({
            ok:true,
           token:token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Please talk to the administrator'
        }) 
    }
}

const loginUser = async(req, res = response) => {
   try {
        const{ email, password } = req.body;

        const user = await User.findOne({ email });
      
        if( !user ){
            return  res.status(400).json({
                ok:false,
                msg:'The username or password is incorrect 1.'
            })
        }
        
        //* Validate pass
        const validatePass = bcrypt.compareSync( password, user.password);
       
        if(! validatePass ){
            return  res.status(400).json({
                ok:false,
                msg:'The username or password is incorrect.'
            })
        }

        //* Generate JWT

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
           ok:true,
           token:token
        })
   } catch (error) {
    res.status(500).json({
        ok:false,
        msg:'Please talk to the administrator'
    }) 
   }
}

const revalidaToken = async(req, res = response) => {

    const {uid, name } = req;
     //* Regenerate JWT
     const token = await generateJWT(uid, name);

     res.status(201).json({
        ok:true,
        token:token
     })
}

module.exports ={
    createUser,
    loginUser,revalidaToken
}