const factorial = require('./factorial')
const {Worker} = require('worker_threads')

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array
      }
    })
    let id
    worker.on('message', (msg) => {
      console.log('workerId ', worker.threadId, ' is started')
      id = worker.threadId
      resolve(msg)
    })
    worker.on('error', (err) => {
      reject(err)
    })
    worker.on('exit', () => {
      console.log(`Worker ${id} is finished`)
    })
  })
}

const main = async () => {
  try {
    performance.mark('start')

    let timerCount = 1
    const timer = setInterval(() => {
      console.log(`${timerCount}c`)
      timerCount++
    }, 1000)

    const res = await Promise.all(
      [
        compute([24, 48, 87, 54, 66]),
        compute([24, 48, 87, 54, 66]),
        compute([24, 48, 87, 54, 66]),
        compute([24, 48, 87, 54, 66])
      ]
    )

    // console.log('res: ', res);

    clearInterval(timer)

    performance.mark('end')
    performance.measure('main', 'start', 'end')
    console.log('duration', performance.getEntriesByName('main').pop().duration);
  } catch (error) {
    console.error(error)
  }  
}

main()