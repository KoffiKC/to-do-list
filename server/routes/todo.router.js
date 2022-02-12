const express = require('express');
const router = express.Router();

// connects us to our database
const pool = require('../modules/pool');

// GET
router.get('/',(req,res)=>{
    let queryText = 'SELECT * FROM "toDo";';
    // console.log(req.body);
    
    pool.query(queryText)
        .then((result)=>{
            res.send(result.rows);
        }).catch((err)=>{
            console.log('oops all errors', queryText, err);
            res.sendStatus(500);   
    })
})

// POST
router.post('/', (req, res) => {
    let task = req.body.task
    console.log(task);
    

    let sqlCmd = `
    INSERT INTO "toDo" ("task")
    VALUES ($1);`
    
    pool.query(sqlCmd, [task])
        .then(results => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('task deemed too lame to post', err);
            res.sendStatus(500)
        })
})


// PUT


// DELETE

// allows for this route to be used
module.exports = router;