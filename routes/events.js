const { Router } = require('express');
const { getEvent,postEvent,putEvent,deleteEvent } = require('../controller/event');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( validateJWT );

router.get('/', getEvent);
router.post('/',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatorio').custom(isDate),
    check('end','Fecha fin es obligatorio').custom(isDate),
    validateFields
],postEvent)
router.put('/:id',putEvent)
router.delete('/:id',deleteEvent)


module.exports =  router;