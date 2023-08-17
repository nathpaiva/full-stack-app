import mongoose from 'mongoose'

export default async () => {
  const db = mongoose.connection

  db.on('error', function (err) {
    console.log(`Error to connect. ${err}`)
  })

  db.on('open', function () {
    console.log('Connection opened.')
  })

  db.on('connected', function () {
    console.log('connect to: database')
  })

  db.on('disconnected', function () {
    console.log('Disconnected.')
  })

  return await mongoose.connect('mongodb://127.0.0.1:27017/canonical')
}
