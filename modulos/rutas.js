const express = require('express')
const { Router } = express
const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//-------------- Productos ----------------
const Container = require('../Container')
const products = new Container('./productos.txt')

//--------Router GET ALL ---------
router.get('/', (req, res) => {
    // console.log('GET ALL.' + req.params.id)
    res.json(products.getAll())
})

//--------Router GET BY ID ---------
router.get('/id', (req, res) => {
    const { id } = req.params
    res.json(products.getById(id))
})

//--------Router POST ---------
 router.post("/", (req, res) => {
    // console.log('Post: ' + req.body) 
    const productoGuardar = {
        title: req.req.body.title,
        price: parseInt(req.req.body.price),
        thumbnail: req.req.body.thumbnail
    }
    // console.log('Datos post: ' + req.req.body)

    products.saveProduct(productoGuardar)
    res.status(201).send(
        { Success: `Producto ${productoGuardar.title} guardado con éxito en la BBDD!`,
          Price: `${productoGuardar.price}`,
          Thumbnail: `${productoGuardar.thumbnail}`,
        }
    )
})

//--------Router Put ---------
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    res.status(200).send(products.updateProduct(id, title, price, thumbnail))
})


//--------Router DELETE BY ID ---------
router.delete('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).send( products.deleteById(id) )
})

// --------Set Storage with Multer ------
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploadFiles')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// let upload = multer({ storage: storage})

// app.post('/uploadFiles', upload.single('thumbnail'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//         const error = new Error('File upload failed')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })

module.exports = router;