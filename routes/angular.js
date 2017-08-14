var express = require('express');
var router = express.Router();

router.get('/prueba', (req, res)=>{
  res.render('angular/prueba',{title: "Angular JS"})
});

module.exports = router;