const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()

const productsModule = require('./utils/products')

const viewsURL = path.join(__dirname, 'views')

app.set('views', viewsURL)
app.set('view engine', 'ejs')

const publicURL = path.join(__dirname, 'public')

app.use(express.static(publicURL))

app.get('', (req, res) => {
    productsModule.getAllProducts((err, products) => {
        if(err) return res.status(500).send(err)
        console.log(products)
        return res.render('pages/index', { products })

    })
})

app.get('/agregar', (req, res) => {
    res.render('pages/agregar')
})


app.listen(port, ()=>{
    console.log(`Escuchando el puerto ${port}`)
})

