var express = require('express')
var app = express()

app.get('/', function (req, res) {
res.send('Hello World')
})

//3000번 포트 사용
app.listen(3000)

