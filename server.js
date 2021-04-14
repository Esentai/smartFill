const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host: "127.0.0.1",
    user: "root",
    database: "smartfill",
    password: "root"
})

app.get('/gep', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from gep', (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
app.get('/ep', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from ep', (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
app.get('/regions', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from regions', (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})
app.get('/cities', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query('SELECT * from cities', (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// // Get a beer by ID
// app.get('/:id', (req, res) => {
//
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)
//
//         connection.query('SELECT * from beers WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release() // return the connection to pool
//
//             if(!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }
//
//         })
//     })
// })
//
// // Delete a records / beer
app.delete('/gep/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from gep WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Gep with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})
app.delete('/ep/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from ep WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`Ep with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})
app.delete('/regions/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from regions WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(`regions with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})
app.delete('/cities/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        console.log(req.params.id);
        connection.query('DELETE from cities WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(`cities with the Record ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }

        })
    })
})




//
//
// Add a record / beer
app.post('/gep', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        let sql = 'INSERT INTO `gep` (`ID`, `name`, `minimum_score`) VALUES (?, ?, ?)';
        let data = [req.body.params.ID, req.body.params.name, req.body.params.minimum_score];
        connection.query(sql,data, (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(`Beer with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.post('/ep', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        console.log(req.body.params);
        let sql = 'INSERT INTO `ep` (`ID`, `name`, `ID_gep`) VALUES (?, ?, ?)';
        let data = [req.body.params.ID, req.body.params.name, req.body.params.ID_gep];
        connection.query(sql,data, (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(`EP with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.post('/regions', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        console.log(req.body.params);
        let sql = 'INSERT INTO `regions` (`ID`, `name`) VALUES (?, ?)';
        let data = [req.body.params.ID, req.body.params.name];
        connection.query(sql,data, (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(`regions with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})

app.post('/cities', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        console.log(req.body.params);
        let sql = 'INSERT INTO `cities` (`ID`, `name`, `region_id`) VALUES (?, ?, ?)';
        let data = [req.body.params.ID, req.body.params.name, req.body.params.region_id];
        connection.query(sql,data, (err, rows) => {
            connection.release() // return the connection to pool
            if(!err) {
                res.send(`regions with the name: ${params.name} has been added.`)
            } else {
                console.log(err)
            }
        })
    })
})



//
//
// // Update a record / beer
// app.put('', (req, res) => {
//
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)
//
//         const { id, name, tagline, description, image } = req.body
//
//         connection.query('UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?', [name, tagline, description, image, id] , (err, rows) => {
//             connection.release() // return the connection to pool
//
//             if(!err) {
//                 res.send(`Beer with the name: ${name} has been added.`)
//             } else {
//                 console.log(err)
//             }
//
//         })
//
//         console.log(req.body)
//     })
// })



// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))