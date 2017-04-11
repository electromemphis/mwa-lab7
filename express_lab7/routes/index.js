var express = require('express');
var router = express.Router();

//mongo config
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/testDb",{native_parser:true});

//crypto
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes256','asaadsaad');

/* GET home page. */
router.get('/', function(req, res, next) {

    db.bind('homework7');
    db.homework7.findOne({},(err, item)=>{
      if(err) throw err;
      let decrypted = decipher.update(item.message, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      db.close();
      res.render('index', { msg: decrypted });
    });
});

module.exports = router;
