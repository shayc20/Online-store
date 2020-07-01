var express = require("express");
var app = express();



//**************************************/
// Server Configuration
//**************************************/

//Render HTML from the endpoints

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

// server static files(js,css,img,pdf)

app.use(express.static(__dirname +"/public"));

// Configure body-parser

var bparser = require('body-parser');
app.use(bparser.json());

// DB connection to mongo DB

var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var mongoDB = mongoose.connection; //Contains DB conection
var itemDB;

//**************************************/
// Server HTML
//**************************************/

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/admin', function(req, res){
    res.render('admin.html');
});

app.get('/about', function(req, res){
    res.send('<h1 style="color:blue">Shamus Cerny</h1>');
});

app.get('/contact', function(req, res){
    res.send('<p>Please Contact me at <b>shaycerny20@gmail.com</b></p>');
});

//**************************************/
// API Endpoints
//**************************************/
var list = [];

app.post('/API/items', function(req, res){
    var item = req.body;
    // create a DB object
    var itemforDB = itemDB(item);
    
    // save the obj on DB
    itemforDB.save(function(error, savedObject){
        if(error){
            // something went wrong
            console.log('Error Saving the item' + error);
            res.status(500);// server error
            res.send(error);// = return
        }
        //no error
        res.status(201);//ok created
        res.json(savedObject);

    });
});

app.get('/API/items', function(req, res){
    itemDB.find({}, function(error, data){
        if(error){
            res.status(500);
            res.send(error);
        }
        //no error
        
        res.json(data);
    });
});

mongoDB.on('error',function(error){
    console.log('Error connection to DB ' + error);
});

mongoDB.on('open', function(){
    console.log('Yay DB conection sucesful'); 
});


//start the project
app.listen(8080, function(){
    console.log("server running at localhost:8080"); 

    //predefine schema for items table
    var itemsSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        user: String
    });

    itemDB = mongoose.model('catalog', itemsSchema);
});



// API -> Application Programming Interface

//ctrl + c == Kill the server.

