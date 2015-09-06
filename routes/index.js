var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var resultOne = 0, resultTwo = 0, resultThree = 0;


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12312312',
  database :'ecommerce',
});

/* GET home page. */
router.get('/questions', function(req, res, next) {
  res.render('mcq_questions');
});

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/submitlogin', function(req, res, next) {
  console.log("within post!");
  var user_name = req.body.ajaxdata.username;
  var password = req.body.ajaxdata.password;
  validate_login_credentials(user_name,password);
  res.send('received login information');
});

router.post('/submitanswer', function(req, res, next) {
	console.log("within post!");
	/*var answerOne = req.body.group1;
	var answerTwo = req.body.group2;
	var answerThree = req.body.group3;
	console.log(answerOne);
	validateAnswers(answerOne,answerTwo,answerThree);*/
	var answer_one = req.body.ajaxdata.one;
	var answer_two = req.body.ajaxdata.two;
	var answer_three = req.body.ajaxdata.three;
	insert_answers_db(answer_one,answer_two,answer_three);
	res.send('received answers');
});

function validate_login_credentials(user_name,password) {
  console.log(user_name);
  console.log(password);
}

function insert_answers_db(answer_one,answer_two,answer_three) {
	
}

/*function validateAnswers(answerOne,answerTwo,answerThree) {
  connection.query('SELECT * FROM rightAnswers',function(err,rows) {            
    if(err) {
      console.log("Error Selecting : %s ",err );
    }
    if(Number(answerOne) == rows[0].right_answer) {
    	resultOne = 1;
    }
    else {
    	resultOne = 0;
    }
    if(Number(answerTwo) == rows[1].right_answer) {
    	resultTwo = 1;
    }
    else {
    	resultTwo = 0;
    }
    if(Number(answerThree) == rows[2].right_answer) {
    	resultThree = 1;
    }
    else {
    	resultThree = 0;
    }
    }); 
       
  }*/


module.exports = router;
