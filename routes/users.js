const express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user");
const router = express.Router();

//Create
router.post('/users', (req, res) => {
   const user = new User(req.body);
   user.save()
     .then((result) => {
       res.status(201).json(result);
     })
     .catch((error) => {
       res.status(500).json({ error: error.message });
     });
});

//Read users
router.get('/users', (req, res) => {
   User
     .find()
     .then((result) => {
       res.status(201).json(result);
     })
     .catch((error) => {
       res.status(500).json({ error: error.message });
     });
});

//Get a user
router.get('/users/:id', (req, res) => {
   const {id} = req.params;
   User
     .findById(id)
     .then((result) => {
       res.status(201).json(result);
     })
     .catch((error) => {
       res.status(500).json({ error: error.message });
     });
});

//Update
router.put('/users/:id', (req, res) => {
   const {id} = req.params;
   const {name, email, password} = req.body;
   User
     .updateOne({_id: id}, {$set:{name, email, password }})
     .then((result) => {
       res.status(201).json(result);
     })
     .catch((error) => {
       res.status(500).json({ error: error.message });
     });
});

//Delete
router.delete('/users/:id', (req, res) => {
   const {id} = req.params;
   User
     .findByIdAndDelete({_id: id})
     .then((result) => {
       res.status(201).json(result);
     })
     .catch((error) => {
       res.status(500).json({ error: error.message });
     });
});


module.exports = router;
