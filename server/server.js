var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);

    var myTodo = new Todo({
        text: req.body.text
    });

    myTodo.save().then((todo) => {
        console.log('Saved todo', todo);
        res.send(todo);
    }).catch((e) => {
        console.log('Unable to save Todo', e);
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((e) => {
        res.status(400).send({e});
    });
});

app.get('/todos:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send('Id not valid!');
    }
    
    Todo.findById(id)
    .then((todo) => {
        if(!todo) {
	        return res.status(404).send('Id not valid!');
		}
        res.send({todo});
    }).catch((e) => {
        res.status(400).send({e});
    });

});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

// TEST
/*
var myUser = new User({
    email: 'gb@gmail.com'
});

var myTodo = new Todo({
    text: 'Learn Node.js',
    completed: false
});

var otherTodo = new Todo({
    text: 'Learn Botkit',
    completed: false
});

myUser.save().then((user) => {
    console.log('Saved user', user);
}).catch((e) => {
    console.log('Unable to save User', e);
});

myTodo.save().then((todo) => {
    console.log('Saved todo', todo);
}).catch((e) => {
    console.log('Unable to save Todo', e);
});

otherTodo.save().then((todo) => {
    console.log('Saved todo', JSON.stringify(todo, undefined, 2));
}).catch((e) => {
    console.log('Unable to save Todo', e);
});
*/

module.exports = {app};
