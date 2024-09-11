const express = require('express')
const njk = require('nunjucks')
const path = require("path")
const mysql = require('mysql')

const port = 5500
const host = "127.0.0.1"

const app = express()
app.use(
    express.static(path.join(__dirname, 'static')),
    express.urlencoded({
        extended: true
    }), 
    express.json()
)

njk.configure('templates', {
    autoescape: true,
    express: app
})

app.get("/", (req, res)=>{
    // const sql = "SELECT * FROM books"
    // const titulo = req.params.titulo
    // const num_page = req.params.num_page

//    console.log("titulo: ", titulo)
//    console.log("numero de paginas: ", num_page)
    
    res.render("home.html", {nome : "Francisco Paulo", idade: 50, email: "fps_netodf@hotmail.com"})
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6133',
    database: 'node_Mysql',
    port: 3306
  });
conn.connect((err)=>{
    if (err){
        console.log("erro ao conectar ao mariadb", err)
        return 
    }
        console.log("conectado ao Mariadb")    
})
  
app.get("/books/insertbook", (req, res)=>{ 
    res.render("form.html", )    
})

app.post("/books/insertbook", (req, res)=>{
    const titulo = req.body.titulo
    const num_page = req.body.num_page    
    const sql = `INSERT INTO books( titulo, num_page ) VALUES ( '${titulo}', '${num_page}') `
    conn.query(sql, (err)=>{
        if(err){
            console.log(err)
        }
        res.redirect(`/books`)
    })
})

app.get('/books', (req, res)=>{
    const sql = "SELECT * FROM books"
    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const books = data
        res.render("books.html", {"livros": books})
    })
})



app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://${host}:${port}`)
})
