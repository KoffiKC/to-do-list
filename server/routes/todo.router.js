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
    // initilize variable for the incoming task
    let task = req.body.task
    console.log(task);
    
    // wrap SQL command inside of variable 
    let sqlCmd = `
    INSERT INTO "toDo" ("task")
    VALUES ($1);`
    // send 
    pool.query(sqlCmd, [task])
        .then(results => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('task deemed too lame to post', err);
            res.sendStatus(500)
        })
})

// PUT
router.put('/:id', (req, res) => {
    let taskId = req.params.id
    let newCompleteStatus = req.body.complete
    let queryText = 'UPDATE "toDo" SET "complete" = $1 WHERE "id" = $2;'
  
    pool.query(queryText, [newCompleteStatus, taskId])
      .then((result) => {
          console.log('ey ded et');
          res.sendStatus(200)
      }).catch((err) => {
          console.log('we\'ve still got work do to!', queryText, err);
          res.sendStatus(500)
      });
  });

// DELETE

router.delete('/:id', (req, res) => {
    let taskId = req.params.id
  
    let queryText = 'DELETE FROM "toDo" WHERE "id" = $1;'
  
    pool.query(queryText, [taskId])
      .then((result) => {
          console.log('im so done with this');
          res.sendStatus(200)
      }).catch((err) => {
          console.log('does this still need to be done?', queryText, err);
          res.sendStatus(500)
      });
  });

// allows for this route to be used
module.exports = router;