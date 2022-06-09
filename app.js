const express = require('express')
const app = express()
app.use(express.json())

const mysql = require('mysql')
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
})
conn.connect(
    function(err){
        if(err){
            console.log("Mysql Connection failed !");
        }else{
            console.log("MySql Connected !");
            //Lets execute queries here.
            //Assuming a table named blogs exists in MySql DB as
            /*
                +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                + blog_id int | blog_title varchar(30) | blog_description varcahr(100)+
                +---------------------------------------------------------------------+
                +             |                        |                              +
                +             |                        |                              +
                +             |                        |                              +
                +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            */
           app.post('/blogs/add',(err,res)=>{
                //For this example i have used hardcoded data. So only 1 record can be inserted only once.
                var sql = "INSERT INTO blogs(blog_id,blog_title,blog_description) "+
                            "VALUES (1, 'Blog 1', 'This is 1st Blog')";
                conn.query(sql, function (err1, result) {
                   if(!err1){
                       console.log("1 blog added !");
                       return res.status(200).send({"msg": "1 Blog Added !"})
                   }
                   else{
                       console.log(err1);
                       return res.status(201).send()
                   }
                });
           })
            
           app.get('/blogs',(err,res)=>{
               var sql = "select * from blogs";
               conn.query(sql,(err1,data,fields)=>{
                   if(!err1){
                       console.log(data);
                       return res.status(200).send(data)
                   }else{
                       console.log(err1);
                       return res.status(201).send()
                   }
               })
           })

           app.put('/blogs/update',(err,res)=>{
               var sql = "update blogs set blog_title='Blog No. 1'";
               conn.query(sql,(err1,result)=>{
                   if(!err1){
                       console.log("Blog Updated !");
                   }else{
                       console.log(err1);
                   }
               })
           })

           app.delete('/blogs/delete',(err,res)=>{
               var sql = "delete from blogs where blog_id=1";
               conn.query(sql,(err1,result)=>{
                   if(!err1){
                       console.log("Blog 1 Deleted !");
                   }else{
                       console.log(err1);
                   }
               })
           })
        }
    }
    
)
app.listen(3000,()=>{
    console.log('Listening on port 3000...')  
})
