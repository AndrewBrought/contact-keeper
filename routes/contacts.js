const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User');
const Contact = require('../models/Contact');

//  @route          GET api/contacts
//@desc             Get all users contacts
//@access           Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        await res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

//  @route          POST api/contacts
//@desc             Add new contact
//@access           Private
router.post(
    '/',
[
    auth,
    [
        check('name', 'Name is required')
            .not()
            .isEmpty()
]
],
   async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, linkedIn, facebook, instagram, twitter, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            linkedIn,
            facebook,
            instagram,
            twitter,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        await res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

//  @route          PUT api/contacts/:id
//@desc             Update contact
//@access           Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, linkedIn, facebook, instagram, twitter, type } = req.body;

//    Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(linkedIn) contactFields.linkedIn = linkedIn;
    if(facebook) contactFields.facebook = facebook;
    if(instagram) contactFields.instagram = instagram;
    if(twitter) contactFields.twitter = twitter;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found' });

    //    make sure user owns contact, int the tut it's supposed to be contact.user.toString() but intellij is telling me it's not an appropriate comparison...leaving it off for now
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true });

        await res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

//  @route          DELETE api/contacts/:id
//@desc             Delete contact
//@access           Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: 'Contact not found' });

        //    make sure user owns contact, in the tut it's supposed to be contact.user.toString() but intellij is telling me it's not an appropriate comparison...leaving it off for now
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

       await Contact.findByIdAndRemove(req.params.id);

        await res.json({msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }
});

module.exports = router;
