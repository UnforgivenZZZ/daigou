
var express = require('express');
var app = express();
var ip = process.argv[2].toString(); 


//template installation
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');

//middleware for static files: css img etc
var path = require('path');
app.use(express.static(path.join(__dirname + '/public')));

//DO NOT FCKING USE THIS FUNCTION
//MYSQL DOESNT LIKE IT IDK Y
app.set('port',process.env.PORT || 8080);

//mysql dababase connection
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  path	   : '/Users/jialiangzhou/Desktop/daigou', 
  user     : 'jialiangzhou',
  password : '6239130',
  database : 'cangku'
});
db.connect(function(err){
	if(err){
		console.log(err);
	}else{
		console.log('connected successfully');
	}
});


var items = [];		//gloable variable used to store all items in items table


app.get('/',function(req,res){

	console.log(items.length);

	var qry = 'select dir, picture, price, des,post_date FROM items GROUP BY dir,picture,price,des,post_date ORDER BY post_date DESC';
	db.query(qry, function(err,rows){
	if(err){
		console.log(err);
	}else{
		items = rows;
		console.log('data extracted');
		console.log('query processing successfully');
		console.log(rows);

		res.render('daigou',{items:items});
		console.log('****home page data as above******');
		}
	});

	// res.render('daigou',{items:items});
	console.log('routing to home page-------');

});

app.get('/img/:item', function(req,res){

	var qry = "select * from imgs where dir='/" + 'img/'+ req.params.item + "/'";
	console.log(qry);
	db.query(qry, function(err,rows){
		if(err){
			console.log(err);
		}else{
			var pics = [];
			pics = rows;
			console.log("item detailed accessed");
			res.render('detail', {pics:pics});
		}
	});
	
});



//404 error page
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//500 error page
app.use(function(req,res,next){
	res.status(500);
	res.render('500');
});

app.listen(8080  ,function(){
	console.log('started on http://' + ip + ':' + app.get('port'));
});