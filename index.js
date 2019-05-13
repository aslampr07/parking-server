let mysql = require('mysql');
let express = require('express')

let app = express()

app.use(express.json())

const pool = mysql.createPool({
    connectionLimit: 100,
    user: "admin",
    host: "127.0.0.1",
    password: "raspberry",
    database: "parking"
});

let sql = mysql.format("SELECT * FROM user");

app.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    let sql = mysql.format("INSERT INTO user VALUES(?, ?, ?)", [username, password, email])

    pool.query(sql, (err, rows) => {
        if(err) throw err;
        console.log("Data inserted");

        let response = {
            "success": true
        }
        res.json(response)
    })
});

app.get("/gate", (req, res) => {
    let angle = req.query.angle

    const spawn = require('child_process').spawn
    const process = spawn('python', ["servo.py", angle]);

    res.send("OK")
})

app.listen(8000, ()=> {
    console.log("Servier is listernign")
})