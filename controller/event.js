const { response } = require('express');
const Event = require('../models/Events');

const getEvent =async(req, res = response) =>{

    const events = await Event.find()
                            .populate('user','name');
    return res.json({
        ok: true,
        Events: events
    });
}

const postEvent = async(req, res = response) =>{

    const event = new Event( req.body );

    event.user = req.uid;

    try {
        const eventsave = await event.save();
        return res.status(201).json({
            ok: true,
            event: eventsave
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Please talk to the administrator'
        }) 
    }
}

const putEvent = async(req, res = response) =>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );
        if( !event ){
            return  res.status(400).json({
                ok:false,
                msg:'Event not exist with this Id.'
            })
        }

        if(event.user.toString() !== uid ){
            return  res.status(400).json({
                ok:false,
                msg:'You do not have privileges to edit this event.'
            })
        }

        const newEvent ={
            ...req.body,
            user:uid
        };

        const updateEvent = await Event.findByIdAndUpdate( eventId, newEvent,{
            new:true
        } );

        return res.status(201).json({
            ok: true,
            event: updateEvent
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Please talk to the administrator'
        }) 
    }
}

const deleteEvent = async(req, res = response) =>{

    const eventId = req.params.id;
    const event = await Event.findById( eventId );

    if( !event ){
        return  res.status(400).json({
            ok:false,
            msg:'Event not exist with this Id.'
        })
    }

    await Event.findByIdAndDelete( eventId );

    return res.status(201).json({
        ok: true,
        msg: 'The event was deleted.'
    });
}

module.exports ={
    getEvent,
    postEvent,
    putEvent,
    deleteEvent
}