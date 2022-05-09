var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', api.login)
router.post('/register', api.register)

router.put('/products/:id', api.dataUpdate)
router.post('/products', api.dataAdd)
router.get('/products', api.dataFindAll)
router.get('/products/:id', api.dataById)
router.delete('/products/:id', api.dataDelete)
module.exports = router;
