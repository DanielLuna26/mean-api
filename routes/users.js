'use strict'

var express = require('express');
var router = express.Router();
var UserController = require('../app/Controller/UserController');

router.get('/users', UserController.getUsers);
router.post('/user', UserController.singUp);
router.delete('/user/:id', UserController.deleteUser);
router.put('/user/:id', UserController.updateUser);

router.get('/user', UserController.getUsersView);
router.get('/', (req, res)=>{
  res.render('index', {title: "Index"});
})

router.get('/user/register', (req, res)=>{
  res.render('users/register',{title: "Registro"});
});
router.get('/user/login', UserController.viewLogin);
router.post('/user/login', UserController.singIn);


module.exports = router;