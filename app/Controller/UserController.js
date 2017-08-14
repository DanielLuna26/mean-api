'use strict'

var User = require('../Model/User');
var jwt = require('jsonwebtoken');
var config = require('../../config/main');
const gases = 'gases';
exports.getUsers = (req, res)=>{
  User.find({},(err, users)=>{
    res.send({users: users, title: "Usuarios"});
  });
}

exports.getUsersView = (req, res)=>{
    res.render('users/users');
}

exports.singUp = (req, res) => {
  var params = req.body;
  var newUser = new User();
  newUser.name = params.name;
  newUser.username = params.username;
  newUser.email = params.email;
  newUser.password = newUser.generateHash(params.password);
  newUser.save((err, saveUser)=>{
    if(err) {
      console.log(err.Message);
    } else {
      if(saveUser) {
        res.status(500).send({success: true, message: "Usuario registrado."});
      }
    }
  });
};

exports.deleteUser = (req, res)=>{
  var id = req.params.id;
  User.remove({_id:id}, (err, user)=>{
    if(err){
      console.log(err.Message);
    } else {
      if(user) {
        res.status(200).send({success: true, message: "Usuario eliminado."})
      }
    }
  })
}

exports.updateUser = (req, res)=>{
  var id = req.params.id;
  User.update({_id: id}, {$set: User}, (err, userUpdated)=>{    
  })
}

exports.viewLogin = (req, res)=>{
  res.render('users/login',{title: 'Login'});
}

exports.singIn = (req, res)=>{
  var params = req.body;
  User.findOne({email: params.email}, (err, user)=>{
    var validpassword = user.comparePassword(params.password);
    if(!validpassword) {
      res.status(500).send({error: "Error en las credenciales."})
    } else {
      var token = jwt.sign(user, config.SECRET,{ 
        expiresIn: 10000
      });
      res.status(200).send({token: token});
    }
  });
};