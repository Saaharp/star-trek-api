const express = require ('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

app.use(cors())
app.use(express.json())

//DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,         
    dbName = 'star-trek-api'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('Connected to Database')
         db = client.db(dbName)
        const infoCollection = db.collection('alien-info')

    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/index.html')
    })

    app.get('/api/:alienName', (request, response) => {
        const aliensName = request.params.alienName.toLowerCase()
        infoCollection.find({name:aliensName}).toArray()
        .then( results => {
            console.log(results)
            response.json(results[0])
        })
        .catch(error => console.error(error))
    })
    
})
.catch(error => console.error(error))

app.listen( process.env.PORT|| PORT, () => {
    console.log(`server is running on port ${PORT}!`)
})
