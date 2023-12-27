const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
app.use(cors())
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
})
const port = 5500

app.use(
  express.static(path.join(__dirname, '/Face-Detection-Javascript-master'))
)
io.on('connection', (socket) =>
 {
  console.log('A user connected')

  socket.emit('hello from server', 1, '2', { 3: Buffer.from([4]) })

  socket.on('camera-stream', (data) => {
    console.log('Received camera stream data:', data)
  })
 
  socket.on('audio-stream', (data) => {
    console.log('Received audio stream data:', data)
  })

  socket.on('screen-stream', (data) => {
    console.log('Received screen stream data:', data)
  })

  socket.on('captured-image', (imageData) => {
    console.log('Received captured image data:', imageData)
  })

  socket.on('video', (url) => {
    console.log('Received video URL:', url)
  })
  socket.on('audio-text', (text) => {
    console.log('Received audio text:', text);
  });
  socket.on('audio', (url) => {
    console.log('Received audio URL:', url)
  })

  socket.on('screen', (url) => {
    console.log('Received screen URL:', url)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})