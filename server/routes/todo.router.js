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


// PUT


// DELETE

// allows for this route to be used
module.exports = router;