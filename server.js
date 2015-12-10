var express=require('express');
var app = express();
//var session = require("express-session");
var cookieParser = require('cookie-parser');
var http = require('http').Server(app);
var bodyParser = require("body-parser");

//app.use(session({secret:'ads'}));
var statusArray = Array.apply(null, Array(24)).map(Number.prototype.valueOf,0);
var status = 1;  //CURRENT STATUS
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 16; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var allowedID=makeid();

app.get('/stuff.html',function(req,res){
	if(req.cookies["code"]==allowedID){	
		res.sendfile("stuff.html")
	}
});
app.post('/login', function(req,res){
	//var username = req.body.username;
	console.log(req.body);
	var p1 = req.body.p1;
	var p2 = req.body.p2;
	var p3 = req.body.p3;
	var data = {
			"error":1
		};
	if(p1=="Gnome" && p2=="*xD :P" && p3=="Chicken"){
		data["error"]=0;
		var sessionID = makeid();
		allowedID = sessionID;
		var cookCode = {"sessionID": sessionID}; 
		res.cookie("code", sessionID);
	}
	res.json(data);

});

app.use('/', express.static(__dirname));

var port =  process.env.OPENSHIFT_NODEJS_PORT || 8080;   // Port 8080 if you run locally
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"; // Listening to localhost if you run locally
app.listen(port, address);