var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e)
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});


//GET /todos/2324234
app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    if(!ObjectID.isValid(id)){
        // res.send({
        //     err: "Todo ID is not valid"
        // })
        console.log('Todo ID is not valid')
        res.status(404).send()
    }else{
        Todo.findById(id).then((todo) => {
            if(!todo){
                console.log('Todo not found')
                return res.status(404).send()
            }
            
                console.log('Successful')
                res.send({todo})
            
        }, (e) => {
            res.status(400).send(e)
        })
    }
})
 
app.listen(3000, () => {
    console.log(`Server started up at port ${port}`)
});

module.exports = {app}