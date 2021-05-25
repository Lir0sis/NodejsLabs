const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const { version } = require('process');

const writeDB = (db, status, res, message = '') => {
    fs.writeFile(path.join(__dirname, db), JSON.stringify(res.locals.db_pizza), (err) => {
        if (err) console.log(err);
        res.status(status).end(message);
    });
}
app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(port, () => {
    console.log(`Слушаем порт: ${port}`);
});

app.get('/task', (req, res) => {
    res.status(200).end('Platform:' + os.type() + ' ' + os.platform() + '<br>Nodejs: ' + version)
})

app.use((req, res, next) => {
    fs.readFile(path.join(__dirname, "db_pizza.json"), (err, data) => {
        if (err) console.log(err)
        const db_pizza = data;
        res.locals.db_pizza = JSON.parse(db_pizza.toString());
        next()
    })
})

app.get('/pizza_all', (req, res) => {
    console.log('get all happens')
    let all_ids = []
    Object.keys(res.locals.db_pizza).forEach(e => {
        if (!isNaN(+e))
            all_ids.push(+e)
    });
    res.json({ "ids": all_ids }).end()
})

app.post("/pizza", (req, res) => {
    console.log("Post handled here:")
    console.log(req.body)
    let newID = res.locals.db_pizza["idCounter"] + 1
    res.locals.db_pizza["idCounter"] = newID
    res.locals.db_pizza[newID] = req.body;
    res.json({ "id": newID })
    writeDB("db_pizza.json", 200, res)
})

app.route("/pizza/:id")
    .get((req, res) => {
        obj = res.locals.db_pizza[req.params.id]
        if(obj){
        obj["id"] = req.params.id
        res.json(obj)
        }
        else
            res.json(null)
    })
    .put((req, res) => {
        console.log('put happens')
        const body = req.body
        res.locals.db_pizza[req.params.id] = {
            "name": body.name,
            "quantity": body.quantity,
            "timestamp": body.timestamp
        }
        res.json({ "id": req.params.id })
        writeDB("db_pizza.json", 200, res)

    })
    .delete((req, res) => {
        delete res.locals.db_pizza[req.params.id];
        res.json({ "id": req.params.id })
        writeDB("db_pizza.json", 200, res)
    })


