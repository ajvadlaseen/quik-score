import express from 'express'
import routes from './routes.js'

const app = express()

app.use('/',routes)

app.get('/', (req, res)=> {
    res.json({status:'Quik Score - Running Successfully'})
})

app.get("*",(req, res)=>{
    res.json(`${req.url} not found`)
})

const port = 5000
app.listen(port, ()=> {
    console.log('listening on port ' + port)
})
