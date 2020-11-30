const express = require("express")
const sql = require("mysql")
const app = express()

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodemysql"
})



db.connect((err) => {
  if (err) throw err
  console.log("链接数据库成功")
})

app.get("/createDb", (request, response) => {
  const sql = "CREATE DATABASE nodemysql"
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.send("DATABASE create success!")
    }
  })
})

app.get("/createUserTable", (request, response) => {
  const sql =
    "CREATE TABLE user(id int AUTO_INCREMENT,name VARCHAR(255),password VARCHAR(255),PRIMARY KEY(ID))"
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.send("创建user表成功！")
    }
  })
})

app.get("/addUser", (request, response) => {
  const data = {
    name: "MongieLee",
    password: "123456",
  }
  const sql = "INSERT INTO user SET ?"
  db.query(sql, data, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.send("插入成功")
    }
  })
})

app.get("/getAllUser", (request, response) => {
  const sql = "SELECT * FROM user"
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.json(result)
    }
  })
})

app.get("/getUser/:id", (request, response) => {
  let sql = `select * from user where id = ${request.params.id}`
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.json(result)
    }
  })
})

app.get("/updateUser/:id", (request, response) => {
  const newPassword = 654321
  let sql = `update user set password = '${newPassword}' where id = ${request.params.id}`
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.send(`修改成功`)
    }
  })
})

app.get("/deleteUser/:id", (request, response) => {
  let sql = `delete from user where id = ${request.params.id}`
  db.query(sql, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(result)
      response.send(`删除成功`)
    }
  })
})

app.listen(8888, () => {
  console.log("服务启动在8888端口")
})

// const http = require("http")
// const fs = require("fs")
// const url = require("url")
// const { parse } = require("querystring")

// const port = process.argv[2]
// if (!port) {
//   console.log("请输入端口号")
//   process.exit(1)
// }

// const server = http.createServer((request, response) => {
//   const parseUrl = url.parse(request.url, true)
//   const pathWithQuery = request.url
//   let queryString = ""
//   if (pathWithQuery.indexOf("?") >= 0) {
//     query = pathWithQuery.substring(pathWithQuery.indexOf("?"))
//   }
//   console.log("queryString: ", queryString)
//   console.log("pathWithQuery: ", pathWithQuery)
//   console.log("parseUrl: ", parseUrl)
//   console.log("-------------------------------")
// })

// server.listen(port)
// console.log(`监听${port}端口成功，请打开localhost:${port}查看进行`)