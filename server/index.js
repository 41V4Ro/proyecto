const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const PORT  = process.env.PORT || 3001;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Hola desde el servidor!!" });
})
app.post("/register", (req, res)=>{
    const {email,username,password} = req.body;
    bcrypt.hash(password, 10, (err,hash)=>{
        if(err){
            res.send({error: error});
        }
        con.query(
            `INSERT INTO user (email, username,password) VALUES ('${email}','${username}','${hash}')`,
            (err)=>{
                if(err){
                    res.send({error:error});
                }else{
                    res.send({message:"registro exitoso"});
                }
            }
        );
    })  
});
app.post("/login", (req, res)=>{
    const {username,password} = req.body;
    con.query(
        `SELECT * FROM user WHERE username ='${username}'`,
        (err,result)=>{
            if(err){
                res.send({error: error})
            }
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (err,valid)=>{
                    if(valid){
                        res.send({username:`${username}`})
                    }else{
                        res.send({invalid:"El usuario o la contraseña no coinciden"})
                    }
                })
            }else{
                res.send({invalid:"El usuario o la contraseña no coinciden"})
            }
        }
    );
})

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})

let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"prueba"
});

/* function createDB(){
    con.query("CREATE DATABASE IF NOT EXISTS prueba ", (err,result)=>{
        if(err) throw err;
        console.log("bd creada");
    })
}
function createTable(tableName){
    let statement = `CREATE TABLE IF NOT EXISTS ${tableName} (
                        id int primary key auto_increment,
                        email varchar(255) not null,
                        username varchar(255) not null,
                        password varchar(255) not null
                    )`;    
    con.query(statement, error=>{
        if(error){
            throw error;
        }
    })
} */
