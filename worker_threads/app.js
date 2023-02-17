const factorial = require('./factorial')

const compute = (array) => {
  const arr = []
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i)
  }
  return array.map(item => factorial(item))
}

const main = () => {
  performance.mark('start')

  let timerCount = 1
  const timer = setInterval(() => {
    console.log(`${timerCount}c`)
    timerCount++
  }, 1000)

  const res = [
    compute([24, 48, 87, 54, 66]),
    compute([24, 48, 87, 54, 66]),
    compute([24, 48, 87, 54, 66]),
    compute([24, 48, 87, 54, 66])
  ]

  // console.log('res: ', res);
  clearInterval(timer)

  performance.mark('end')
  performance.measure('main', 'start', 'end')
  console.log(performance.getEntriesByName('main').pop().duration);
}

main()