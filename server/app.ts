import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({ 
     origin: [process.env.CLIENT_URL || ''],
     credentials: true
}))

app.get('/', (req, res) => {
     return res.json({msg: 'Hello'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`)
})