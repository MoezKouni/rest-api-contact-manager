const express = require('express')
const router = express.Router()

const Person = require('../model/Person')
const User = require('../model/User')
const authMiddleware = require('../middlewares/authMiddleware')

// get all persons
router.get('/all-users', (req, res) => {
    Person.find()
        .then(persons => res.json(persons))
        .catch(err => {
            console.log(err.message)
            res.send('Server Error')
        })
})

// get all persons of the connected user
router.get('/', authMiddleware, (req, res) => {
    Person.find({user: req.userId})
        .then(persons => res.json(persons))
        .catch(err => {
            console.log(err.message)
            res.send('Server Error')
        })
})

// get Public users
router.get('/public', authMiddleware, (req, res) => {
    Person.find({isPublic: true}).sort({created_at: -1})
        .then(persons => res.json(persons))
        .catch(err => {
            console.log(err.message)
            res.send('Server Error')
        })
})

// Add new person
router.post('/', authMiddleware, (req, res) => {
    let randomNum = Math.floor(Math.random() * 100) % 40
    let newPerson = new Person({
        ...req.body,
        user: req.userId,
        avatar: `https://randomuser.me/api/portraits/${req.body.sexe}/${randomNum}.jpg`
    })
    newPerson.save()
        .then(person => res.json(person))
        .catch(err => {
            console.log(err.message)
            res.send('Server error')
        })
})

// Delete person
router.delete('/:id', authMiddleware, (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person.user == req.userId){
                Person.findByIdAndRemove(req.params.id)
                    .then(() => res.send('Person deleted!'))
                    .catch(err => {
                        console.log(err.message)
                        res.send('Server Error')
                    })
            } else {
                return res.status(401).json({ msg: 'You can only delete yours!'})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.send('Server error')
        })
})

// Update person
router.put('/:id', authMiddleware, (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person.user == req.userId){
                Person.findByIdAndUpdate(req.params.id, req.body, (err, person) => {
                    if (err) {
                        console.log(err.message)
                        return res.send('Server error')
                    }
                    res.json({ msg: 'Person updated'})
                })
            }
        })
        .catch(err => {
            console.log(err.message)
            res.send('server error')
        })
})

module.exports = router