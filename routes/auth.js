const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser,loginUser,revalidaToken } = require('../controller/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

/* 
    User Route / Aut
    host + /api/v1/auth

*/

router.post('/new',
            [
                check('name','El nombre es obligatorio').not().isEmpty(),
                check('email','El email es obligatorio').isEmail(),
                check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
                validateFields
            ], createUser);

router.post('/',
            [
                check('email','El email es obligatorio').isEmail(),
                check('password','El password debe de ser de 6 caracteres').isLength({min:6}),
                validateFields
            ], loginUser);

router.get('/renew',validateJWT,revalidaToken);


module.exports = router;