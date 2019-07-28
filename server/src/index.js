import path from 'path'
import express from 'express'
const app = express()

app.get('*', (req, res) => {
  res.send('ok!')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
