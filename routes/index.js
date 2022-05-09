var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', api.login)
router.post('/register', api.register)

module.exports = router;
