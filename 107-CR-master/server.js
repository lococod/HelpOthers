var express = require("express");
var app = express(); // create an app
var itemList = []; //store items on this array
var ItemDB;
var MessageDB;


////configuration page

//////enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

//config body-parse to read info in request
var bparser = require("body-parser");
app.use(bparser.json());



//to server statif files (css, js, img, pdfs)
app.use(express.static(__dirname + '/public'))

//to serve HTML
var ejs = require('ejs');
app.set('views', __dirname + '/public'); // where are the Html files?
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//MongoDB connection config
var mongoose = require('mongoose');
mongoose.connect("mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var db = mongoose.connection;

//web server endpoints


app.get('/', (req, res) => {
    res.render('catalog.html');
});

app.get('/contact', (req, res) => {
    res.render('contact.html');
});

app.get('/aboutme', (req, res) => {
    res.render('about.html');
});

app.get('/exc/:message', (req, res) => {
    console.log("Message from client: ", req.params.message);

    var msg = req.params.message;
    var vowels = '';
    var allVowels = ['a', 'e', 'i', 'o', 'u'];
    // 1 travel the msj string and print on the console each letter
    // 2 check if each letter is a vowel
    // if it is, add the vowel to vowels string
    for (var i = 0; i < msg.length; i++) {
        var letter = msg[i];
        console.log(letter);
        if (allVowels.indexOf(letter.toLowerCase()) != -1) {
            vowels += letter;
        }

        //3 vowels only return each vowel once
        // example : Hellooooo -> only eo
        // what is should look like : This is a test => iae

    }


    res.status(202);
    res.send(vowels);
});





//API End Points

app.post('/api/items', (req, res) => {
    console.log("clients wants to store items");


    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(
        function (error, savedItem) {
            if (error) {
                console.log("**Error saving item", error);
                res.status(500);//internal server error
                res.send(error);

            }
            //no error
            console.log("Item Saved!!!!");
            res.status(201);  //created
            res.json(savedItem);
        }
    );
});

app.post('/api/message',(req, res) =>{
    var messageForMongo = MessageDB(req.body);
    messageForMongo.save(function(error, savedMessage){
        if(error){
            console.log("Error saving", error);
            res.status(500);
            res.send(error);
        }
        
        console.log("Message Saved!");
        res.status(201);
        res.json(savedMessage);

    });

});

// app.get('/api/message', (req, res) => {
//     MessageDB.find({}, function (error, data) {
//         if (error) {
//             res.status(404);//not found
//             res.send(error);
//         }

//         res.status(200); //ok
//         res.json(data);
//     });
// });

/*       item.id = itemList.length + 1; //create a consecutive id
    itemList.push(item); 

    res.status(201); //201 => created
    res.json(item); //return the item as json 
});  */

app.get('/api/items', (req, res) => {
    ItemDB.find({}, function (error, data) {
        if (error) {
            res.status(404);//not found
            res.send(error);
        }

        res.status(200); //ok
        res.json(data);
    });
});

app.get('/api/items/:id', (req, res) => {
    var id = req.params.id;

    ItemDB.find({ _id: id }, function (error, item) {
        if (error) {
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(item);
    })
});

app.get('/api/message', (req, res) => {
    var name = req.params.name;
    MessageDB.find({user: "Gill"}, function (error, data) {
        if (error) {
            res.status(404);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    });
});

app.delete('/api/items', (req, res) => {
    var item = req.body;

    ItemDB.findByIDAndRemove(item._id, function (error) {
        if (error) {
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.send("Item removed!");
    })

});

//Start Server

db.on('open', function () {
    console.log("DB connection success.");

    //Data types allowed for schemas;
    //String, Number, Data, Buffer, Boolean, ObjectId, Array

    //define structure(models) fort he objects on each collection
    var itemsSchema = mongoose.Schema({
        code: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        stock: Number,
        deliveryDays: Number,
        user: String
    });

    var messageSchema = mongoose.Schema({
        name: String,
        messages: String,
        user: String

    });

        //create constructor (mongoose model)
        ItemDB = mongoose.model("itemsCh6", itemsSchema);
        MessageDB = mongoose.model("messagesCh6", messageSchema);


});

db.on('error', function () {
    console.log("Error connecting to database.");
});

app.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
    console.log("Press Ctrl+C to kill it");
});

/**
 *
 * 1 - DONEcreate contact.html
 * 2 - DONErender from /contact
 * 3 - DONEcheck that on localhost:8080/contact you can see the page
 * 4 - DONECreate a form inside html page
 * 5 - DONEcreate the model and api to handle messages
 * 6 - DONEcreate a contact.js file that catches the click on send button
 * 7 - DONEcreate an AJAX post request to /api/messages  - admin js
 * 8 - Create endpoint Get on /api/message that retreives and sends all the messages
 * 9 - modify admin.js, on Init call a retrieveMessages function that gets the messages from /api/messages
}
 */

 //make sure font is not white for competency report!