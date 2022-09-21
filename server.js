const express = require('express')
const app = express()
const router = require('./modulos/rutas')

const PORT = 8080

const bodyParser = require('body-parser');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))

//------------ SERVER ----------
app.use('/api/productos', router)

app.use(express.static('/static'))

const server = app.listen(PORT, ()=> {
    console.log(`Express server listening on port ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
