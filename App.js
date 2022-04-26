const express = require('express')
const app = express()
const mysql = require('mysql')
const  dotenv = require('dotenv')
const path =require('path')

const cors=require("cors");
const { query } = require('express');
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}


dotenv.config({path:'./config.env'})

const user = 'onlinet2_vatsal'
const pass = 'Vatsal@10177'
const host = 'localhost'
const database = 'onlinet2_wp357'


app.use(cors(corsOptions))

const db = mysql.createConnection({
   user:`${user}`,
   password:`${pass}`,
   host:`${host}`,
   database:`${database}`
})

db.connect((err)=>{
   if(err){
      console.log(err)
   }
   else{console.log('Connected..')}
})

app.get("/",(req,res)=>{
   res.send("Back End Is Running.... ")
})

app.get('/9138ed02-c179-4e32-a04e-b004beb52f77/:id',async(req,res)=>{

const skip = (req.params.id-1)*24

      await db.query(`SELECT * FROM movies LIMIT ${skip},24`,function (err, rows, fields) {
      res.send(rows)
   })
})

app.get('/70c85aae-6632-481b-91b2-1297072df818/:searchID&:page',async(req,res)=>{
   console.log(req.params.searchID)
   console.log(req.params.page)

  const skip = (req.params.page-1)*24 
         await db.query(`SELECT * FROM movies WHERE title LIKE '%${req.params.searchID}%' LIMIT ${skip},24`,function (err, rows, fields) {
         res.send(rows)
      })
   })

app.get('/576f5b62-e850-4071-84fa-6a05d5cf0d6e/:id', function (req, res) {
    db.query(`SELECT * FROM movies WHERE id=${req.params.id}`,function (err, rows, fields) {
      res.send(rows)
   })
})
app.get('/7fdc5422-400d-4574-8d22-c7abdea98f3c', function (req, res) {
   db.query(`SELECT * FROM movies ORDER BY RAND() LIMIT 6`,function (err, rows, fields) {
     res.send(rows)
  })
});


app.listen(process.env.PORT || 8000,(err)=>{
if(!err){
   console.log("Started")
}
else{
   console.log(err)
}
})
