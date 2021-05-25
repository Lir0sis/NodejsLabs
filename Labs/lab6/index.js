const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();
const port = 8000;

const bodyParser = require('body-parser');
const { version } = require('process');

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const urlDb = 'mongodb+srv://Lir0sis:958733@lab6cluster.slkgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/", express.static("public"));

MongoClient.connect(urlDb, (err, client) => {
    if (err) console.log(err);
    console.log("Подключились к БД");

    app.listen(port, () => console.log(`Слушаем порт: '${port}`));

    const collection = client.db('lab6').collection('orders');
    app.locals.collection = collection;

    process.on('SIGINT', () => {
        console.log("Отключились от БД");
        client.close();
        process.exit();
    });
});

// app.get('/', (request, responce) => {
//     responce.render('index');
// });

app.get('/task', (req, res) => {
    res.status(200).end('Platform:' + os.type() + ' ' + os.platform() + '<br>Nodejs: ' + version)
})


app.get('/pizza_all', (req, res) => {
    console.log('get all happens')
    let all_ids = []
    app.locals.collection.find({}).forEach(e => {
        all_ids.push(e._id)
    }).then(() => {
        res.json({ "ids": all_ids }).end()
    })

})

app.get('/pizza', (req, res) => {
    let orders = []
    app.locals.collection.find({}).forEach(e => {
        orders.push({
            "id": e._id,
            "name": e.name,
            "quantity": e.quantity,
            "timestamp": e.timestamp
        })
    }).then(() => {
        res.json({ "orders": orders}).end()
    })
})

app.post("/pizza", (req, res) => {
    app.locals.collection.insertOne(req.body, (err, result) => {
        if (err) console.log(err)
        res.json({ "id": result.insertedId })
    })
})

app.route("/pizza/:id")
    .get((req, res) => {
        app.locals.collection.findOne(mongodb.ObjectID(req.params.id), (err, result) => {
            if (result) {
                res.json({
                    "id": result._id,
                    "name": result.name,
                    "quantity": result.quantity,
                    "timestamp": result.timestamp
                })
            }
            else
                res.json(null)
        })
    })
    .put((req, res) => {
        app.locals.collection.updateOne({ _id: mongodb.ObjectID(req.params.id) },
            { $set: req.body }, (err, result) => {
                if (err) console.log(err)
                res.json({ "id": req.params.id })
            })
    })
    .delete((req, res) => {
        app.locals.collection.deleteOne({ _id: mongodb.ObjectID(req.params.id) }, (err, result) => {
            if (err) console.log(err)
            res.json({ "id": req.params.id })
        })
    })


