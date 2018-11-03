const {MongoClient, ObjectID} = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    /*
    // CREATE
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err)
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    */

    // READ
    db.collection('Todos').find().toArray().then((result) => {
        console.log('Todos');
        console.log(JSON.stringify(result, undefined, 2));
    }).catch((e) => {
        console.log(e);
    });

    db.collection('Todos').find({completed: false}).toArray().then((result) => {
        console.log('Todos');
        console.log(JSON.stringify(result, undefined, 2));
    }).catch((e) => {
        console.log(e);
    });

    // UPDATE


    // DELETE


    client.close();
});