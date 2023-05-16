const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6305655',
  password: '6305655',
  database: 'u6305655',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})

app.get('/Loan', function(req, res) {
  connection.query(
    'SELECT * FROM Loan',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/Employee', function(req, res) {
  connection.query(
    'SELECT * FROM Employee',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/Equipment', function(req, res) {
  connection.query(
    'SELECT * FROM Equipment',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/quantity', function(req, res) {
  connection.query(
    'SELECT e.name AS equipment_name, COUNT(l.equipment_id) AS loan_count ' +
    'FROM Equipment e ' +
    'JOIN Loan l ON e.equipment_id = l.equipment_id ' +
    'GROUP BY e.name ' +
    'ORDER BY loan_count DESC;',
    function(err, results) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log(results); // แสดงผลที่ console
        res.json(results); // ตอบกลับ request
      }
    }
  );
});


app.listen(5000, () => {
  console.log('Server is started.')
})
