const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mecanografia"
});

app.listen(3001, ()=>{
    console.log(`Server listening on 3001`)
});

app.get("/", (req, res) => {
  res.json({ message: "Hola desde el servidor!!" });
});


app.post("/register", (req, res)=>{
    const {email,username,password} = req.body;
    bcrypt.hash(password, 10, (errorHash,hash)=>{
        if(errorHash){
            res.send({error: errorHash});
        }
        con.query(
            `INSERT INTO user (email, username,password) VALUES ('${email}','${username}','${hash}');`,
            (errorUser)=>{
                if(errorUser){
                    res.send({error:errorUser});
                }else{
                    con.query(
                        `INSERT INTO stats (gamesplayed, bestscore, username) VALUES (0, 0, '${username}');`,
                        (errorStats)=>{
                            if(errorStats){
                                res.send({error:errorStats});
                            }else{
                                res.send({message:"registro exitoso"});
                            }
                        }
                    );
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
app.post("/updatestats", (req, res)=>{
    const {username, score} = req.body;
    con.query(`UPDATE stats SET bestscore = ${score} where bestscore < ${score} and username = '${username}'`,(err,result)=>{
        if(err){
            res.send({error: err})
        }else{
            con.query(`UPDATE stats SET gamesplayed = gamesplayed +1 where username = '${username}'`,
            (err,result)=>{
                if(err){
                    res.send({error: "error"})
                }else{
                    res.send({exito: `${result}`})
                }
            })
        }
    })    
})
app.get("/stats",(req,res)=>{
    con.query("SELECT gamesplayed, bestscore, username FROM stats ORDER BY bestscore DESC", (err,result)=>{
        if(err){
            res.send({error:err})
        }else{
            res.send({stats: result})
        }
    })
})
