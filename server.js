const express = require('express')
const app = express()
const router = require('./modulos/rutas')

const PORT = 5500

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/public'))
//app.use(express.static('public'))
// app.use(express.static('/public'))

//------------ SERVER ----------
app.use('/api/productos', router)

const server = app.listen(PORT, ()=> {
    console.log(`Express server listening on port ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))