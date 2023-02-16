// fs = require('fs')
const EventEmmiter = require('events')
const myEmmiter = new EventEmmiter()

const logDBConnection = () => {
  console.log('DB connected');
}

myEmmiter.addListener('connected', logDBConnection)
myEmmiter.emit('connected')

myEmmiter.removeListener('connected', logDBConnection)
myEmmiter.emit('connected')

myEmmiter.on('msg', (data) => {
  console.log(`Get: ${data}`);
})
myEmmiter.emit('msg', 'hello world')

myEmmiter.on('error', (err) => {
  console.log(`Error: ${err.message}`);
})
myEmmiter.emit('error', 'Booom')