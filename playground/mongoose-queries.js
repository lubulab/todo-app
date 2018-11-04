const {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');

var id = '5bddd3839d2aa70a53feff13';

if (!ObjectID.isValid()){
    console.log('Id not valid!');
}

Todo.find({
    _id: id
}).then((todo) => {
    console.log(todo);
}).catch((e) => {
    console.log(e);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
}).catch((e) => {
    console.log(e);
});

Todo.findById(id)
.then((todo) => {
    console.log(todo);
}).catch((e) => {
    console.log(e);
});