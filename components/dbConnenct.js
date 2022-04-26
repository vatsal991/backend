const mysql = require('mysql')
const  dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const user = process.env.user
const pass = process.env.password
const host = process.env.server



const db = mysql.createConnection({
    user:`${user}`,
    password:`${pass}`,
    host:`${host}`
})

db.connect((err)=>{
    if(err){
       console.log(err)
    }
    else{console.log('Connected..')}
})
