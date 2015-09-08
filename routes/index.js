var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var resultOne = 0, resultTwo = 0, resultThree = 0;


var connection = mysql.createConnection({
  //host     : 'localhost',
  host     : 'ec2-52-24-143-120.us-west-2.compute.amazonaws.com:3306',
  user     : 'root',
  password : '12312312',
  database :'ecommerce',
});

router.get('/logout_user', function(req, res, next) {
  req.session.destroy();
  res.render('login');
});

router.get('/', function(req, res, next) {
  var session_user_value = req.session.end_user;
  if (typeof session_user_value === 'undefined') {
    res.render('login');
  }
  else {
    if(req.session.role == "administrator") {
      connection.query('SELECT * FROM user_answers',function(err,rows) {            
        if(err) {
          console.log("Error Selecting : %s ",err );
        }
        res.render('admin_page',{data:rows});
      });
    }
    else if (req.session.role == "user") {
      res.render('mcq_questions');
    }
    else {
      res.render('login');
    }
  }
});

router.get('/questions', function(req, res, next) {
  res.render('mcq_questions');
});

router.get('/console', function(req, res, next) {
  connection.query('SELECT * FROM user_answers',function(err,rows) {            
    if(err) {
      console.log("Error Selecting : %s ",err );
    }
    res.render('admin_page',{data:rows});
  });
});

router.post('/submitlogin', function(req, res, next) {
  var user_name = req.body.ajaxdata.username;
  var password = req.body.ajaxdata.password;
  validate_login_credentials(user_name,password,req,res);
});

router.post('/submitanswer', function(req, res, next) {
	var answer_one = req.body.ajaxdata.one;
	var answer_two = req.body.ajaxdata.two;
	var answer_three = req.body.ajaxdata.three;
  var feedback_one = req.body.ajaxdata.feedback_one;
  var feedback_two = req.body.ajaxdata.feedback_two;
  var feedback_three = req.body.ajaxdata.feedback_three;
  var user = req.session.end_user;
  console.log("Feedback 3:"+feedback_three);
  insert_answers_db(user,answer_one,answer_two,answer_three,feedback_one,feedback_two,feedback_three);
	res.send('received answers');
});

function validate_login_credentials(user_name,password,req,res) {
  req.session.end_user = user_name;
  var login_result = false;
  //connection.connect();
  connection.query('SELECT * FROM user_credentials where username = ? AND password = ?',[user_name,password],function(err,rows) {            
    if(err) {
      console.log("Error Selecting : %s ",err );
    }
    if(rows.length > 0) {
      if(String(rows[0].role)=="administrator") {
        console.log("admin");
        req.session.role = "administrator";
        res.send({code:'console'});
      }      
      else {
        console.log("user");
        req.session.role = "user";
        res.send({code:'mcq'});
      }
    }
    else {
      res.send({code:'same'});
    }
  });
  //connection.end();
}

function insert_answers_db(user,answer_one,answer_two,answer_three,feedback_one,feedback_two,feedback_three) {
	var insert_data = {
    username: user,
    answer1: answer_one,
    feedback1: feedback_one,
    answer2: answer_two,
    feedback2: feedback_two,
    answer3: answer_three,
    feedback3: feedback_three,
  };
  connection.query('INSERT INTO user_answers set ? ',insert_data,function(err,rows) {            
    if(err) {
      console.log("Error Selecting : %s ",err );
    }
  });

}

module.exports = router;
