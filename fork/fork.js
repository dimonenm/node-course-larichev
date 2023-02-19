process.on('message', (msg) => {

  if (msg === 'disconnect') {
    process.disconnect()
    return
  }
  
  console.log(msg)
  msg.sex = `male`
  process.send({msg})
  // process.send('Pong')
  
})